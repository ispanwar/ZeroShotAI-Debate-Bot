import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import axios from "axios";

import Header from "./components/Header";
import OverallVoteCounter from "./components/OverallVoteCounter";
import TopicInput from "./components/TopicInput";
import UserInputArgument from "./components/UserInputArgument";
import DebateDisplayArea from "./components/DebateDisplayArea";
import Footer from "./components/Footer";

export default function App() {
  const [topic, setTopic] = useState("");
  const [currentDebateTopic, setCurrentDebateTopic] = useState("");
  const [debateData, setDebateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingFeedback, setIsProcessingFeedback] = useState(false);
  const [isWaitingForAICounter, setIsWaitingForAICounter] = useState(false);
  const [error, setError] = useState(null);
  const [argumentReactions, setArgumentReactions] = useState({});
  const [showContent, setShowContent] = useState(false);
  const [initialDebateFinished, setInitialDebateFinished] = useState(false);
  const debateDisplayRef = useRef(null);

  const BACKEND_URL = "http://localhost:8000/debate/";

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    if (error) setError(null);
  };

  const overallScores = useMemo(() => {
    if (!debateData) return { pro: 0, con: 0 };
    let proScore = 0;
    let conScore = 0;

    Object.entries(debateData).forEach(([side, sections]) => {
      if (side === "topic") return;
      Object.entries(sections).forEach(([section, points]) => {
        if (Array.isArray(points)) {
          points.forEach((_, index) => {
            const key = `${side}-${section}-${index}`;
            if (argumentReactions[key]?.agrees) {
              side === "pro"
                ? (proScore += argumentReactions[key].agrees)
                : (conScore += argumentReactions[key].agrees);
            }
          });
        }
      });
    });
    return { pro: proScore, con: conScore };
  }, [debateData, argumentReactions]);

  useEffect(() => {
    if (!debateData) {
      setInitialDebateFinished(false);
      setArgumentReactions({});
      return;
    }

    const newReactions = {};
    Object.entries(debateData).forEach(([side, sections]) => {
      if (side === "topic") return;
      Object.entries(sections).forEach(([section, points]) => {
        if (Array.isArray(points)) {
          points.forEach((_, index) => {
            const key = `${side}-${section}-${index}`;
            newReactions[key] = argumentReactions[key] || {
              userReaction: null,
              agrees: 0,
              disagrees: 0,
            };
          });
        }
      });
    });

    setArgumentReactions(newReactions);

    if (
      !initialDebateFinished &&
      (debateData.pro?.opening?.length > 0 ||
        debateData.con?.opening?.length > 0)
    ) {
      setInitialDebateFinished(true);
    }
  }, [debateData]);

  const handleStartDebate = useCallback(async () => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      setError("Please enter a debate topic.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentDebateTopic(trimmedTopic);
    setInitialDebateFinished(false);
    setDebateData(null);

    try {
      const res = await axios.post(`${BACKEND_URL}`, { topic: trimmedTopic });
      const rawData = res.data;

      const structuredDebate = {
        topic: trimmedTopic,
        pro: {
          opening: rawData.pro?.opening ? [rawData.pro.opening] : [],
          rebuttal: rawData.pro?.rebuttal ? [rawData.pro.rebuttal] : [],
          closing: rawData.pro?.closing ? [rawData.pro.closing] : [],
        },
        con: {
          opening: rawData.con?.opening ? [rawData.con.opening] : [],
          rebuttal: rawData.con?.rebuttal ? [rawData.con.rebuttal] : [],
          closing: rawData.con?.closing ? [rawData.con.closing] : [],
        },
      };

      setDebateData(structuredDebate);
    } catch (err) {
      console.error("Error generating debate:", err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Failed to fetch initial debate."
      );
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleArgumentFeedback = useCallback(
    async (side, section, action, index) => {
      if (!debateData || isProcessingFeedback) return;

      const cleanedSide = side.trim().toLowerCase();
      setIsProcessingFeedback(true);
      setError(null);
      const pointKey = `${cleanedSide}-${section}-${index}`;

      try {
        const payload = {
          topic: currentDebateTopic.trim(),
          side: cleanedSide,
          section,
          action,
          index,
        };

        const res = await axios.post(`${BACKEND_URL}feedback`, payload);
        const updatedText = res.data.updated || res.data.updatedText;

        setDebateData((prev) => {
          const updated = JSON.parse(JSON.stringify(prev));
          const sectionArr = updated[cleanedSide]?.[section];
          if (!Array.isArray(sectionArr)) return prev;

          if (action === "like") {
            sectionArr.splice(index + 1, 0, updatedText);
          } else if (action === "dislike") {
            sectionArr[index] = updatedText;
            setArgumentReactions((r) => ({
              ...r,
              [pointKey]: { userReaction: null, agrees: 0, disagrees: 0 },
            }));
          }

          return updated;
        });

        setArgumentReactions((prev) => {
          const current = prev[pointKey] || {
            userReaction: null,
            agrees: 0,
            disagrees: 0,
          };
          const { userReaction } = current;
          let { agrees, disagrees } = current;

          if (userReaction === action) {
            if (action === "like") agrees = Math.max(0, agrees - 1);
            if (action === "dislike") disagrees = Math.max(0, disagrees - 1);
            return {
              ...prev,
              [pointKey]: { userReaction: null, agrees, disagrees },
            };
          } else {
            if (userReaction === "like") agrees = Math.max(0, agrees - 1);
            if (userReaction === "dislike")
              disagrees = Math.max(0, disagrees - 1);
            if (action === "like") agrees++;
            if (action === "dislike") disagrees++;
            return {
              ...prev,
              [pointKey]: { userReaction: action, agrees, disagrees },
            };
          }
        });
      } catch (err) {
        console.error("Feedback error:", err.response?.data || err.message);
        setError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to process feedback."
        );
      } finally {
        setIsProcessingFeedback(false);
      }
    },
    [debateData, currentDebateTopic, isProcessingFeedback]
  );

  const handleSubmitUserArgument = useCallback(
    async (userSide, argumentText) => {
      const side = userSide.trim().toLowerCase();
      const opposite = side === "pro" ? "con" : "pro";
      const trimmedText = argumentText.trim();
      if (!debateData || isWaitingForAICounter || !trimmedText) return;

      setIsWaitingForAICounter(true);
      setError(null);

      try {
        const payload = {
          topic: currentDebateTopic.trim(),
          user_point: trimmedText,
          user_side: side,
        };

        const res = await axios.post(`${BACKEND_URL}counterpoint`, payload);
        const counterText = res.data.counter;

        setDebateData((prev) => {
          const updated = JSON.parse(JSON.stringify(prev));
          updated[side]["rebuttal"].push(trimmedText);
          updated[opposite]["rebuttal"].push(counterText);
          return updated;
        });

        setTimeout(() => {
          debateDisplayRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 100);
      } catch (err) {
        console.error(
          "Error adding user point:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to get AI counter."
        );
      } finally {
        setIsWaitingForAICounter(false);
      }
    },
    [debateData, currentDebateTopic, isWaitingForAICounter]
  );

  const handleResetDebate = () => {
    setTopic("");
    setCurrentDebateTopic("");
    setDebateData(null);
    setError(null);
    setIsLoading(false);
    setArgumentReactions({});
    setInitialDebateFinished(false);
    setIsWaitingForAICounter(false);
    setIsProcessingFeedback(false);
  };

  useEffect(() => {
    if (!topic && currentDebateTopic) {
      setCurrentDebateTopic("");
    }
  }, [topic, currentDebateTopic]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-gray-100 font-sans p-4 sm:p-8 flex flex-col items-center selection:bg-sky-500 selection:text-white ${
        showContent ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <Header />
      {initialDebateFinished && !isLoading && (
        <OverallVoteCounter
          proScore={overallScores.pro}
          conScore={overallScores.con}
        />
      )}
      <TopicInput
        topic={topic}
        onTopicChange={handleTopicChange}
        onStartDebate={handleStartDebate}
        isLoading={isLoading && !initialDebateFinished}
        error={error}
        onReset={debateData || topic || isLoading ? handleResetDebate : null}
      />
      <div ref={debateDisplayRef}>
        <DebateDisplayArea
          debateData={debateData}
          isLoading={
            (isLoading && !initialDebateFinished) || isProcessingFeedback
          }
          currentTopic={currentDebateTopic}
          onArgumentReaction={handleArgumentFeedback}
          argumentReactions={argumentReactions}
          isProcessingFeedback={isProcessingFeedback}
        />
      </div>
      {initialDebateFinished && !isLoading && (
        <UserInputArgument
          onSubmitArgument={handleSubmitUserArgument}
          isWaitingForAICounter={isWaitingForAICounter}
          debateTopic={currentDebateTopic}
        />
      )}
      <Footer />
    </div>
  );
}
