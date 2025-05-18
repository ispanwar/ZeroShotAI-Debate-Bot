import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react'; // Icons for skeleton visual cue

// Skeleton for a single argument card
const SkeletonCard = () => (
    <div className="mb-6 p-4 border border-slate-700 rounded-lg shadow-sm bg-slate-800" aria-hidden="true">
        {/* Placeholder elements mimicking ArgumentCard structure */}
        <div className="h-5 bg-slate-700 rounded w-1/3 mb-3 animate-pulse"></div>
        <div className="h-3 bg-slate-700 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-3 bg-slate-700 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="h-3 bg-slate-700 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-2 bg-slate-700 rounded w-1/4 mb-2 animate-pulse"></div>
        <div className="h-2 bg-slate-700 rounded w-full animate-pulse"></div>
    </div>
);

// Skeleton for an argument column (FOR or AGAINST)
const SkeletonColumn = ({ sideIcon, textColor }) => (
    <div className="w-full md:w-1/2 p-3 md:p-4" aria-hidden="true">
        <div className="bg-slate-800/60 p-4 sm:p-6 rounded-xl shadow-xl h-full flex flex-col">
            {/* Placeholder for column header */}
            <div className="flex items-center justify-center mb-4 sm:mb-6">
                {React.isValidElement(sideIcon) ? React.cloneElement(sideIcon, { size: 32, className: `mr-3 ${textColor} opacity-50` }) : null}
                <div className={`h-8 w-24 bg-slate-700 rounded animate-pulse ${textColor} opacity-50`}></div>
            </div>
            {/* Placeholders for agent details */}
            <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto mb-1 animate-pulse"></div>
            <div className="h-3 bg-slate-700 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
            {/* Placeholder for argument cards */}
            <div className="space-y-4 flex-grow">
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    </div>
);

// Main skeleton loader for the entire debate display area
export const DebateAreaSkeletonLoader = ({ currentTopic }) => (
    <section
        className="w-full max-w-6xl bg-slate-800/80 p-4 sm:p-6 rounded-xl shadow-2xl"
        aria-label="Loading debate content"
        aria-live="polite" // Announce to screen readers that content is loading
    >
        <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-300 mb-2 animate-pulse">Loading Debate...</h2>
            <p className="text-lg text-slate-400 animate-pulse">Topic: "{currentTopic || 'Fetching topic...'}"</p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-0 lg:space-x-6">
            {/* Skeleton for "FOR" column */}
            <SkeletonColumn sideIcon={<ThumbsUp />} textColor="text-green-400" />
            {/* Separator */}
            <div className="hidden md:block border-l-2 border-slate-700 mx-2 my-4 self-stretch"></div>
            <hr className="block md:hidden my-6 border-slate-700" />
            {/* Skeleton for "AGAINST" column */}
            <SkeletonColumn sideIcon={<ThumbsDown />} textColor="text-red-400" />
        </div>
    </section>
);