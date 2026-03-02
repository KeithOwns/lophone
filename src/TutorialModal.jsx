import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const TutorialModal = ({ steps, onClose }) => {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);

    const goTo = useCallback((idx) => {
        if (animating || idx < 0 || idx >= steps.length) return;
        setAnimating(true);
        setCurrent(idx);
        setTimeout(() => setAnimating(false), 400);
    }, [animating, steps.length]);

    const next = useCallback(() => {
        if (current < steps.length - 1) {
            goTo(current + 1);
        } else {
            setAutoPlay(false);
        }
    }, [current, steps.length, goTo]);

    const prev = useCallback(() => {
        setAutoPlay(false);
        goTo(current - 1);
    }, [current, goTo]);

    // Auto-advance every 4 seconds
    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [autoPlay, next]);

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const step = steps[current];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                {/* Step counter */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-blue-600/80 text-xs font-bold text-white">
                    Step {current + 1} of {steps.length}
                </div>

                {/* Image area */}
                <div className="relative w-full aspect-[9/16] bg-slate-950 overflow-hidden">
                    <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-contain transition-all duration-400"
                        style={{
                            opacity: animating ? 0.3 : 1,
                            transform: animating ? 'scale(0.95)' : 'scale(1)',
                            transition: 'opacity 0.4s ease, transform 0.4s ease'
                        }}
                    />

                    {/* Highlight overlay pulse */}
                    {step.highlight && (
                        <div
                            className="absolute rounded-xl border-2 border-blue-400 animate-pulse"
                            style={step.highlight}
                        />
                    )}
                </div>

                {/* Text area */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Navigation controls */}
                <div className="flex items-center justify-between px-5 pb-5">
                    <button
                        onClick={prev}
                        disabled={current === 0}
                        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${current === 0
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <ChevronLeft size={16} /> Back
                    </button>

                    {/* Progress dots */}
                    <div className="flex gap-2">
                        {steps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setAutoPlay(false); goTo(i); }}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-blue-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setAutoPlay(false);
                            if (current === steps.length - 1) {
                                onClose();
                            } else {
                                next();
                            }
                        }}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                    >
                        {current === steps.length - 1 ? 'Done' : 'Next'} <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
