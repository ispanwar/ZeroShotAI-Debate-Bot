import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const OverallVoteCounter = ({ proScore, conScore }) => {
  return (
    <section
      className="mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-800/70 rounded-xl shadow-xl w-full max-w-2xl animate-fade-in-down"
      style={{ animationDelay: "0.1s" }}
      aria-labelledby="overall-score-heading"
    >
      <h2
        id="overall-score-heading"
        className="text-xl sm:text-2xl font-semibold text-center text-sky-300 mb-4"
      >
        Debate Score Summary
      </h2>
      <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
        {/* Pro Score Section */}
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-700/50 w-full sm:w-auto">
          <h3 className="text-lg font-medium text-green-400 flex items-center gap-2">
            <ThumbsUp size={20} /> Pro AI Side Points
          </h3>
          <p className="text-3xl font-bold text-slate-100">{proScore}</p>
        </div>

        {/* Separator */}
        <div className="h-px sm:h-16 w-full sm:w-px bg-slate-700 my-2 sm:my-0"></div>

        {/* Con Score Section */}
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-700/50 w-full sm:w-auto">
          <h3 className="text-lg font-medium text-red-400 flex items-center gap-2">
            <ThumbsDown size={20} /> Con AI Side Points
          </h3>
          <p className="text-3xl font-bold text-slate-100">{conScore}</p>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">
        Overall score is based on total "Agree" clicks for each side's
        arguments.
      </p>
    </section>
  );
};

export default OverallVoteCounter;
