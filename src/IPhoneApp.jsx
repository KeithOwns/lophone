import React from 'react';
import TrackerGuideUI from './TrackerGuideUI';

const AppleLogo = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 384 512" fill="currentColor" className={className}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
);

const IPhoneApp = () => {
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
        ],
        phase2: [
            {
                image: '/ios_settings_general.png',
                title: '1/3 · Wi-Fi & Bluetooth',
                description: 'Settings > Wi-Fi: toggle ON. Settings > Bluetooth: toggle ON. Both are essential for Find My network beacon broadcasting to nearby Apple devices.',
            },
            {
                image: '/ios_apple_id.png',
                title: '2/3 · Verify Find My Network',
                description: 'Settings > [Apple ID] > Find My > Find My iPhone. Confirm "Find My network" is ON. This is the crowd-sourced tracking backbone (1 billion+ Apple devices).',
            },
            {
                image: '/ios_apple_id.png',
                title: '3/3 · Share My Location',
                description: 'Settings > [Apple ID] > Find My > Share My Location: ON. Share with a trusted contact so they can also track the device from their own Find My app.',
            },
        ],
        phase3: [
            {
                image: '/ios_settings_general.png',
                title: '1/2 · Charger Disconnect Alert',
                description: 'Open Shortcuts app > Automation > + > "When Charger" disconnects > Send Message to your primary number. Alerts you silently if a thief unplugs the tracker.',
            },
      {
        image: '/ios_settings_general.png',
        title: '2/2 · Leave Location Alert',
        description: 'Shortcuts app > Automation > + > "Leave" > select Home > Send Message ("Vehicle moving"). Auto-geofence alerts you if the vehicle leaves your location.',
      },
    ],
    phase4: [
      {
        image: '/battery_optimization.png',
        title: '1/5 · Background App Refresh',
        description: 'Settings > General > Background App Refresh. Toggle OFF to save significant battery.',
      },
      {
        image: '/battery_optimization.png',
        title: '2/5 · Low Power Mode',
        description: 'Settings > Battery. Toggle Low Power Mode ON.',
      },
      {
        image: '/battery_optimization.png',
        title: '3/5 · Disable AirDrop',
        description: 'Settings > General > AirDrop. Set to Receiving Off.',
      },
      {
        image: '/battery_optimization.png',
        title: '4/5 · Disable Handoff',
        description: 'Settings > General > AirPlay & Handoff. Toggle Handoff OFF.',
      },
      {
        image: '/battery_optimization.png',
        title: '5/5 · Offload Unused Apps',
        description: 'Settings > General > iPhone Storage. Enable Offload Unused Apps to free up space.',
      },
    ]
  };;

    const initialTasks = [
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
    ];

    return (
        <TrackerGuideUI
            title="iPhone 16"
            icon={<AppleLogo size={32} className="text-white" />}
            colorTheme="purple"
            storageKey="lophone-iphone-progress"
            initialTasks={initialTasks}
            tutorials={tutorials}
            csvPrefix="iphone_anti_theft_log"
            showSimToggle={true}
        />
    );
};

export default IPhoneApp;
