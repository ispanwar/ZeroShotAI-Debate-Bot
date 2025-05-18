import React from "react";
import ArgumentColumn from "./ArgumentColumn";
import { DebateAreaSkeletonLoader } from "./SkeletonLoader";
import { Search, ThumbsUp, ThumbsDown } from "lucide-react";

const DebateDisplayArea = ({
  debateData,
  isLoading,
  currentTopic,
  onArgumentReaction,
  argumentReactions,
  isProcessingFeedback,
}) => {
  // Added isProcessingFeedback
  if (isLoading && !debateData) {
    return <DebateAreaSkeletonLoader currentTopic={currentTopic} />;
  }
  if (!debateData || (!debateData.pro && !debateData.con)) {
    return (
      <div
        className="text-center text-slate-400 mt-10 p-8 bg-slate-800 rounded-xl shadow-xl max-w-md mx-auto animate-fade-in"
        role="region"
        aria-label="Instructions to start a debate"
      >
        <Search size={48} className="mx-auto mb-4 text-sky-500" />
        <p className="text-xl">Enter a topic and click "Start Debate".</p>
      </div>
    );
  }
  return (
    <main
      id="debate-content-area"
      className="w-full max-w-6xl bg-slate-800/80 p-4 sm:p-6 rounded-xl shadow-2xl animate-fade-in"
      style={{ animationDelay: "0.4s" }}
      aria-labelledby="debate-topic-heading"
    >
      <div
        className="text-center mb-6 animate-fade-in-down"
        style={{ animationDelay: "0.5s" }}
      >
        <h2
          id="debate-topic-heading"
          className="text-2xl sm:text-3xl font-bold text-sky-300 mb-1"
        >
          Debate Topic:
        </h2>
        <p className="text-xl text-slate-300 font-medium">
          "{debateData.topic || currentTopic}"
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-0 lg:space-x-6">
        <ArgumentColumn
          side="pro"
          sideData={debateData.pro}
          agentDetails={{
            name: "Pro AI Agent",
            persona: "Optimistic & Logical",
          }}
          icon={<ThumbsUp />}
          textColor="text-green-400"
          onArgumentReaction={onArgumentReaction}
          argumentReactions={argumentReactions}
          animationDelayBase={0.6}
          isProcessingFeedback={isProcessingFeedback} // Pass down
        />
        <div className="hidden md:block self-stretch border-l-2 border-slate-700 mx-2 my-4" />
        <hr className="block md:hidden my-6 border-slate-700" />
        <ArgumentColumn
          side="con"
          sideData={debateData.con}
          agentDetails={{
            name: "Con AI Agent",
            persona: "Critical & Cautious",
          }}
          icon={<ThumbsDown />}
          textColor="text-red-400"
          onArgumentReaction={onArgumentReaction}
          argumentReactions={argumentReactions}
          animationDelayBase={0.7}
          isProcessingFeedback={isProcessingFeedback} // Pass down
        />
      </div>
    </main>
  );
};
export default DebateDisplayArea;
