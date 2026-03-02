import React, { useState } from 'react';
import { CheckCircle2, Circle, ShieldAlert, Radio, MapPin, Zap, Copy, Download, Battery, ChevronDown, ChevronRight, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TutorialModal from './TutorialModal';

const App = () => {
  const [simMode, setSimMode] = useState('no-sim'); // 'no-sim' or 'with-sim'
  const [showOptional, setShowOptional] = useState(false);
  const [showTutorial, setShowTutorial] = useState(null);

  const tutorials = {
    phase1: [
      // 1. Update Software
      {
        image: '/settings_home.png',
        title: '1/15 · Update Software',
        description: 'Open Settings and scroll to "Software update". Tap it to check for OS updates.',
      },
      {
        image: '/software_update.png',
        title: '1/15 · Download & Install',
        description: 'Tap "Download and install". Apply any available updates and restart when prompted.',
      },
      {
        image: '/play_store_updates.png',
        title: '1/15 · Update All Apps',
        description: 'Open Play Store > Profile > Manage apps & device > "Update all". Repeat in Galaxy Store.',
      },
      // 2. Account Isolation
      {
        image: '/account_settings.png',
        title: '2/15 · Account Isolation',
        description: 'Sign into a dedicated Google account (not your personal one). Settings > Accounts and backup > Manage accounts. This isolates the tracker from your real data.',
      },
      // 3. Account Recovery
      {
        image: '/account_settings.png',
        title: '3/15 · Account Recovery',
        description: 'Go to the dedicated account\'s Google security settings. Add your personal phone number as a recovery method so you never lose access.',
      },
      // 4. Secure Lock Screen
      {
        image: '/lock_screen_settings.png',
        title: '4/15 · Secure Lock Screen',
        description: 'Settings > Lock screen > Screen lock type. Set a 6+ digit PIN. Disable biometrics and "Face/Lift to wake" from the biometrics menus.',
      },
      // 5. Secure Lock Settings: Device
      {
        image: '/secure_lock_settings.png',
        title: '5/15 · Secure Lock: Device Settings',
        description: 'Settings > Lock screen > Secure lock settings. Set Auto lock to "Immediately" and toggle "Lock instantly with side button" ON.',
      },
      // 6. Secure Lock Settings: Network
      {
        image: '/secure_lock_settings.png',
        title: '6/15 · Secure Lock: Network Security',
        description: 'Same screen. Set Auto factory reset: OFF, Lock network and security: ON, Show Lockdown option: OFF.',
      },
      // 7. Auto Blocker
      {
        image: '/security_privacy.png',
        title: '7/15 · Navigate to Security',
        description: 'Go to Settings > Security and privacy. This is the hub for the next several steps.',
      },
      {
        image: '/auto_blocker.png',
        title: '7/15 · Auto Blocker',
        description: 'Tap "Auto Blocker". Turn ON Maximum Restrictions and App protection. Blocks malware via USB.',
      },
      // 8-10. Lost Device Protection
      {
        image: '/lost_device_protection.png',
        title: '8-10/15 · Lost Device Protection',
        description: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle ON all three: Theft Detection Lock, Offline Device Lock, and Remote Lock (SIM only).',
      },
      // 11. App Protection
      {
        image: '/app_security.png',
        title: '11/15 · App Protection',
        description: 'Settings > Security and privacy > App Security. Toggle App Protection ON to enable scanning apps for hidden malware.',
      },
      // 12. Hide Notifications
      {
        image: '/notifications_settings.png',
        title: '12/15 · Open Notifications',
        description: 'Go to Settings > Notifications. Tap "Lock screen notifications".',
      },
      {
        image: '/lock_screen_notifs.png',
        title: '12/15 · Hide Notification Content',
        description: 'Select "Hide content" to prevent 2FA codes, emails, and SMS from appearing on the lock screen.',
      },
      // 13. Mute Sounds & Disable Vibration
      {
        image: '/sounds_vibration.png',
        title: '13/15 · Mute Sounds & Vibration',
        description: 'Settings > Sounds and vibration. Set Sound mode to "Mute" and turn System vibration OFF. The tracker must be silent.',
      },
      // 14. Do Not Disturb
      {
        image: '/do_not_disturb.png',
        title: '14/15 · Do Not Disturb',
        description: 'Settings > Notifications > Do Not Disturb. Toggle ON for a secondary layer of noise suppression.',
      },
      // 15. Dark Mode & Brightness
      {
        image: '/display_settings.png',
        title: '15/15 · Dark Mode & Zero Brightness',
        description: 'Settings > Display. Enable Dark Mode and drag the brightness slider all the way to 0%. Maximizes battery life and stealth.',
      },
    ]
  };

  const [tasks, setTasks] = useState([
    { id: 0, phase: 1, title: 'Update Software', desc: 'Settings > Software update. Ensure OS, Play Store, and Galaxy Store apps are fully updated before proceeding. Why: Patches known security exploits.', completed: false },
    { id: 1, phase: 1, title: 'Account Isolation', desc: 'Signed in with dedicated account (2016.BMW.528i.black@gmail.com). Why: Prevents a thief from accessing your primary personal data if the lock screen is bypassed.', completed: false },
    { id: 26, phase: 1, title: 'Account Recovery', desc: 'Set your personal cell phone number as the account recovery method for the dedicated account. Why: Ensures you never lose access to the tracker\'s tracking account.', completed: false },
    { id: 2, phase: 1, title: 'Secure Lock Screen', desc: '6+ digit PIN set. Biometrics and "Face/Lift to wake" disabled. Why: Stops thieves from guessing easy patterns or using your biometric data against you.', completed: false },
    { id: 3, phase: 1, title: 'Secure lock settings: Device Settings', desc: 'Settings > Lock screen > Secure lock settings. Note: a. Auto lock: Immediately, b. Lock instantly with side button: ON. Why: Ensures the phone is instantly secured the moment the screen goes dark.', completed: false },
    { id: 4, phase: 1, title: 'Secure lock settings: Network Security', desc: 'Settings > Lock screen > Secure lock settings. Note: c. Auto factory reset: OFF, d. Lock network and security: ON, e. Show Lockdown option: OFF. Why: Prevents unauthorized resetting and blocks thieves from turning off Wi-Fi/Bluetooth from the lock screen.', completed: false },
    { id: 5, phase: 1, title: 'Auto Blocker: Max Restrictions', desc: 'Settings > Security and privacy > Auto Blocker. Maximum Restrictions: ON, App protection: ON. Why: Blocks malware installations via USB and restricts unauthorized software changes.', completed: false },
    { id: 6, phase: 1, title: 'Lost Device: Theft Detection Lock', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Theft Detection Lock" ON. Why: Automatically locks the screen if the phone detects sudden motion indicative of a snatch-and-run.', completed: false },
    { id: 7, phase: 1, title: 'Lost Device: Offline Device Lock', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Offline Device Lock" ON. Why: Secures the device even if the thief manages to disconnect it from the cellular or Wi-Fi network.', completed: false },
    { id: 18, phase: 1, title: 'Lost Device: Remote Lock', desc: 'Settings > Security and privacy > Lost device protection > Theft protection. Toggle "Remote Lock" ON. Why: Allows you to lock the device remotely via another phone.', completed: false, requiresSim: true },
    { id: 8, phase: 1, title: 'App Protection', desc: 'Settings > Security and privacy > App Security. App Protection: ON. Why: Scans for hidden malware that might compromise the tracker\'s integrity.', completed: false },
    { id: 9, phase: 1, title: 'Hide Notifications', desc: 'Settings > Notifications > Lock screen notifications. Set to "Hide Content". Why: Prevents a thief from seeing 2FA codes, emails, or SMS alerts from the lock screen.', completed: false },
    { id: 25, phase: 1, title: 'Mute Sounds & Disable Vibration', desc: 'Settings > Sounds and vibration. Sound mode: Mute. System vibration: OFF. Why: Prevents discovering the hidden tracker via unintended sound or buzzing notifications.', completed: false },
    { id: 20, phase: 1, title: 'Silence & Do Not Disturb', desc: 'Settings > Notifications > Do Not Disturb. Toggle ON. Why: A secondary layer of noise suppression to reduce the chance of a thief hearing the tracker.', completed: false },
    { id: 10, phase: 1, title: 'Dark Mode & Zero Brightness', desc: 'Display set to Dark Mode. Brightness at 0%. Why: Maximizes battery life and makes the screen difficult to see if it accidentally turns on in the dark.', completed: false },
    { id: 22, phase: 4, title: 'Uninstall/Disable Bloatware', desc: 'Settings > Apps. Uninstall or disable all non-essential apps. If an app lacks a "Disable" button (e.g. Samsung Internet), just ignore it. Why: Stops background apps from draining the battery unnecessarily.', completed: false },
    { id: 23, phase: 4, title: 'Disable Auto Sync Data', desc: 'Settings > Accounts and backup > Manage accounts > Auto sync data. Toggle OFF. Why: Prevents the phone from constantly waking up to check emails, saving massive background battery.', completed: false },
    { id: 24, phase: 4, title: 'Enable Easy Mode', desc: 'Settings > Display > Easy Mode. Toggle ON. Why: Provides a cleaner, magnified home screen layout for the few remaining apps you interact with.', completed: false },
    { id: 27, phase: 4, title: 'Disable NFC & Contactless', desc: 'Settings > Connections > NFC and contactless payments. Toggle OFF. Why: Unnecessary battery drain and prevents accidental tracking/triggering from nearby NFC readers.', completed: false },
    { id: 28, phase: 4, title: 'Disable Nearby Device Scanning', desc: 'Settings > Connections > More connection settings > Nearby device scanning. Toggle OFF. Why: Saves battery by stopping the phone from constantly searching for earbuds and smartwatches.', completed: false },
    { id: 29, phase: 4, title: 'Disable Auto System Updates', desc: 'Settings > Connections > More connection settings > Auto update system configurations. Toggle OFF. Why: Prevents Samsung from pushing silent background config changes, maximizing standby stability.', completed: false },
    { id: 21, phase: 2, title: 'Bluetooth & Wi-Fi Tracking', desc: 'Settings > Connections. Ensure both Bluetooth and Wi-Fi are toggled ON. Why: Essential for offline tracking. Without Bluetooth, the offline beacon will not broadcast to nearby phones.', completed: false },
    { id: 11, phase: 2, title: 'Samsung Offline Finding', desc: 'Samsung Find settings > Offline Finding: Enabled. Phone number verification: Enabled (+1 951-299-6730). Why: Encrypts offline location data and leverages the massive Galaxy finding network.', completed: false },
    { id: 12, phase: 2, title: 'Google Find Hub (App)', desc: 'Install "Find Hub" APP. Sign in. Go to Phone Settings > Apps > Find Hub. Notifications: OFF. Location: Allow only while using app. Why: Adds the Android/Google tracking network as a redundant backup to Samsung Find.', completed: false },
    { id: 19, phase: 2, title: 'Google Find Hub Network', desc: 'Settings > Google > Find Hub > Tap your Device Name > Find your offline devices. Set to "With network everywhere". Why: Maximizes the chances of the device being picked up by any passing Android phone, even in low-traffic areas.', completed: false },
    { id: 14, phase: 3, title: 'Unplug Alert Routine', desc: 'Modes & Routines > Routines tab > +. If: Add what will trigger... > Battery > Charging Status > Not Charging. Then: Add what this routine will do > Messages > Send message to primary. Why: Silently texts you instantly if a thief unplugs the hidden tracker.', completed: false, requiresSim: true },
    { id: 15, phase: 3, title: 'Movement Trigger Routine', desc: 'Modes & Routines > Routines tab > +. If: Add what will trigger... > Place > Leaving [Home]. Then: Add what this routine will do > Power Saving (ON) + Messages > Send message ("Moving"). Why: Creates an auto-geofence to alert you if the vehicle moves while you are away.', completed: false, requiresSim: true }
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
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-300 text-sm mb-4 transition-colors no-underline">
            <ArrowLeft size={16} /> Back to Device Selection
          </Link>
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
            <ShieldAlert className="text-blue-400" /> LoPhone Tracker
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

        {[1, 2, 3].map(phase => {
          const phaseTasks = visibleTasks.filter(t => t.phase === phase);

          // In no-SIM mode, Phase 3 has no visible tasks — show a disabled placeholder
          if (phaseTasks.length === 0 && phase === 3 && simMode === 'no-sim') {
            return (
              <section key={phase} className="mb-10 opacity-40">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-300 border-b border-slate-800 pb-2">
                  <Zap size={22} className="text-blue-500" />
                  Phase 3: Tripwire Routines
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
              <h2 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-300 border-b border-slate-800 pb-2">
                {phase === 1 && <Radio size={22} className="text-blue-500" />}
                {phase === 2 && <MapPin size={22} className="text-blue-500" />}
                {phase === 3 && <Zap size={22} className="text-blue-500" />}
                Phase {phase}: {phase === 1 ? 'Ghost Hardening' : phase === 2 ? 'Find Network' : 'Tripwire Routines'}
                {phase === 1 && (
                  <button
                    onClick={() => setShowTutorial('phase1')}
                    className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 hover:text-blue-200 text-xs font-medium transition-all cursor-pointer border border-blue-500/30"
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

        {/* Phase 4: Optional — Collapsible */}
        {(() => {
          const optionalTasks = visibleTasks.filter(t => t.phase === 4);
          if (optionalTasks.length === 0) return null;
          const completedCount = optionalTasks.filter(t => t.completed).length;
          return (
            <section className="mb-10">
              <button
                onClick={() => setShowOptional(!showOptional)}
                className="w-full text-xl font-bold mb-5 flex items-center gap-3 text-blue-300 border-b border-slate-800 pb-2 hover:text-blue-200 transition-colors cursor-pointer bg-transparent text-left"
              >
                {showOptional ? <ChevronDown size={22} className="text-blue-500" /> : <ChevronRight size={22} className="text-blue-500" />}
                <Battery size={22} className="text-blue-500" />
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

export default App;
