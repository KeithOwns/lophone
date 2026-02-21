import React, { useState } from 'react';
import { CheckCircle2, Circle, ShieldAlert, Radio, MapPin, Zap, Copy, Download } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, phase: 1, title: 'Account Isolation', desc: 'Signed in with dedicated account (2016.BMW.528i.black@gmail.com).', completed: true },
    { id: 2, phase: 1, title: 'Secure Lock Screen', desc: '6+ digit PIN set. Biometrics and "Face/Lift to wake" disabled.', completed: true },
    { id: 3, phase: 1, title: 'Secure lock settings: Device Settings', desc: 'Settings > Lock screen > Secure lock settings. Note: a. Auto lock: Immediately, b. Lock instantly with side button: ON.', completed: true },
    { id: 4, phase: 1, title: 'Secure lock settings: Network Security', desc: 'Settings > Lock screen > Secure lock settings. Note: c. Auto factory reset: OFF, d. Lock network and security: ON, e. Show Lockdown option: OFF.', completed: true },
    { id: 5, phase: 1, title: 'Auto Blocker: Max Restrictions', desc: 'Settings > Security and privacy > Auto Blocker. Maximum Restrictions: ON, App protection: ON.', completed: true },
    { id: 6, phase: 1, title: 'Lost Device: Theft Detection Lock', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Theft Detection Lock" ON.', completed: false },
    { id: 7, phase: 1, title: 'Lost Device: Offline Device Lock', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Offline Device Lock" ON.', completed: false },
    { id: 18, phase: 1, title: 'Lost Device: Remote Lock (SKIP)', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Skip "Remote Lock" (Requires active SIM/eSIM).', completed: true },
    { id: 8, phase: 1, title: 'App Protection', desc: 'Settings > Security and privacy > App Security. App Protection: ON.', completed: false },
    { id: 9, phase: 1, title: 'Hide Notifications', desc: 'Settings > Notifications > Lock screen notifications. Set to "Hide Content".', completed: false },
    { id: 10, phase: 1, title: 'Dark Mode & Zero Brightness', desc: 'Display set to Dark Mode. Brightness at 0%.', completed: true },
    { id: 11, phase: 2, title: 'Samsung Offline Finding', desc: 'Samsung Find settings > Offline Finding: Enabled. Phone number verification: Enabled (+1 951-299-6730).', completed: true },
    { id: 12, phase: 2, title: 'Google Find Hub (App)', desc: 'Install "Find Hub" APP. Sign in. Go to Phone Settings > Apps > Find Hub. Notifications: OFF. Location: Allow only while using app.', completed: false },
    { id: 19, phase: 2, title: 'Google Find Hub Network', desc: 'Settings > Google > Find Hub > Tap your Device Name > Find your offline devices. Set to "With network everywhere".', completed: false },
    { id: 13, phase: 2, title: 'Store Recent Location', desc: 'Settings > Google > Find Hub > Tap your Device Name. Store recent location: ON.', completed: false },
    { id: 14, phase: 3, title: 'Unplug Alert Routine', desc: 'Routine: If Charging Status is "Not Charging" -> Send text to primary phone ("🚨 TRACKER UNPLUGGED").', completed: false },
    { id: 15, phase: 3, title: 'Movement Trigger Routine', desc: 'Routine: If Leaving [Home Address] (100m Geofence) -> Disable Power Saving + Send text ("Car is moving").', completed: false }
  ]);

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
    const body = tasks.map(t => `${t.phase},"${t.title}","${t.desc}",${t.completed ? 'Done' : 'Pending'}`).join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 's25_anti_theft_log.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
            <ShieldAlert className="text-blue-400" /> S25 Anti-Theft Tracker
          </h1>
          <div className="w-full bg-slate-800 rounded-full h-4 mb-2">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">{progress}% Hardened</p>
        </header>

        <div className="flex gap-4 mb-8">
          <button onClick={copyToSheets} className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-sm border border-slate-700 transition-all active:scale-95">
            <Copy size={16} /> Copy for Sheets
          </button>
          <button onClick={downloadExcel} className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-sm border border-slate-700 transition-all active:scale-95">
            <Download size={16} /> Download CSV
          </button>
        </div>

        {[1, 2, 3].map(phase => (
          <section key={phase} className="mb-10">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-300 border-b border-slate-800 pb-2">
              {phase === 1 && <Radio size={22} className="text-blue-500" />}
              {phase === 2 && <MapPin size={22} className="text-blue-500" />}
              {phase === 3 && <Zap size={22} className="text-blue-500" />}
              Phase {phase}: {phase === 1 ? 'Ghost Hardening' : phase === 2 ? 'Find Network' : 'Tripwire Routines'}
            </h2>
            <div className="grid gap-3">
              {tasks.filter(t => t.phase === phase).map(task => (
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
        ))}
      </div>
    </div>
  );
};

export default App;
