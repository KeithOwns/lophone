import React, { useState } from 'react';
import { CheckCircle2, Circle, ShieldAlert, Radio, MapPin, Zap, Copy, Download, Battery, ChevronDown, ChevronRight, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TutorialModal from './TutorialModal';

const IPhoneApp = () => {
    const [simMode, setSimMode] = useState('no-sim');
    const [showOptional, setShowOptional] = useState(false);
    const [showTutorial, setShowTutorial] = useState(null);

    const tutorials = {
        phase1: [
            // 1. Update Software
            {
                image: '/ios_settings_general.png',
                title: '1/14 · Update Software',
                description: 'Open Settings > General > Software Update. Download and install the latest iOS version.',
            },
            {
                image: '/ios_app_store.png',
                title: '1/14 · Update All Apps',
                description: 'Open the App Store > tap your profile icon > scroll down and tap "Update All" to patch all apps.',
            },
            // 2. Account Isolation
            {
                image: '/ios_apple_id.png',
                title: '2/14 · Account Isolation',
                description: 'Sign in with a dedicated Apple ID (not your personal one). Settings > tap your name at the top to access Apple ID settings.',
            },
            // 3. Account Recovery
            {
                image: '/ios_apple_id.png',
                title: '3/14 · Account Recovery',
                description: 'Settings > [Apple ID] > Sign-In & Security > Account Recovery. Add your personal phone number or a trusted contact as a recovery method.',
            },
            // 4. Secure Lock Screen
            {
                image: '/ios_face_id_passcode.png',
                title: '4/14 · Secure Lock Screen',
                description: 'Settings > Face ID & Passcode. Set a 6+ digit numeric passcode. Disable Face ID by toggling all Face ID uses OFF.',
            },
            // 5. Auto-Lock
            {
                image: '/ios_display_brightness.png',
                title: '5/14 · Auto-Lock',
                description: 'Settings > Display & Brightness > Auto-Lock. Set to "30 Seconds" for the fastest lock time.',
            },
            // 6. Stolen Device Protection
            {
                image: '/ios_stolen_device.png',
                title: '6/14 · Stolen Device Protection',
                description: 'Settings > Face ID & Passcode > Stolen Device Protection. Set to "Always" to require biometric auth for sensitive changes even at familiar locations.',
            },
            // 7. USB Restricted Mode
            {
                image: '/ios_face_id_passcode.png',
                title: '7/14 · USB Restricted Mode',
                description: 'Settings > Face ID & Passcode > scroll to "Allow Access When Locked" > Accessories: OFF. Prevents USB data access while locked.',
            },
            // 8. Find My iPhone
            {
                image: '/ios_find_my.png',
                title: '8/14 · Find My iPhone',
                description: 'Settings > [Apple ID] > Find My > Find My iPhone: ON. Enable "Send Last Location" to transmit location when battery is critically low.',
            },
            // 9. Find My Network
            {
                image: '/ios_find_my.png',
                title: '9/14 · Find My Network',
                description: 'Same screen: toggle "Find My network" ON. This allows the phone to be located even when offline via nearby Apple devices.',
            },
            // 10. Hide Notifications
            {
                image: '/ios_notifications.png',
                title: '10/14 · Hide Notifications',
                description: 'Settings > Notifications > Show Previews: set to "Never". Prevents 2FA codes and messages from appearing on the lock screen.',
            },
            // 11. Silence & Focus
            {
                image: '/ios_do_not_disturb.png',
                title: '11/14 · Do Not Disturb',
                description: 'Settings > Focus > Do Not Disturb. Toggle ON and set schedule to "Always". Silences all calls and notifications.',
            },
            // 12. Mute Sounds
            {
                image: '/ios_sounds_haptics.png',
                title: '12/14 · Mute Sounds',
                description: 'Use the Action Button or side switch to enable Silent Mode. Settings > Sounds & Haptics: drag all volume sliders to zero. Disable "Keyboard Clicks" and "Lock Sound".',
            },
            // 13. Dark Mode & Brightness
            {
                image: '/ios_display_brightness.png',
                title: '13/14 · Dark Mode & Brightness',
                description: 'Settings > Display & Brightness. Select "Dark" appearance. Drag brightness slider to minimum (0%). Disable "True Tone".',
            },
            // 14. Disable Siri on Lock Screen
            {
                image: '/ios_face_id_passcode.png',
                title: '14/14 · Disable Siri on Lock Screen',
                description: 'Settings > Face ID & Passcode > "Allow Access When Locked" section > Siri: OFF. Prevents voice commands from bypassing the lock screen.',
            },
        ]
    };

    const [tasks, setTasks] = useState([
        // Phase 1: Ghost Hardening
        { id: 0, phase: 1, title: 'Update Software', desc: 'Settings > General > Software Update. Ensure iOS and all App Store apps are fully updated. Why: Patches known security exploits.', completed: false },
        { id: 1, phase: 1, title: 'Account Isolation', desc: 'Sign in with a dedicated Apple ID (not your personal one). Why: Prevents a thief from accessing your primary personal data if the lock screen is bypassed.', completed: false },
        { id: 2, phase: 1, title: 'Account Recovery', desc: 'Settings > [Apple ID] > Sign-In & Security > Account Recovery. Add your personal phone number as a recovery method. Why: Ensures you never lose access to the tracker\'s Apple ID.', completed: false },
        { id: 3, phase: 1, title: 'Secure Lock Screen', desc: 'Settings > Face ID & Passcode. Set a 6+ digit passcode. Disable Face ID. Why: Stops thieves from using biometrics or guessing easy codes.', completed: false },
        { id: 4, phase: 1, title: 'Auto-Lock', desc: 'Settings > Display & Brightness > Auto-Lock: 30 Seconds. Why: Ensures the phone locks quickly after the screen goes dark.', completed: false },
        { id: 5, phase: 1, title: 'Stolen Device Protection', desc: 'Settings > Face ID & Passcode > Stolen Device Protection: Always. Why: Requires biometric auth for sensitive changes (Apple ID password, turning off Find My) even without a security delay.', completed: false },
        { id: 6, phase: 1, title: 'USB Restricted Mode', desc: 'Settings > Face ID & Passcode > Accessories: OFF. Why: Blocks USB data connections while locked, preventing forensic extraction tools.', completed: false },
        { id: 7, phase: 1, title: 'Find My iPhone', desc: 'Settings > [Apple ID] > Find My > Find My iPhone: ON. Send Last Location: ON. Why: Core tracking capability — allows remote location, lock, and erase.', completed: false },
        { id: 8, phase: 1, title: 'Find My Network', desc: 'Settings > [Apple ID] > Find My > Find My Network: ON. Why: Enables offline tracking via the crowd-sourced Apple device network (1 billion+ devices).', completed: false },
        { id: 9, phase: 1, title: 'Hide Notifications', desc: 'Settings > Notifications > Show Previews: Never. Why: Prevents a thief from seeing 2FA codes, emails, or SMS alerts from the lock screen.', completed: false },
        { id: 10, phase: 1, title: 'Silence & Do Not Disturb', desc: 'Settings > Focus > Do Not Disturb: ON (scheduled Always). Why: Silences all calls and notifications to keep the tracker undetectable.', completed: false },
        { id: 11, phase: 1, title: 'Mute Sounds & Haptics', desc: 'Action Button or side switch to Silent Mode. Settings > Sounds & Haptics: all volumes to 0. Disable Keyboard Clicks & Lock Sound. Why: The tracker must be completely silent.', completed: false },
        { id: 12, phase: 1, title: 'Dark Mode & Zero Brightness', desc: 'Settings > Display & Brightness: Dark mode ON, brightness at 0%, True Tone OFF. Why: Maximizes battery life and makes accidental screen activation invisible.', completed: false },
        { id: 13, phase: 1, title: 'Disable Siri on Lock Screen', desc: 'Settings > Face ID & Passcode > Allow Access When Locked > Siri: OFF. Why: Prevents voice commands from bypassing the lock screen to access data or change settings.', completed: false },
        // Phase 2: Find Network
        { id: 14, phase: 2, title: 'Wi-Fi & Bluetooth Enabled', desc: 'Settings > Wi-Fi: ON. Settings > Bluetooth: ON. Why: Essential for offline tracking. The Find My network relies on Bluetooth to broadcast to nearby Apple devices.', completed: false },
        { id: 15, phase: 2, title: 'Find My Network Verified', desc: 'Settings > [Apple ID] > Find My > Find My iPhone. Verify "Find My network" is ON. Why: Double-check this critical setting that enables crowd-sourced offline location.', completed: false },
        { id: 16, phase: 2, title: 'Share My Location', desc: 'Settings > [Apple ID] > Find My > Share My Location: ON. Share with a trusted contact. Why: Allows a second person to track the device via their own Find My app.', completed: false },
        // Phase 3: Tripwire Routines (SIM only)
        { id: 17, phase: 3, title: 'Shortcuts: Charger Disconnect Alert', desc: 'Shortcuts app > Automation > + > "When Charger" disconnects > Send Message to your primary number. Why: Silently texts you if a thief unplugs the tracker.', completed: false, requiresSim: true },
        { id: 18, phase: 3, title: 'Shortcuts: Leave Location Alert', desc: 'Shortcuts app > Automation > + > "Leave" > select Home location > Send Message ("Vehicle moving"). Why: Auto-geofence alerts you if the vehicle leaves while you\'re away.', completed: false, requiresSim: true },
        // Phase 4: Optimization (Optional)
        { id: 19, phase: 4, title: 'Disable Background App Refresh', desc: 'Settings > General > Background App Refresh: OFF. Why: Prevents apps from waking up in the background, saving significant battery.', completed: false },
        { id: 20, phase: 4, title: 'Enable Low Power Mode', desc: 'Settings > Battery > Low Power Mode: ON. Why: Reduces background activity and extends standby time dramatically.', completed: false },
        { id: 21, phase: 4, title: 'Disable AirDrop', desc: 'Settings > General > AirDrop: Receiving Off. Why: Prevents discovery by nearby devices and saves battery.', completed: false },
        { id: 22, phase: 4, title: 'Disable Handoff', desc: 'Settings > General > AirPlay & Handoff > Handoff: OFF. Why: Unnecessary feature that consumes battery searching for nearby Apple devices.', completed: false },
        { id: 23, phase: 4, title: 'Remove Unnecessary Apps', desc: 'Settings > General > iPhone Storage > Offload Unused Apps. Why: Frees memory and eliminates background processes from apps you don\'t need.', completed: false },
    ]);

    const visibleTasks = simMode === 'with-sim' ? tasks : tasks.filter(t => !t.requiresSim);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const copyToSheets = () => {
        const header = "Phase\tTask\tDescription\tStatus\n";
        const body = tasks.map(t => `Phase ${t.phase}\t${t.title}\t${t.desc}\t${t.completed ? 'Done' : 'Pending'}`).join('\n');
        const fullText = header + body;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(fullText);
        } else {
            const el = document.createElement('textarea');
            el.value = fullText;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    };

    const downloadExcel = () => {
        const header = "Phase,Task,Description,Status\n";
        const body = visibleTasks.map(t => `${t.phase},"${t.title}","${t.desc}",${t.completed ? 'Done' : 'Pending'}`).join('\n');
        const blob = new Blob([header + body], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `iphone_anti_theft_log_${simMode}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const progress = Math.round((visibleTasks.filter(t => t.completed).length / visibleTasks.length) * 100) || 0;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <header className="mb-8 text-center md:text-left">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-300 text-sm mb-4 transition-colors no-underline">
                        <ArrowLeft size={16} /> Back to Device Selection
                    </Link>
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
                        <ShieldAlert className="text-purple-400" /> LoPhone Tracker
                    </h1>
                    <p className="text-slate-400 mb-6 text-sm">Target Configuration: iPhone 16 | iOS 18</p>
                    <div className="w-full bg-slate-800 rounded-full h-4 mb-2">
                        <div
                            className="bg-purple-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">{progress}% Hardened</p>
                </header>

                <div className="flex bg-slate-800 p-1 rounded-2xl mb-8 w-fit mx-auto md:mx-0 border border-slate-700">
                    <button
                        onClick={() => setSimMode('no-sim')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${simMode === 'no-sim' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                    >
                        No SIM (Offline Tracking)
                    </button>
                    <button
                        onClick={() => setSimMode('with-sim')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${simMode === 'with-sim' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
                    >
                        With SIM (Full Features)
                    </button>
                </div>

                <div className="flex gap-4 mb-8">
                    <button onClick={copyToSheets} className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-sm border border-slate-700 transition-all active:scale-95">
                        <Copy size={16} /> Copy for Sheets
                    </button>
                    <button onClick={downloadExcel} className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-sm border border-slate-700 transition-all active:scale-95">
                        <Download size={16} /> Download CSV
                    </button>
                </div>

                {[1, 2, 3].map(phase => {
                    const phaseTasks = visibleTasks.filter(t => t.phase === phase);

                    if (phaseTasks.length === 0 && phase === 3 && simMode === 'no-sim') {
                        return (
                            <section key={phase} className="mb-10 opacity-40">
                                <h2 className="text-xl font-bold mb-5 flex items-center gap-3 text-purple-300 border-b border-slate-800 pb-2">
                                    <Zap size={22} className="text-purple-500" />
                                    Phase 3: Tripwire Automations
                                </h2>
                                <div className="p-4 rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 text-center">
                                    <p className="text-slate-400 text-sm italic">
                                        🔒 Requires a SIM card — switch to "With SIM" mode to unlock these steps.
                                    </p>
                                </div>
                            </section>
                        );
                    }

                    if (phaseTasks.length === 0) return null;

                    return (
                        <section key={phase} className="mb-10">
                            <h2 className="text-xl font-bold mb-5 flex items-center gap-3 text-purple-300 border-b border-slate-800 pb-2">
                                {phase === 1 && <Radio size={22} className="text-purple-500" />}
                                {phase === 2 && <MapPin size={22} className="text-purple-500" />}
                                {phase === 3 && <Zap size={22} className="text-purple-500" />}
                                Phase {phase}: {phase === 1 ? 'Ghost Hardening' : phase === 2 ? 'Find Network' : 'Tripwire Automations'}
                                {phase === 1 && (
                                    <button
                                        onClick={() => setShowTutorial('phase1')}
                                        className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-purple-200 text-xs font-medium transition-all cursor-pointer border border-purple-500/30"
                                    >
                                        <Eye size={14} /> Show me how
                                    </button>
                                )}
                            </h2>
                            <div className="grid gap-3">
                                {phaseTasks.map(task => (
                                    <div
                                        key={task.id}
                                        onClick={() => toggleTask(task.id)}
                                        className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${task.completed
                                            ? 'bg-purple-900/10 border-purple-500/30 opacity-60 hover:opacity-100'
                                            : 'bg-slate-800 border-slate-700 hover:border-slate-500 shadow-lg shadow-black/20'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 flex-shrink-0">
                                                {task.completed ? (
                                                    <CheckCircle2 className="text-purple-400" size={24} />
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
                        </section>
                    );
                })}

                {/* Phase 4: Optional — Collapsible */}
                {(() => {
                    const optionalTasks = visibleTasks.filter(t => t.phase === 4);
                    if (optionalTasks.length === 0) return null;
                    const completedCount = optionalTasks.filter(t => t.completed).length;
                    return (
                        <section className="mb-10">
                            <button
                                onClick={() => setShowOptional(!showOptional)}
                                className="w-full text-xl font-bold mb-5 flex items-center gap-3 text-purple-300 border-b border-slate-800 pb-2 hover:text-purple-200 transition-colors cursor-pointer bg-transparent text-left"
                            >
                                {showOptional ? <ChevronDown size={22} className="text-purple-500" /> : <ChevronRight size={22} className="text-purple-500" />}
                                <Battery size={22} className="text-purple-500" />
                                Phase 4: Optimization (Optional)
                                <span className="text-sm font-normal text-slate-500 ml-auto">{completedCount}/{optionalTasks.length} done</span>
                            </button>
                            {showOptional && (
                                <div className="grid gap-3">
                                    {optionalTasks.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${task.completed
                                                ? 'bg-purple-900/10 border-purple-500/30 opacity-60 hover:opacity-100'
                                                : 'bg-slate-800 border-slate-700 hover:border-slate-500 shadow-lg shadow-black/20'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 flex-shrink-0">
                                                    {task.completed ? (
                                                        <CheckCircle2 className="text-purple-400" size={24} />
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
                })()}
            </div>

            {showTutorial !== null && tutorials[showTutorial] && (
                <TutorialModal
                    steps={tutorials[showTutorial]}
                    onClose={() => setShowTutorial(null)}
                />
            )}
        </div>
    );
};

export default IPhoneApp;
