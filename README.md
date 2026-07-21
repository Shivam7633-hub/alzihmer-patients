# CareSync - Alzheimer's Patient Medicine Reminder

A Progressive Web App (PWA) designed specifically for Alzheimer's patients to receive medicine reminders with multi-layer alerts, caregiver notifications, and an easy-to-use interface optimized for accessibility and clarity.

## Features

✅ **Large, Clear Display** - Extra-large clock and medicine names for easy readability  
✅ **Audio Alerts** - Loud, repeating beeps (every 5 seconds) until acknowledged  
✅ **Push Notifications** - Native device notifications for on-device reminders  
✅ **Service Worker Caching** - Works offline after first visit  
✅ **Persistent Storage** - Medicine schedule saved in browser storage  
✅ **Caregiver Alerts** - Optional webhook integration for missed dose notifications  
✅ **High Contrast UI** - Accessible design with readable fonts and colors  
✅ **Responsive Design** - Works on phones, tablets, and computers  
✅ **Installable App** - Add to home screen on mobile devices  

## Quick Start

### 1. **Deploy the App**
Upload these files to any web server or use GitHub Pages:
- `index.html`
- `sw.js`
- `manifest.json`

### 2. **Enable Notifications**
1. Open the app in your browser
2. Click "Enable Device Alerts"
3. Grant permission when prompted

### 3. **Add to Home Screen (Mobile)**
- **iOS:** Open in Safari → Share → Add to Home Screen
- **Android:** Open in Chrome → Menu (⋮) → Install app

### 4. **(Optional) Setup Caregiver Alerts**
To receive alerts when doses are missed:

```javascript
// In browser console:
localStorage.setItem('webhook_url', 'YOUR_WEBHOOK_URL_HERE');
```

Replace `YOUR_WEBHOOK_URL_HERE` with a webhook URL from:
- **Slack**: [Create a webhook](https://api.slack.com/messaging/webhooks)
- **Twilio**: [Setup SMS alerts](https://www.twilio.com/)
- **Discord**: [Create a Discord webhook](https://discord.com/developers/docs/resources/webhook)
- **Make.com / Zapier**: [Create integration](https://make.com/)

## Configuration

### Change Medicine Schedule
Edit the schedule directly in the browser:

```javascript
// In browser console:
const newSchedule = [
  { id: 1, name: "Aspirin", time: "08:00", taken: false, alerted: false },
  { id: 2, name: "Blood Pressure Med", time: "13:00", taken: false, alerted: false },
  { id: 3, name: "Evening Medication", time: "20:00", taken: false, alerted: false }
];
localStorage.setItem('caresync_data', JSON.stringify(newSchedule));
location.reload();
```

### Customize Alert Settings
Edit `CONFIG` object in `index.html`:
```javascript
const CONFIG = {
  WEBHOOK_URL: localStorage.getItem('webhook_url') || null,
  CHECK_INTERVAL: 1000,           // Time check frequency (ms)
  ALERT_SOUND_INTERVAL: 5000,     // Beep interval (ms)
  CAREGIVER_TIMEOUT: 30 * 60 * 1000  // Alert after 30 minutes of inaction
};
```

## Troubleshooting

### Notifications Not Working
1. Check browser permission: Settings → Notifications → This site should be "Allow"
2. Ensure you clicked "Enable Device Alerts" button
3. Try opening the app in a fresh browser window
4. On mobile: Ensure app notifications are not disabled in system settings

### Audio Not Playing
- Some browsers require user interaction before playing audio
- Check if device volume is muted
- Verify browser hasn't blocked audio playback

### App Not Loading
- Clear browser cache: Settings → Privacy/Storage → Clear Data
- Force refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Check if Service Worker is enabled in browser DevTools

### Medicine Reminders Not Triggering
1. Verify current device time matches the scheduled time
2. Ensure app tab remains open or notifications are enabled
3. Check browser console (F12) for error messages
4. Try resetting the schedule: Click "Reset Schedule for New Day"

### Caregiver Alerts Not Sending
1. Verify webhook URL is correctly set in localStorage
2. Check webhook service status (Slack, Discord, etc.)
3. Review webhook URL format matches your service requirements
4. Check browser console for error messages

## Testing

### Test Reminders Without Waiting
```javascript
// In browser console, test a medicine alert:
const testMed = schedule[0];
const now = new Date();
testMed.time = now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
testMed.alerted = false;
saveSchedule();
```

### Simulate Missed Dose
```javascript
// Manually trigger caregiver alert:
triggerCaregiverAlert("Test Medicine");
```

## Browser Support

| Browser | Mobile | Desktop |
|---------|--------|---------|
| Chrome  | ✅     | ✅      |
| Safari  | ✅     | ✅      |
| Firefox | ✅     | ✅      |
| Edge    | ✅     | ✅      |

## File Structure

```
.
├── index.html        # Main app interface and logic
├── sw.js            # Service Worker for offline support
├── manifest.json    # PWA manifest for installation
└── README.md        # This file
```

## Security & Privacy

- ✅ All data stored locally on device
- ✅ No data sent to servers except optional webhook alerts
- ✅ HTTPS recommended for production deployment
- ✅ No tracking or analytics
- ✅ No third-party scripts

## Accessibility

- High contrast colors (WCAG AA compliant)
- Large, readable fonts (minimum 1.2rem)
- Semantic HTML with ARIA labels
- Keyboard navigable
- Respects prefers-reduced-motion setting

## Support for Caregivers

### Setting Up Admin Access
Caregivers can monitor from a different device by accessing the same deployment URL and using the reset functionality.

### Best Practices
1. Set reminders 5-10 minutes before actual medicine time
2. Keep device near patient during alert times
3. Ensure device volume is not muted
4. Regularly check device is connected to internet
5. Keep browser updated to latest version

## Development

### Local Testing
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Then open: http://localhost:8000
```

### Service Worker Updates
When deploying updates:
1. Update cache version: `CACHE_NAME = 'caresync-v#'`
2. Clear browser cache or use "Hard Refresh" (Ctrl+Shift+R)
3. Service Worker will automatically update on next visit

## Credits

**Developed for**: Alzheimer's Patient Care  
**Original Creator**: Vedant Sharma  

## License

MIT License - Feel free to use and modify for personal or healthcare use.

## Contributing

Found a bug or have a feature request? Please create an issue or submit a pull request.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console (F12) for error messages
3. Test on a different browser to isolate issues
4. Clear cache and try again

---

**Note**: This app does not replace professional medical advice. Always consult with healthcare providers regarding medication schedules.