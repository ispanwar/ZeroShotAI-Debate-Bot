import React from 'react';

const Footer = () => (
    // Semantic footer element
    <footer className="mt-12 text-center text-slate-500 text-sm w-full max-w-4xl" role="contentinfo">
        <p>&copy; {new Date().getFullYear()} AI Debate Bot. For educational and illustrative purposes.</p>
        <p>Powered by AI, React & Tailwind CSS.</p>
    </footer>
);

export default Footer;