import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Circle, ShieldAlert, Radio, MapPin, Zap, Copy, Download, Battery, ChevronDown, ChevronRight, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TutorialModal from './TutorialModal';

const themeMap = {
    blue: {
        text: 'text-blue-500',
        textLight: 'text-blue-400',
        textHover: 'hover:text-blue-200',
        textMuted: 'text-blue-300',
        bgSoft: 'bg-blue-600/20',
        bgHover: 'hover:bg-blue-600/40',
        bgSubtle: 'bg-blue-900/10',
        border: 'border-blue-500/30',
        gradientStart: 'from-blue-600',
        gradientEnd: 'to-indigo-900',
        shadow: 'shadow-blue-500/20',
        simActive: 'bg-blue-600 text-white shadow-lg',
        btnFooter: 'bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 hover:text-blue-200 border-blue-500/30',
    },
    emerald: {
        text: 'text-emerald-500',
        textLight: 'text-emerald-400',
        textHover: 'hover:text-emerald-200',
        textMuted: 'text-emerald-300',
        bgSoft: 'bg-emerald-600/20',
        bgHover: 'hover:bg-emerald-600/40',
        bgSubtle: 'bg-emerald-900/10',
        border: 'border-emerald-500/30',
        gradientStart: 'from-emerald-600',
        gradientEnd: 'to-teal-900',
        shadow: 'shadow-emerald-500/20',
        simActive: 'bg-emerald-600 text-white shadow-lg',
        btnFooter: 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-emerald-200 border-emerald-500/30',
    },
    purple: {
        text: 'text-purple-500',
        textLight: 'text-purple-400',
        textHover: 'hover:text-purple-200',
        textMuted: 'text-purple-300',
        bgSoft: 'bg-purple-600/20',
        bgHover: 'hover:bg-purple-600/40',
        bgSubtle: 'bg-purple-900/10',
        border: 'border-purple-500/30',
        gradientStart: 'from-purple-600',
        gradientEnd: 'to-fuchsia-900',
        shadow: 'shadow-purple-500/20',
        simActive: 'bg-purple-600 text-white shadow-lg',
        btnFooter: 'bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 hover:text-purple-200 border-purple-500/30',
    }
};

