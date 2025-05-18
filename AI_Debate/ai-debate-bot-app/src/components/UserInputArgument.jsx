import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const UserInputArgument = ({
  onSubmitArgument,
  isWaitingForAICounter,
  debateTopic,
}) => {
  const [userText, setUserText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (buttonSide) => {
    if (!userText.trim()) return;

    // Map button label values to backend-friendly values
    const sideMap = {
      for: "pro",
      against: "con",
      pro: "pro",
      con: "con",
    };

    const side = sideMap[buttonSide.toLowerCase()];
    if (!side) {
      console.error("❌ Invalid side value passed to backend:", buttonSide);
      setError("Internal error: invalid side passed.");
      return;
    }

    setError("");
    onSubmitArgument(side, userText.trim());
    setUserText("");
  };

  return (
    <section
      className="my-6 sm:my-8 p-4 sm:p-6 bg-slate-800/70 rounded-xl shadow-xl w-full max-w-3xl animate-fade-in-up"
      style={{ animationDelay: "0.5s" }}
      aria-labelledby="user-argument-heading"
    >
      <h2
        id="user-argument-heading"
        className="text-xl sm:text-2xl font-semibold text-center text-sky-300 mb-4"
      >
        Add Your Point to "{debateTopic}"
      </h2>
      <textarea
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="Type your argument here..."
        className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-gray-200 focus:ring-2 focus:ring-sky-500 outline-none min-h-[80px] text-sm"
        rows="3"
        disabled={isWaitingForAICounter}
        aria-label="Your argument input"
      />
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      <div className="mt-3 flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
        <button
          onClick={() => handleSubmit("for")}
          disabled={isWaitingForAICounter || !userText.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 rounded-md font-semibold transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-slate-800 bg-green-600/80 hover:bg-green-500 text-white ring-green-500 disabled:opacity-60"
          aria-label="Submit argument for the Pro side"
        >
          <PlusCircle size={18} /> Add to Pro Side
        </button>
        <button
          onClick={() => handleSubmit("against")}
          disabled={isWaitingForAICounter || !userText.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 rounded-md font-semibold transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-slate-800 bg-red-600/80 hover:bg-red-500 text-white ring-red-500 disabled:opacity-60"
          aria-label="Submit argument for the Con side"
        >
          <PlusCircle size={18} /> Add to Con Side
        </button>
      </div>
      {isWaitingForAICounter && (
        <div className="mt-3 text-sm text-sky-400 flex items-center justify-center">
          <LoadingSpinner small={true} />
          <span className="ml-2">AI is crafting a counter-point...</span>
        </div>
      )}
    </section>
  );
};

export default UserInputArgument;
