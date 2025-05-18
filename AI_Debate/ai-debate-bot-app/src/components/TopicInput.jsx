import React from 'react';
import { Send, RotateCcw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const TopicInput = ({ topic, onTopicChange, onStartDebate, isLoading, error, onReset }) => (
    <section
        className="mb-6 sm:mb-8 p-6 bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
        aria-labelledby="debate-setup-heading"
    >
        <h2 id="debate-setup-heading" className="sr-only">Debate Setup Controls</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <input
                type="text"
                value={topic}
                onChange={onTopicChange}
                placeholder="Enter debate topic (e.g., 'Is remote work the future?')"
                className="flex-grow p-3 border border-slate-600 rounded-lg bg-slate-700 text-gray-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 ease-in-out placeholder-slate-500"
                disabled={isLoading}
                aria-label="Debate Topic Input"
                aria-describedby={error ? "error-message" : undefined}
                aria-invalid={!!error}
            />
            <div className="flex gap-2 flex-shrink-0">
                <button
                    onClick={onStartDebate}
                    disabled={isLoading || !topic.trim()}
                    className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    aria-label="Start Debate"
                    aria-live="polite"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner /> Generating...
                        </>
                    ) : (
                        <> <Send size={18} className="mr-2" aria-hidden="true" /> Start Debate </>
                    )}
                </button>
                {onReset && (
                    <button
                        onClick={onReset}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 active:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                        aria-label="Reset Debate"
                    >
                        <RotateCcw size={18} className="mr-2" aria-hidden="true" /> Reset
                    </button>
                )}
            </div>
        </div>
        {error && <p id="error-message" role="alert" className="text-red-400 mt-3 text-sm animate-fade-in">{error}</p>}
    </section>
);

export default TopicInput;