const TrackerGuideUI = ({ 
    title, 
    icon, 
    colorTheme, 
    storageKey, 
    initialTasks, 
    tutorials, 
    csvPrefix, 
    showSimToggle = true 
}) => {
    const [simMode, setSimMode] = useState('no-sim'); // 'no-sim' or 'with-sim'
    const [tasks, setTasks] = useState(initialTasks);
    const [expandedPhases, setExpandedPhases] = useState({
        1: true, 2: true, 3: true, 4: false, 5: false
    });
    const autoCollapsedRef = useRef(new Set());
    const [showTutorial, setShowTutorial] = useState(null);

    const theme = themeMap[colorTheme] || themeMap.blue;

    // Derived State
    const visibleTasks = simMode === 'with-sim' ? tasks : tasks.filter(t => !t.requiresSim);
    const totalVisible = visibleTasks.length;
    const completedVisible = visibleTasks.filter(t => t.completed).length;
    const progressPercent = Math.round((completedVisible / totalVisible) * 100);

    // Auto-collapse phases when they hit 100% completion
    useEffect(() => {
        [1, 2, 3, 4, 5].forEach(phase => {
            const phaseTasks = visibleTasks.filter(t => t.phase === phase);
            if (phaseTasks.length > 0) {
                const allDone = phaseTasks.every(t => t.completed);
                if (allDone && !autoCollapsedRef.current.has(phase)) {
                    // Newly completed, auto-collapse
                    setExpandedPhases(prev => ({ ...prev, [phase]: false }));
                    autoCollapsedRef.current.add(phase);
                } else if (!allDone && autoCollapsedRef.current.has(phase)) {
                    // No longer 100% complete, remove from set so it can auto-collapse again later
                    autoCollapsedRef.current.delete(phase);
                }
            }
        });
    }, [visibleTasks]);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const merged = initialTasks.map(task => ({
                    ...task,
                    completed: parsed[task.id] || false
                }));
                setTasks(merged);
            } catch (e) {
                console.error("Failed to load progress:", e);
            }
        }
    }, [storageKey, initialTasks]);

    // Save progress to localStorage whenever tasks change
    useEffect(() => {
        const progressMap = {};
        tasks.forEach(t => progressMap[t.id] = t.completed);
        localStorage.setItem(storageKey, JSON.stringify(progressMap));
    }, [tasks, storageKey]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const resetProgress = () => {
        if (window.confirm('Are you sure you want to reset all progress for this device?')) {
            setTasks(tasks.map(t => ({ ...t, completed: false })));
            localStorage.removeItem(storageKey);
            autoCollapsedRef.current.clear();
            setExpandedPhases({ 1: true, 2: true, 3: true, 4: false, 5: false });
        }
    };

    const handleTutorialComplete = (tutorialKey) => {
        const phaseMatch = tutorialKey.match(/phase(\d+)/);
        if (phaseMatch) {
            const phaseNum = parseInt(phaseMatch[1], 10);
            setTasks(prevTasks => prevTasks.map(t => 
                t.phase === phaseNum && (!t.requiresSim || simMode === 'with-sim') 
                    ? { ...t, completed: true } 
                    : t
            ));
        }
    };

    const exportProgress = () => {
        const csvContent = [
            ["ID", "Phase", "Title", "Status"],
            ...visibleTasks.map(t => [t.id, t.phase, `"${t.title.replace(/"/g, '""')}"`, t.completed ? "Completed" : "Pending"])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', `${csvPrefix}_${simMode}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-32">
            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
                <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm">Back to Devices</span>
                    </Link>
                    <div className="flex gap-3">
                        <button onClick={resetProgress} title="Reset Progress" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <ShieldAlert size={18} />
                        </button>
                        <button onClick={exportProgress} title="Export CSV Report" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <Download size={18} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-6 pt-10 pb-12">
                <div className={`p-8 rounded-3xl bg-gradient-to-br ${theme.gradientStart} ${theme.gradientEnd} shadow-2xl ${theme.shadow} mb-10 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        {icon}
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md text-white">
                                {icon}
                            </div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
                        </div>
                        <p className="text-blue-100 mb-8 font-medium">Turn this phone into an invisible, battery-sipping tracking beacon.</p>

                        <div className="bg-black/20 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
                            <div className="flex justify-between text-sm font-bold text-white mb-2">
                                <span>Total Hardening Progress</span>
                                <span>{progressPercent}%</span>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-white h-3 rounded-full transition-all duration-700 ease-out"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {showSimToggle && (
                    <div className="flex justify-center mb-10">
                        <div className="bg-slate-800/80 p-1 rounded-2xl flex backdrop-blur-md border border-slate-700/50">
                            <button
                                onClick={() => setSimMode('no-sim')}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${simMode === 'no-sim' ? theme.simActive : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                            >
                                Wi-Fi Only (No SIM)
                            </button>
                            <button
                                onClick={() => setSimMode('with-sim')}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${simMode === 'with-sim' ? theme.simActive : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                            >
                                With SIM Card
                            </button>
                        </div>
                    </div>
                )}

                {[1, 2, 3, 4, 5].map(phase => {
                    const phaseTasks = visibleTasks.filter(t => t.phase === phase);
                    
                    if (phaseTasks.length === 0 && phase === 3 && simMode === 'no-sim' && showSimToggle) {
                        return (
                            <section key={phase} className="mb-10">
                                <h2 className={`text-xl font-bold mb-5 flex items-center gap-3 ${theme.textMuted} border-b border-slate-800 pb-2`}>
                                    <Zap size={22} className={theme.text} />
                                    Phase 3: Tripwire Routines
                                </h2>
                                <div className="p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-800/30 text-center flex flex-col items-center gap-4">
                                    <p className="text-slate-400 text-sm italic">
                                        ⚠️ These steps require a SIM card to send offline text message alerts.
                                    </p>
                                    <button 
                                        onClick={() => setSimMode('with-sim')}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${theme.btnFooter}`}
                                    >
                                        Unlock "With SIM" Features
                                    </button>
                                </div>
                            </section>
                        );
                    }

                    if (phaseTasks.length === 0) return null;

                    const completedCount = phaseTasks.filter(t => t.completed).length;
                    const isCompleted = completedCount === phaseTasks.length;
                    const isExpanded = expandedPhases[phase];
                    const tutorialKey = `phase${phase}`;
                    
                    const phaseTitle = {
                        1: "Ghost Hardening",
                        2: "Find Network",
                        3: "Tripwire Routines",
                        4: "Optimization (Optional)",
                        5: "Samsung Specifics (Optional)"
                    }[phase];

                    const PhaseIcon = {
                        1: Radio,
                        2: MapPin,
                        3: Zap,
                        4: Battery,
                        5: Battery
                    }[phase];

                    return (
                        <section key={phase} className="mb-10">
                            <div className={`w-full text-xl font-bold mb-5 flex items-center gap-3 ${isCompleted ? theme.textMuted : theme.text} border-b border-slate-800 pb-2 transition-colors`}>
                                <button
                                    onClick={() => setExpandedPhases(prev => ({...prev, [phase]: !prev[phase]}))}
                                    className={`flex items-center gap-3 ${theme.textHover} transition-colors cursor-pointer bg-transparent text-left flex-1`}
                                >
                                    {isExpanded ? <ChevronDown size={22} className={theme.text} /> : <ChevronRight size={22} className={theme.text} />}
                                    <PhaseIcon size={22} className={theme.text} />
                                    <span className={isCompleted ? 'line-through opacity-70' : ''}>Phase {phase}: {phaseTitle}</span>
                                    {isCompleted ? (
                                        <span className={`text-sm font-bold ml-4 ${theme.textLight} flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md`}>
                                            <CheckCircle2 size={16} /> Completed
                                        </span>
                                    ) : (
                                        <span className="text-sm font-normal text-slate-500 ml-4">{completedCount}/{phaseTasks.length} done</span>
                                    )}
                                </button>
                                {tutorials[tutorialKey] && (
                                    <button
                                        onClick={() => setShowTutorial(tutorialKey)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${theme.bgSoft} ${theme.bgHover} ${theme.textMuted} ${theme.textHover} text-xs font-medium transition-all cursor-pointer border ${theme.border}`}
                                    >
                                        <Eye size={14} /> Show me how
                                    </button>
                                )}
                            </div>
                            {isExpanded && (
                                <div className="grid gap-3">
                                    {phaseTasks.map(task => (
                                        <div
                                            key={task.id}
                                            id={`task-${task.id}`}
                                            onClick={() => toggleTask(task.id)}
                                            className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${task.completed
                                                ? `${theme.bgSubtle} ${theme.border} opacity-60 hover:opacity-100`
                                                : 'bg-slate-800 border-slate-700 hover:border-slate-500 shadow-lg shadow-black/20'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 flex-shrink-0">
                                                    {task.completed ? (
                                                        <CheckCircle2 className={theme.textLight} size={24} />
                                                    ) : (
                                                        <Circle className="text-slate-600 group-hover:text-slate-400" size={24} />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                                                        {task.title}
                                                    </h3>
                                                    <p className={`text-sm mt-1 leading-relaxed ${task.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                                                        {task.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>

            {/* Sticky progress footer */}
            {(() => {
                const completed = visibleTasks.filter(t => t.completed).length;
                const total = visibleTasks.length;
                const nextTask = visibleTasks.find(t => !t.completed);
                return (
                    <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 py-3 px-6 flex items-center justify-between z-40">
                        <span className="text-sm text-slate-300 font-medium">
                            ✓ {completed}/{total} tasks complete
                        </span>
                        {nextTask && (
                            <button
                                onClick={() => {
                                    // Make sure the phase is expanded before scrolling to it
                                    setExpandedPhases(prev => ({...prev, [nextTask.phase]: true}));
                                    setTimeout(() => {
                                        document.getElementById(`task-${nextTask.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 100);
                                }}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${theme.btnFooter}`}
                            >
                                Jump to next →
                            </button>
                        )}
                    </div>
                );
            })()}

            {showTutorial !== null && tutorials[showTutorial] && (
                <TutorialModal
                    steps={tutorials[showTutorial]}
                    onClose={() => setShowTutorial(null)}
                    onComplete={() => handleTutorialComplete(showTutorial)}
                    accentColor={colorTheme}
                />
            )}
        </div>
    );
};

export default TrackerGuideUI;
