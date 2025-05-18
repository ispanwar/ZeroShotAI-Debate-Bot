import React from 'react';
import { Brain } from 'lucide-react'; // Icon for the header

const Header = () => (
    // Semantic header element for accessibility
    <header className="text-center mb-8 sm:mb-12 w-full max-w-4xl" role="banner">
        <div className="flex items-center justify-center mb-2">
            {/* Brain icon, decorative */}
            <Brain size={48} className="text-sky-400 mr-3" aria-hidden="true" />
            {/* Main title of the application */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
                ZERO-SHOT AI DEBATE BOT
            </h1>
        </div>
        {/* Tagline for the application */}
        <p className="text-slate-400 text-lg">Engage in structured, AI-driven debates on any topic.</p>
    </header>
);

export default Header;