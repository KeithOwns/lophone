import React, { useState } from 'react';
import { CheckCircle2, Circle, ShieldAlert, Radio, MapPin, Zap, Copy, Download, Battery } from 'lucide-react';

const App = () => {
  const [simMode, setSimMode] = useState('no-sim'); // 'no-sim' or 'with-sim'
  const [tasks, setTasks] = useState([
    { id: 0, phase: 1, title: 'Update Software (Optional)', desc: 'Settings > Software update. Ensure OS, Play Store, and Galaxy Store apps are fully updated before proceeding.', completed: false },
    { id: 1, phase: 1, title: 'Account Isolation', desc: 'Signed in with dedicated account (2016.BMW.528i.black@gmail.com).', completed: true },
    { id: 2, phase: 1, title: 'Secure Lock Screen', desc: '6+ digit PIN set. Biometrics and "Face/Lift to wake" disabled.', completed: true },
    { id: 3, phase: 1, title: 'Secure lock settings: Device Settings', desc: 'Settings > Lock screen > Secure lock settings. Note: a. Auto lock: Immediately, b. Lock instantly with side button: ON.', completed: true },
    { id: 4, phase: 1, title: 'Secure lock settings: Network Security', desc: 'Settings > Lock screen > Secure lock settings. Note: c. Auto factory reset: OFF, d. Lock network and security: ON, e. Show Lockdown option: OFF.', completed: true },
    { id: 5, phase: 1, title: 'Auto Blocker: Max Restrictions', desc: 'Settings > Security and privacy > Auto Blocker. Maximum Restrictions: ON, App protection: ON.', completed: true },
    { id: 6, phase: 1, title: 'Lost Device: Theft Detection Lock', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Theft Detection Lock" ON.', completed: false },
    { id: 7, phase: 1, title: 'Lost Device: Offline Device Lock', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Offline Device Lock" ON.', completed: false },
    { id: 18, phase: 1, title: 'Lost Device: Remote Lock (Optional)', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Remote Lock" ON.', completed: false, requiresSim: true },
    { id: 8, phase: 1, title: 'App Protection', desc: 'Settings > Security and privacy > App Security. App Protection: ON.', completed: false },
    { id: 9, phase: 1, title: 'Hide Notifications', desc: 'Settings > Notifications > Lock screen notifications. Set to "Hide Content".', completed: false },
    { id: 25, phase: 1, title: 'Mute Sounds & Disable Vibration', desc: 'Settings > Sounds and vibration. Sound mode: Mute. System vibration: OFF. (Prevents discovering the tracker via sound/buzzing).', completed: false },
    { id: 20, phase: 1, title: 'Silence & Do Not Disturb', desc: 'Settings > Notifications > Do Not Disturb. Toggle ON. (Reduces chance of thief hearing the tracker).', completed: false },
    { id: 10, phase: 1, title: 'Dark Mode & Zero Brightness (Optional)', desc: 'Display set to Dark Mode. Brightness at 0%.', completed: true },
    { id: 22, phase: 4, title: 'Uninstall/Disable Bloatware (Optional)', desc: 'Settings > Apps. Uninstall or disable all non-essential apps. If an app lacks a "Disable" button (e.g. Samsung Internet), just ignore it.', completed: false },
    { id: 23, phase: 4, title: 'Disable Auto Sync Data (Optional)', desc: 'Settings > Accounts and backup > Manage accounts > Auto sync data. Toggle OFF to prevent background battery drain.', completed: false },
    { id: 31, phase: 4, title: 'Hardening: Never Sleep Tracking', desc: 'Settings > Battery > Background usage limits > Never auto-sleeping apps > + > Add "Samsung Find" and "Google Play Services". (Ensures tracking isn’t killed for power).', completed: false },
    { id: 34, phase: 4, title: 'Hardening: Connected Devices', desc: 'Settings > Connected devices. Toggle OFF: Quick Share (No one), Music Share, Continue on other devices, Link to Windows, Multi control. (Reduces attack surface and saves battery).', completed: false },
    { id: 29, phase: 4, title: 'Stealth: Scrub Contact Handshake', desc: 'Once location sharing is confirmed on your primary phone, DELETE the "Primary Owner" contact from the tracker’s local address book. (Removes the trail back to you).', completed: false },
    { id: 27, phase: 4, title: 'Stealth: Silence Tracking Alerts', desc: 'Settings > Apps > Samsung Find > Notifications > App notifications > Sound and vibration: Toggle OFF; Uncheck all (Lock screen, Badge, Pop-up).', completed: false },
    { id: 21, phase: 2, title: 'Bluetooth & Wi-Fi Tracking', desc: 'Settings > Connections. Ensure both Bluetooth and Wi-Fi are toggled ON. Without Bluetooth, the offline beacon will not broadcast.', completed: false },
    { id: 12, phase: 2, title: 'Google Find My Device App (Optional)', desc: 'Install "Find My Device" app. Sign in. Go to Settings > Apps > Find Device. Notifications: OFF. Location: Allow only while using app. (Prevents "Green Dot" location indicator from alerting thief).', completed: false },
    { id: 19, phase: 2, title: 'Google Find My Device (System)', desc: 'Settings > Google > Find My Device. 1. Find your offline devices: "With network everywhere". 2. Send last location: ON.', completed: false },
    { id: 32, phase: 2, title: 'Samsung Find: Send Last Location', desc: 'Settings > Security and privacy > Lost device protection > Find My Mobile > Send last location: ON. (Ensures the phone pings its coordinates right before the battery dies).', completed: false },
    { id: 14, phase: 3, title: 'Unplug Alert (Battery Save)', desc: 'Modes & Routines > Routines tab > +. If: Charging Status > Not Charging. Then: Power Saving (ON). (If SIM: Also add "Send message to primary: UNPLUGGED").', completed: false },
    { id: 15, phase: 3, title: 'Movement Trigger (Geofence)', desc: 'Modes & Routines > Routines tab > +. If: Place > Leaving [Home/Work/Garage]. Use 150-200m radius. Then: Wi-Fi (OFF). (Prioritizes high-precision GPS. If SIM: Also add "Send message: MOVING").', completed: false },
    { id: 30, phase: 3, title: 'Critical Battery Lockdown', desc: 'Modes & Routines > Routines tab > +. If: Battery level < 25%. Then: Screen brightness (0%) + All Wi-Fi/Sync (OFF) + Power Saving (ON). (Last-ditch effort to keep beacon alive).', completed: false },
  ]);

  const visibleTasks = simMode === 'with-sim' ? tasks : tasks.filter(t => !t.requiresSim);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const copyToSheets = () => {
    const header = "Phase\tTask\tDescription\tStatus\n";
    const body = tasks.map(t => `Phase ${t.phase}\t${t.title}\t${t.desc}\t${t.completed ? 'Done' : 'Pending'}`).join('\n');
    const fullText = header + body;

    // Fallback logic since document.execCommand gets deprecated
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
    a.setAttribute('download', `samsung_anti_theft_log_${simMode}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const progress = Math.round((visibleTasks.filter(t => t.completed).length / visibleTasks.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
            <ShieldAlert className="text-blue-400" /> Samsung Anti-Theft Tracker
          </h1>
          <p className="text-slate-400 mb-6 text-sm">Target Configuration: Samsung Galaxy Device | Android 16 | One UI 8.0</p>
          <div className="w-full bg-slate-800 rounded-full h-4 mb-2">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">{progress}% Hardened</p>
        </header>

        <div className="flex bg-slate-800 p-1 rounded-2xl mb-8 w-fit mx-auto md:mx-0 border border-slate-700">
          <button
            onClick={() => setSimMode('no-sim')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${simMode === 'no-sim' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
          >
            No SIM (Offline Tracking)
          </button>
          <button
            onClick={() => setSimMode('with-sim')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${simMode === 'with-sim' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
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

        {[1, 2, 3, 4].map(phase => {
          const phaseTasks = visibleTasks.filter(t => t.phase === phase);
          if (phaseTasks.length === 0) return null;

          return (
            <section key={phase} className="mb-10">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-300 border-b border-slate-800 pb-2">
                {phase === 1 && <Radio size={22} className="text-blue-500" />}
                {phase === 2 && <MapPin size={22} className="text-blue-500" />}
                {phase === 3 && <Zap size={22} className="text-blue-500" />}
                {phase === 4 && <Battery size={22} className="text-blue-500" />}
                Phase {phase}: {phase === 1 ? 'Ghost Hardening' : phase === 2 ? 'Find Network' : phase === 3 ? 'Tripwire Routines' : 'Optimization (Optional)'}
              </h2>
              <div className="grid gap-3">
                {phaseTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${task.completed
                      ? 'bg-blue-900/10 border-blue-500/30 opacity-60 hover:opacity-100'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 shadow-lg shadow-black/20'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        {task.completed ? (
                          <CheckCircle2 className="text-blue-400" size={24} />
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
      </div>
    </div>
  );
};

export default App;
