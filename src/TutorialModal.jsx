import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const accentMap = {
    blue: {
        badge: 'bg-blue-600/80',
        dot: 'bg-blue-500',
        dotHover: 'hover:bg-blue-400',
    },
    purple: {
        badge: 'bg-purple-600/80',
        dot: 'bg-purple-500',
        dotHover: 'hover:bg-purple-400',
    },
};

const TutorialModal = ({ steps, onClose, accentColor = 'blue' }) => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'
    const [animating, setAnimating] = useState(false);
    const [contentKey, setContentKey] = useState(0); // forces re-mount for animation
    const [mounted, setMounted] = useState(false);    // modal entry animation
    const [doneFlash, setDoneFlash] = useState(false); // last-step done button flash

    const accent = accentMap[accentColor] ?? accentMap.blue;

    // Modal entry animation on mount
    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    const goTo = useCallback((idx, dir = 'forward') => {
        if (animating || idx < 0 || idx >= steps.length) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setCurrent(idx);
            setContentKey(k => k + 1);
            setAnimating(false);
            // Flash "Done" button when landing on last step
            if (idx === steps.length - 1) {
                setTimeout(() => setDoneFlash(true), 150);
                setTimeout(() => setDoneFlash(false), 900);
            }
        }, 220);
    }, [animating, steps.length]);

    const next = useCallback(() => {
        if (current < steps.length - 1) goTo(current + 1, 'forward');
    }, [current, steps.length, goTo]);

    const prev = useCallback(() => {
        goTo(current - 1, 'backward');
    }, [current, goTo]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, next, prev]);

    const step = steps[current];

    // Slide-out transform for outgoing content
    const slideOut = animating
        ? direction === 'forward'
            ? 'translateX(-60px)'
            : 'translateX(60px)'
        : 'translateX(0)';

    // Slide-in keyframe via inline style on key-change
    const slideInStyle = {
        animation: `slideIn${direction === 'forward' ? 'Right' : 'Left'} 0.28s cubic-bezier(0.22,1,0.36,1) both`,
    };

    return (
        <>
            {/* Keyframe definitions injected once */}
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(60px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-60px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes modalEnter {
                    from { opacity: 0; transform: scale(0.93); }
                    to   { opacity: 1; transform: scale(1); }
                }
                @keyframes doneFlash {
                    0%   { background-color: transparent; color: inherit; }
                    40%  { background-color: rgba(34,197,94,0.3); color: #4ade80; }
                    100% { background-color: transparent; color: inherit; }
                }
            `}</style>

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                style={{
                    opacity: mounted ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                }}
            >
                {/* Modal card */}
                <div
                    className="relative bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    style={{
                        width: '95vw',
                        height: '95vh',
                        maxWidth: '600px',
                        animation: mounted ? 'modalEnter 0.3s cubic-bezier(0.22,1,0.36,1) both' : 'none',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>

                    {/* Step counter badge */}
                    <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full ${accent.badge} text-xs font-bold text-white transition-all duration-300`}>
                        Step {current + 1} of {steps.length}
                    </div>

                    {/* Image area — outgoing slide */}
                    <div
                        className="relative flex-1 min-h-0 bg-slate-950 overflow-hidden"
                        style={{
                            opacity: animating ? 0 : 1,
                            transform: slideOut,
                            transition: 'opacity 0.22s ease, transform 0.22s ease',
                        }}
                    >
                        {/* Incoming image (key-based re-mount for slide-in) */}
                        <img
                            key={contentKey}
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                            style={!animating ? slideInStyle : {}}
                        />

                        {/* Highlight overlay */}
                        {step.highlight && (
                            <div
                                className={`absolute rounded-xl border-2 ${accent.dot.replace('bg-', 'border-')} animate-pulse`}
                                style={step.highlight}
                            />
                        )}
                    </div>

                    {/* Text area — fades up on step change */}
                    <div
                        key={`text-${contentKey}`}
                        className="p-5"
                        style={!animating ? { animation: 'fadeSlideUp 0.32s cubic-bezier(0.22,1,0.36,1) both' } : { opacity: 0 }}
                    >
                        <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Navigation controls */}
                    <div className="flex items-center justify-between px-5 pb-4 pt-2 flex-shrink-0">
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
                                    onClick={() => goTo(i, i > current ? 'forward' : 'backward')}
                                    className={`rounded-full transition-all duration-300 cursor-pointer ${i === current
                                            ? `${accent.dot} w-4 h-2.5`
                                            : `bg-slate-600 ${accent.dotHover} w-2.5 h-2.5`
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Next / Done button */}
                        <button
                            onClick={() => {
                                if (current === steps.length - 1) {
                                    onClose();
                                } else {
                                    next();
                                }
                            }}
                            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                            style={
                                doneFlash
                                    ? { animation: 'doneFlash 0.75s ease both' }
                                    : {}
                            }
                        >
                            {current === steps.length - 1 ? 'Done ✓' : 'Next'} {current < steps.length - 1 && <ChevronRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TutorialModal;
