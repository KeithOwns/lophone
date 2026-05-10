import React from 'react';
import TrackerGuideUI from './TrackerGuideUI';

const AndroidLogo = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <mask id="android-mask-app">
            <rect width="100" height="100" fill="white" />
            <circle cx="31" cy="62" r="4" fill="black" />
            <circle cx="69" cy="62" r="4" fill="black" />
        </mask>
        <g mask="url(#android-mask-app)" fill="currentColor">
            <path d="M 10 85 A 40 40 0 0 1 90 85 Z" />
            <line x1="28.5" y1="38.5" x2="35" y2="52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <line x1="71.5" y1="38.5" x2="65" y2="52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </g>
    </svg>
);

const AndroidApp = () => {
    const tutorials = {
    phase1: [
      {
        image: '/settings_home.png',
        title: '1/13 · Update Software',
        description: 'Open Settings and scroll to "System update" or "Software update". Tap it to check for OS updates.',
      },
      {
        image: '/software_update.png',
        title: '1/13 · Download & Install',
        description: 'Tap "Download and install". Apply any available updates and restart when prompted.',
      },
      {
        image: '/play_store_updates.png',
        title: '1/13 · Update All Apps',
        description: 'Open Play Store > Profile > Manage apps & device > "Update all".',
      },
      {
        image: '/account_settings.png',
        title: '2/13 · Account Isolation',
        description: 'Sign into a dedicated Google account (not your personal one). Settings > Passwords & accounts > Add account. This isolates the tracker from your real data.',
      },
      {
        image: '/google_security.png',
        title: '3/13 · Account Recovery',
        description: 'Go to the dedicated account\'s Google security settings. Add your personal phone number as a recovery method so you never lose access.',
      },
      {
        image: '/lock_screen_settings.png',
        title: '4/13 · Secure Lock Screen',
        description: 'Settings > Security > Screen lock. Set a 6+ digit PIN. Disable biometrics if possible.',
      },
      {
        image: '/secure_lock_settings.png',
        title: '5/13 · Secure Lock: Device Settings',
        description: 'Settings > Security > Screen lock settings. Set Auto lock to "Immediately" and toggle "Power button instantly locks" ON.',
      },
      {
        image: '/secure_lock_settings.png',
        title: '6/13 · Show Lockdown Option',
        description: 'Same screen. Toggle "Show lockdown option" ON to quickly disable biometrics and Smart Lock if needed.',
      },
      {
        image: '/lost_device_protection.png',
        title: '7-9/13 · Lost Device Protection',
        description: 'Settings > Google > Find My Device. Toggle ON all theft protection features: Theft Detection Lock, Offline Device Lock, and Remote Lock (SIM only).',
      },
      {
        image: '/notifications_settings.png',
        title: '10/13 · Open Notifications',
        description: 'Go to Settings > Notifications. Tap "Notifications on lock screen".',
      },
      {
        image: '/lock_screen_notifs.png',
        title: '10/13 · Hide Notification Content',
        description: 'Select "Hide silent conversations and notifications" or "Don\'t show any notifications" to prevent 2FA codes, emails, and SMS from appearing on the lock screen.',
      },
      {
        image: '/sounds_vibration.png',
        title: '11/13 · Mute Sounds & Vibration',
        description: 'Settings > Sound & vibration. Turn all volumes to zero and turn vibration/haptics OFF. The tracker must be silent.',
      },
      {
        image: '/do_not_disturb.png',
        title: '12/13 · Do Not Disturb',
        description: 'Settings > Sound & vibration > Do Not Disturb. Toggle ON for a secondary layer of noise suppression.',
      },
      {
        image: '/display_settings.png',
        title: '13/13 · Dark Mode & Zero Brightness',
        description: 'Settings > Display. Enable Dark theme and drag the brightness slider all the way to 0%. Maximizes battery life and stealth.',
      },
    ],
    phase2: [
      {
        image: '/wifi_bluetooth.png',
        title: '1/3 · Enable Bluetooth & Wi-Fi',
        description: 'Settings > Network & internet / Connected devices. Ensure both Bluetooth and Wi-Fi are toggled ON. These are essential for offline Find My beacon broadcasting.',
      },
      {
        image: '/google_find_my.png',
        title: '2/3 · Google Find My Device',
        description: 'Settings > Google > Find My Device. Ensure it is toggled ON. This lets nearby Android devices relay your tracker\'s encrypted location.',
      },
      {
        image: '/find_offline_network.png',
        title: '3/3 · Find Offline Network',
        description: 'Settings > Google > Find My Device > Find your offline devices > "With network in all areas". Maximizes pickup by any passing Android phone.',
      },
    ],
    phase3: [
      {
        image: '/macrodroid_unplug.png',
        title: '1/2 · Unplug Alert (MacroDroid)',
        description: 'Open MacroDroid > Add Macro. Triggers: Battery/Power > Power Connected/Disconnected > Power Disconnected. Actions: Messaging > Send SMS. Alerts you if unplugged.',
      },
      {
        image: '/macrodroid_geofence.png',
        title: '2/2 · Movement Trigger (MacroDroid)',
        description: 'Open MacroDroid > Add Macro. Triggers: Location > Geofence Trigger > Exited Area (Home). Actions: Messaging > Send SMS. Creates an auto-geofence for the vehicle.',
      },
    ],
    phase4: [
      {
        image: '/apps_list.png',
        title: '1/4 · Uninstall Bloatware',
        description: 'Settings > Apps. Uninstall or disable all non-essential apps to stop background battery drain.',
      },
      {
        image: '/auto_sync.png',
        title: '2/4 · Disable Auto Sync Data',
        description: 'Settings > Passwords & accounts. Toggle Automatically sync app data OFF.',
      },
      {
        image: '/nfc_settings.png',
        title: '3/4 · Disable NFC',
        description: 'Settings > Connected devices > Connection preferences > NFC. Toggle OFF.',
      },
      {
        image: '/nearby_share.png',
        title: '4/4 · Disable Nearby Share',
        description: 'Settings > Connected devices > Connection preferences > Nearby Share. Toggle OFF.',
      },
    ],
    phase5: [
      {
        image: '/security_privacy.png',
        title: '1/7 · Navigate to Security',
        description: 'Go to Settings > Security and privacy. This is the hub for the next several steps.',
      },
      {
        image: '/auto_blocker.png',
        title: '2/7 · Auto Blocker',
        description: 'Tap "Auto Blocker". Turn ON Maximum Restrictions and App protection. Blocks malware via USB.',
      },
      {
        image: '/secure_lock_settings.png',
        title: '3/7 · Network Security Lock',
        description: 'Settings > Lock screen > Secure lock settings. Set Auto factory reset: OFF, Lock network and security: ON.',
      },
      {
        image: '/samsung_offline_finding.png',
        title: '4/7 · Samsung Offline Finding',
        description: 'Open Samsung Find app > Settings > Offline Finding: Enable. Verify your phone number.',
      },
      {
        image: '/samsung_routine_unplug.png',
        title: '5/7 · Unplug Alert Routine',
        description: 'Modes & Routines > Routines > +. If: Battery > Charging Status > Not Charging. Then: Messages > Send message to your primary number.',
      },
      {
        image: '/samsung_routine_geofence.png',
        title: '6/7 · Movement Trigger Routine',
        description: 'Modes & Routines > Routines > +. If: Place > Leaving [Home]. Then: Power Saving ON + Send message ("Moving").',
      },
      {
        image: '/samsung_easy_mode.png',
        title: '7/7 · Enable Easy Mode',
        description: 'Settings > Display > Easy Mode. Toggle ON for a cleaner interface.',
      },
    ]
  };

    const initialTasks = [
    { id: 0, phase: 1, title: 'Update Software', desc: 'Settings > System update. Ensure OS and Play Store apps are fully updated before proceeding. Why: Patches known security exploits.', completed: false },
    { id: 1, phase: 1, title: 'Account Isolation', desc: 'Signed in with dedicated account (e.g., my.hidden.tracker@example.com). Why: Prevents a thief from accessing your primary personal data if the lock screen is bypassed.', completed: false },
    { id: 26, phase: 1, title: 'Account Recovery', desc: 'Set your personal cell phone number as the account recovery method for the dedicated account. Why: Ensures you never lose access to the tracker\'s tracking account.', completed: false },
    { id: 2, phase: 1, title: 'Secure Lock Screen', desc: '6+ digit PIN set. Biometrics disabled. Why: Stops thieves from guessing easy patterns or using your biometric data against you.', completed: false },
    { id: 3, phase: 1, title: 'Secure lock settings: Device Settings', desc: 'Settings > Security > Screen lock settings. Power button instantly locks: ON. Why: Ensures the phone is instantly secured the moment the screen goes dark.', completed: false },
    { id: 4, phase: 1, title: 'Secure lock settings: Lockdown Option', desc: 'Settings > Security > Screen lock settings. Show lockdown option: ON. Why: Provides a quick way to disable biometrics completely if needed.', completed: false },
    { id: 6, phase: 1, title: 'Lost Device: Theft Detection Lock', desc: 'Settings > Google > Find My Device. Toggle "Theft Detection Lock" ON. Why: Automatically locks the screen if the phone detects sudden motion indicative of a snatch-and-run.', completed: false },
    { id: 7, phase: 1, title: 'Lost Device: Offline Device Lock', desc: 'Settings > Google > Find My Device. Toggle "Offline Device Lock" ON. Why: Secures the device even if the thief manages to disconnect it from the cellular or Wi-Fi network.', completed: false },
    { id: 18, phase: 1, title: 'Lost Device: Remote Lock', desc: 'Settings > Google > Find My Device. Toggle "Remote Lock" ON. Why: Allows you to lock the device remotely via another phone.', completed: false, requiresSim: true },
    { id: 9, phase: 1, title: 'Hide Notifications', desc: 'Settings > Notifications > Notifications on lock screen. Set to "Don\'t show any notifications". Why: Prevents a thief from seeing 2FA codes, emails, or SMS alerts from the lock screen.', completed: false },
    { id: 25, phase: 1, title: 'Mute Sounds & Disable Vibration', desc: 'Settings > Sound & vibration. Turn all volumes to zero. Vibrate: OFF. Why: Prevents discovering the hidden tracker via unintended sound or buzzing notifications.', completed: false },
    { id: 20, phase: 1, title: 'Silence & Do Not Disturb', desc: 'Settings > Sound & vibration > Do Not Disturb. Toggle ON. Why: A secondary layer of noise suppression to reduce the chance of a thief hearing the tracker.', completed: false },
    { id: 10, phase: 1, title: 'Dark Mode & Zero Brightness', desc: 'Display set to Dark theme. Brightness at 0%. Why: Maximizes battery life and makes the screen difficult to see if it accidentally turns on in the dark.', completed: false },
    
    { id: 21, phase: 2, title: 'Bluetooth & Wi-Fi Tracking', desc: 'Settings > Network & internet / Connected devices. Ensure both Bluetooth and Wi-Fi are toggled ON. Why: Essential for offline tracking. Without Bluetooth, the offline beacon will not broadcast to nearby phones.', completed: false },
    { id: 12, phase: 2, title: 'Google Find My Device (System)', desc: 'Settings > Google > Find My Device. Ensure it is toggled ON. Why: Adds the Android/Google tracking network to broadcast location.', completed: false },
    { id: 19, phase: 2, title: 'Google Find My Device Network', desc: 'Settings > Google > Find My Device > Find your offline devices. Set to "With network in all areas". Why: Maximizes the chances of the device being picked up by any passing Android phone, even in low-traffic areas.', completed: false },
    
    { id: 14, phase: 3, title: 'Unplug Alert (MacroDroid)', desc: 'MacroDroid app > Add Macro. Trigger: Power Disconnected. Action: Send SMS to primary number. Why: Silently texts you instantly if a thief unplugs the hidden tracker.', completed: false, requiresSim: true },
    { id: 15, phase: 3, title: 'Movement Trigger (MacroDroid)', desc: 'MacroDroid app > Add Macro. Trigger: Geofence Exited. Action: Send SMS ("Moving"). Why: Creates an auto-geofence to alert you if the vehicle moves while you are away.', completed: false, requiresSim: true },

    { id: 22, phase: 4, title: 'Uninstall/Disable Bloatware', desc: 'Settings > Apps. Uninstall or disable all non-essential apps (e.g., carrier apps, pre-installed games). Why: Stops background apps from draining the battery unnecessarily.', completed: false },
    { id: 23, phase: 4, title: 'Disable Auto Sync Data', desc: 'Settings > Passwords & accounts > Automatically sync app data. Toggle OFF. Why: Prevents the phone from constantly waking up to check emails, saving massive background battery.', completed: false },
    { id: 27, phase: 4, title: 'Disable NFC', desc: 'Settings > Connected devices > Connection preferences > NFC. Toggle OFF. Why: Unnecessary battery drain and prevents accidental tracking/triggering from nearby NFC readers.', completed: false },
    { id: 28, phase: 4, title: 'Disable Nearby Share/Quick Share', desc: 'Settings > Connected devices > Connection preferences > Nearby Share. Toggle OFF. Why: Saves battery by stopping the phone from constantly searching for other devices.', completed: false },

    // Phase 5: Samsung Specifics
    { id: 30, phase: 5, title: 'Auto Blocker: Max Restrictions', desc: 'Settings > Security and privacy > Auto Blocker. Maximum Restrictions: ON, App protection: ON. Why: Blocks malware installations via USB.', completed: false },
    { id: 31, phase: 5, title: 'Secure lock settings: Network Security', desc: 'Settings > Lock screen > Secure lock settings. Auto factory reset: OFF, Lock network and security: ON. Why: Blocks thieves from turning off Wi-Fi/Bluetooth from the lock screen.', completed: false },
    { id: 32, phase: 5, title: 'Samsung Offline Finding', desc: 'Samsung Find settings > Offline Finding: Enabled. Phone number verification: Enabled. Why: Leverages the massive Galaxy finding network.', completed: false },
    { id: 33, phase: 5, title: 'Unplug Alert (Modes & Routines)', desc: 'Modes & Routines > Routines tab > +. If: Battery Not Charging. Then: Send message to primary. Why: Silently texts you instantly if a thief unplugs the hidden tracker.', completed: false, requiresSim: true },
    { id: 34, phase: 5, title: 'Movement Trigger (Modes & Routines)', desc: 'Modes & Routines > Routines tab > +. If: Leaving [Home]. Then: Send message ("Moving"). Why: Creates an auto-geofence to alert you if the vehicle moves while you are away.', completed: false, requiresSim: true },
    { id: 35, phase: 5, title: 'Enable Easy Mode', desc: 'Settings > Display > Easy Mode. Toggle ON. Why: Provides a cleaner, magnified home screen layout.', completed: false },
    { id: 36, phase: 5, title: 'Disable Auto System Updates', desc: 'Settings > Connections > More connection settings > Auto update system configurations. Toggle OFF. Why: Prevents Samsung from pushing silent background config changes.', completed: false }
  ];

    return (
        <TrackerGuideUI
            title="Android Devices"
            icon={<AndroidLogo size={32} className="text-white" />}
            colorTheme="emerald"
            storageKey="lophone-android-progress"
            initialTasks={initialTasks}
            tutorials={tutorials}
            csvPrefix="android_anti_theft_log"
            showSimToggle={true}
        />
    );
};

export default AndroidApp;
