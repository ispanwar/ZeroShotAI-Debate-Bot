import React from "react";
import ArgumentCard from "./ArgumentCard";

const ArgumentColumn = ({
  side,
  sideData,
  agentDetails,
  icon,
  textColor,
  onArgumentReaction,
  argumentReactions,
  animationDelayBase = 0,
  isProcessingFeedback,
}) => {
  const columnId = `${side.toLowerCase()}-arguments-column`;
  const sections = ["opening", "rebuttal", "closing"];

  return (
    <section
      className="w-full md:w-1/2 p-3 md:p-4 animate-fade-in-up"
      style={{ animationDelay: `${animationDelayBase + 0.2}s` }}
      aria-labelledby={columnId}
    >
      <div className="bg-slate-800/60 p-4 sm:p-6 rounded-xl shadow-xl h-full flex flex-col">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          {React.isValidElement(icon)
            ? React.cloneElement(icon, {
                size: 32,
                className: `mr-3 ${textColor}`,
              })
            : null}
          <h3
            id={columnId}
            className={`text-2xl sm:text-3xl font-bold ${textColor}`}
          >
            {side.toUpperCase()}
          </h3>
        </div>
        <p className="text-center text-sm text-slate-400 mb-1 italic">
          {agentDetails?.name ||
            `${side.charAt(0).toUpperCase() + side.slice(1)} AI Agent`}
        </p>
        <p className="text-center text-xs text-slate-500 mb-4 font-medium">
          {agentDetails?.persona || "Standard Persona"}
        </p>

        <div className="space-y-6 flex-grow overflow-y-auto max-h-[calc(100vh-500px)] md:max-h-[calc(100vh-450px)] pr-2 scrollbar-thin">
          {sections.map((sectionName, sectionIdx) => {
            const pointsArray = sideData?.[sectionName] || [];

            const allEmpty = sections.every(
              (s) => (sideData?.[s] || []).length === 0
            );
            if (pointsArray.length === 0 && sectionIdx === 0 && allEmpty) {
              return (
                <p
                  key={`${side}-no-args`}
                  className="text-slate-400 text-center py-4"
                >
                  No arguments presented yet.
                </p>
              );
            }

            if (pointsArray.length === 0) return null;

            return (
              <div key={`${side}-${sectionName}`} className="mb-4">
                <h4 className="text-lg font-semibold capitalize text-sky-400/80 mb-2 border-b border-slate-700 pb-1">
                  {sectionName}
                </h4>
                {pointsArray.map((pointText, pointIndex) => {
                  const reactionKey = `${side}-${sectionName}-${pointIndex}`;

                  const argumentForCard = {
                    id: reactionKey,
                    phase:
                      sectionName.charAt(0).toUpperCase() +
                      sectionName.slice(1),
                    originalPhase: sectionName,
                    text: pointText,
                    source: pointText.startsWith("User Point:")
                      ? "user_added_to_section"
                      : pointText.startsWith("AI's response to:")
                      ? "ai_counter_in_section"
                      : "ai_initial",
                    agrees: argumentReactions[reactionKey]?.agrees || 0,
                    disagrees: argumentReactions[reactionKey]?.disagrees || 0,
                  };

                  return (
                    <ArgumentCard
                      key={reactionKey}
                      argument={argumentForCard}
                      side={side}
                      sectionName={sectionName}
                      pointIndex={pointIndex}
                      onReaction={onArgumentReaction}
                      reactionData={argumentReactions[reactionKey]}
                      animationDelay={`${
                        (sectionIdx * pointsArray.length + pointIndex) * 0.05 +
                        animationDelayBase +
                        0.4
                      }s`}
                      isProcessingFeedback={isProcessingFeedback}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArgumentColumn;
