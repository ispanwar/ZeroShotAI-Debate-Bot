import React from "react";
import {
  Lightbulb,
  MessageSquareText,
  CheckCircle,
  FileText,
  User as UserIcon,
  Bot as BotIcon,
  Edit3,
  ThumbsUp as AgreeIcon,
  ThumbsDown as DisagreeIcon,
} from "lucide-react";

const ArgumentCard = ({
  argument,
  side,
  sectionName,
  pointIndex,
  onReaction,
  reactionData,
  animationDelay,
  isProcessingFeedback,
}) => {
  const {
    id: pointKey,
    phase = "Argument",
    text = "No text provided.",
    source,
  } = argument || {};

  const currentReaction = reactionData?.userReaction;
  const agreesCount = reactionData?.agrees ?? 0;
  const disagreesCount = reactionData?.disagrees ?? 0;

  let phaseIcon;
  let cardBgColor = "bg-slate-800";
  let sourceIcon = null;
  let sourceTextDisplay = "";

  // Source-based style and icon
  if (source === "user_added_to_section") {
    cardBgColor = "bg-sky-900/50 border-sky-700";
    sourceIcon = <UserIcon size={14} className="text-sky-400 mr-1" />;
    sourceTextDisplay = "User Point";
  } else if (
    source === "ai_counter_in_section" ||
    source === "ai_generated_from_like"
  ) {
    cardBgColor = "bg-purple-900/50 border-purple-700";
    sourceIcon = <BotIcon size={14} className="text-purple-400 mr-1" />;
    sourceTextDisplay =
      source === "ai_counter_in_section" ? "AI Counter" : "AI Generated";
  }

  // Phase-based icon
  switch (phase.toLowerCase()) {
    case "opening":
      phaseIcon = <Lightbulb size={20} className="text-blue-400" />;
      break;
    case "rebuttal":
      phaseIcon = <MessageSquareText size={20} className="text-orange-400" />;
      break;
    case "conclusion":
      phaseIcon = <CheckCircle size={20} className="text-emerald-400" />;
      break;
    default:
      phaseIcon = <FileText size={20} className="text-slate-400" />;
  }

  const headingId = `arg-point-${pointKey}`;

  return (
    <article
      className={`mb-3 p-3 border rounded-lg shadow-sm ${cardBgColor} hover:shadow-lg hover:border-slate-600 transition-all duration-200 ease-in-out animate-fade-in-scale group ${
        isProcessingFeedback ? "opacity-60 pointer-events-none" : ""
      }`}
      style={{ animationDelay: animationDelay }}
      aria-labelledby={headingId}
    >
      {sourceTextDisplay && (
        <div className="flex justify-end mb-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 flex items-center">
            {sourceIcon}
            {sourceTextDisplay}
          </span>
        </div>
      )}

      <p id={headingId} className="text-slate-300 text-sm leading-relaxed mb-2">
        {text}
      </p>

      <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-end space-x-2">
        <button
          onClick={() => onReaction(side, sectionName, "like", pointIndex)}
          disabled={isProcessingFeedback}
          aria-pressed={currentReaction === "like"}
          aria-label={`Like this point. ${agreesCount} likes.`}
          className={`flex items-center space-x-1 p-1.5 rounded-md text-xs transition-all transform active:scale-90 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-slate-800 disabled:opacity-50 ${
            currentReaction === "like"
              ? "bg-green-500/30 text-green-300 ring-green-400"
              : "bg-slate-600 hover:bg-green-500/20 text-slate-400 hover:text-green-300"
          }`}
        >
          <AgreeIcon size={16} />
          <span className="font-medium">{agreesCount}</span>
        </button>

        <button
          onClick={() => onReaction(side, sectionName, "dislike", pointIndex)}
          disabled={isProcessingFeedback}
          aria-pressed={currentReaction === "dislike"}
          aria-label={`Dislike this point. ${disagreesCount} dislikes.`}
          className={`flex items-center space-x-1 p-1.5 rounded-md text-xs transition-all transform active:scale-90 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-slate-800 disabled:opacity-50 ${
            currentReaction === "dislike"
              ? "bg-red-500/30 text-red-300 ring-red-400"
              : "bg-slate-600 hover:bg-red-500/20 text-slate-400 hover:text-red-300"
          }`}
        >
          <DisagreeIcon size={16} />
          <span className="font-medium">{disagreesCount}</span>
        </button>
      </div>
    </article>
  );
};

export default ArgumentCard;
