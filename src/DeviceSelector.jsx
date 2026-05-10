import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Crosshair, EyeOff, BatteryCharging } from 'lucide-react';

const AndroidLogo = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <mask id="android-mask-selector">
            <rect width="100" height="100" fill="white" />
            <circle cx="31" cy="62" r="4" fill="black" />
            <circle cx="69" cy="62" r="4" fill="black" />
        </mask>
        <g mask="url(#android-mask-selector)" fill="currentColor">
            <path d="M 10 85 A 40 40 0 0 1 90 85 Z" />
            <line x1="28.5" y1="38.5" x2="35" y2="52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <line x1="71.5" y1="38.5" x2="65" y2="52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </g>
    </svg>
);

const AppleLogo = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 384 512" fill="currentColor" className={className}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
);

const StickFigureAnimation = () => (
    <div className="w-full max-w-lg mx-auto mb-10 h-48 bg-slate-800/40 rounded-3xl border border-slate-700/50 overflow-hidden relative shadow-inner">
        <style>{`
            @keyframes driveAway {
                0% { transform: translateX(0px); }
                40% { transform: translateX(200px); }
                50% { transform: translateX(200px) scaleX(-1); }
                90% { transform: translateX(0px) scaleX(-1); }
                100% { transform: translateX(0px); }
            }
            @keyframes signalPing {
                0% { r: 0; opacity: 1; }
                100% { r: 50px; opacity: 0; }
            }
            @keyframes dash {
                to { stroke-dashoffset: -20; }
            }
        `}</style>
        <svg viewBox="0 0 500 200" className="w-full h-full text-slate-300">
            {/* Owner Stick Figure */}
            <g className="owner">
                <circle cx="80" cy="110" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
                <line x1="80" y1="122" x2="80" y2="160" stroke="currentColor" strokeWidth="3" />
                {/* Arms holding phone */}
                <path d="M 80 135 L 105 140 L 115 125" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 80 135 L 70 150" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                {/* Legs */}
                <path d="M 80 160 L 65 190 M 80 160 L 95 190" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                
                {/* Owner's Phone */}
                <rect x="110" y="110" width="12" height="20" rx="2" fill="#3b82f6" />
                {/* Radar waves on phone */}
                <path d="M 116 105 Q 120 100 126 105 M 112 100 Q 120 92 130 100" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
            </g>

            {/* Thief and Car */}
            <g style={{ animation: 'driveAway 10s ease-in-out infinite' }}>
                {/* Thief Head */}
                <circle cx="260" cy="120" r="10" fill="none" stroke="#ef4444" strokeWidth="3" />
                <path d="M 253 117 L 267 117" stroke="#ef4444" strokeWidth="2" /> {/* angry brow */}
                
                {/* Car */}
                <path d="M 210 145 L 230 110 L 310 110 L 330 145 L 360 145 C 365 145 365 175 360 175 L 200 175 C 195 175 195 145 200 145 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                {/* Windows */}
                <path d="M 235 115 L 260 115 L 260 140 L 220 140 Z" fill="#0f172a" />
                <path d="M 265 115 L 305 115 L 320 140 L 265 140 Z" fill="#0f172a" />
                
                {/* Wheels */}
                <circle cx="230" cy="175" r="14" fill="#020617" stroke="#475569" strokeWidth="2" />
                <circle cx="330" cy="175" r="14" fill="#020617" stroke="#475569" strokeWidth="2" />

                {/* Hidden LoPhone Tracker in Trunk */}
                <rect x="340" y="150" width="10" height="16" rx="2" fill="#10b981" />
                <circle cx="345" cy="158" r="0" fill="none" stroke="#10b981" strokeWidth="2" style={{ animation: 'signalPing 1.5s infinite' }} />
            </g>

            {/* Dotted Signal Line */}
            <path d="M 130 120 C 180 80 280 80 340 150" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6,6" style={{ animation: 'dash 1s linear infinite' }} />
        </svg>
    </div>
);

const DeviceSelector = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                    <ShieldAlert size={16} /> LoPhone Tracker
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    Turn your spare phone into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">anti-theft recovery beacon.</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Secure your car, bike, or luggage using an old smartphone. Our guide helps you completely ghost the device so if your property is ever moved without your consent, you can track it down and recover it safely.
                </p>

                <StickFigureAnimation />

                <div className="flex flex-wrap justify-center gap-6 mb-10">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-900 px-4 py-2 rounded-xl">
                        <EyeOff size={18} className="text-emerald-500" /> 100% Invisible
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-900 px-4 py-2 rounded-xl">
                        <BatteryCharging size={18} className="text-emerald-500" /> Months of Battery
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-900 px-4 py-2 rounded-xl">
                        <Crosshair size={18} className="text-emerald-500" /> Global Tracking
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-200 mb-6">Select the device you want to hide:</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full mb-16">
                {/* iPhone Card */}
                <Link
                    to="/iphone"
                    className="group relative p-8 rounded-3xl border border-slate-700 bg-slate-800 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-blue-900/20 cursor-pointer no-underline text-inherit"
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <AppleLogo size={40} className="text-white drop-shadow-md" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100 mb-1">iPhone</h2>
                        </div>
                    </div>
                </Link>

                {/* Android Card */}
                <Link
                    to="/android"
                    className="group relative p-8 rounded-3xl border border-slate-700 bg-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-emerald-900/20 cursor-pointer no-underline text-inherit"
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <AndroidLogo size={40} className="text-white drop-shadow-md" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100 mb-1">Android</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DeviceSelector;
