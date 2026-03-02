import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Smartphone } from 'lucide-react';

const DeviceSelector = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                    <ShieldAlert className="text-blue-400" size={36} /> LoPhone Tracker
                </h1>
                <p className="text-slate-400 text-lg">Choose your device to begin anti-theft hardening</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
                {/* Samsung Card */}
                <Link
                    to="/samsung"
                    className="group relative p-8 rounded-3xl border border-slate-700 bg-slate-800 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-blue-900/20 cursor-pointer no-underline text-inherit"
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Smartphone size={36} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-100 mb-1">Samsung Galaxy S25</h2>
                            <p className="text-slate-400 text-sm">Android 16 · One UI 8.0</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium border border-blue-500/30">
                            15 core steps · 6 optional
                        </span>
                    </div>
                </Link>

                {/* iPhone Card */}
                <Link
                    to="/iphone"
                    className="group relative p-8 rounded-3xl border border-slate-700 bg-slate-800 hover:border-purple-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-purple-900/20 cursor-pointer no-underline text-inherit"
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Smartphone size={36} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-100 mb-1">iPhone 16</h2>
                            <p className="text-slate-400 text-sm">iOS 18</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs font-medium border border-purple-500/30">
                            14 core steps · 5 optional
                        </span>
                    </div>
                </Link>
            </div>

            <p className="text-slate-500 text-xs mt-10">Anti-theft configuration for hidden vehicle trackers</p>
        </div>
    );
};

export default DeviceSelector;
