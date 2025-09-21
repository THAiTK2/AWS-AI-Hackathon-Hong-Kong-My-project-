# MHFA Copilot HK

Mental Health First Aid assistant for Hong Kong - A bilingual, privacy-first PWA that helps lay helpers follow ALGEE steps to support someone in mental distress.

## Features

- **Chat Helper**: ALGEE-guided suggestions (Approach, Listen, Give reassurance, Encourage professional help, Encourage self-help)
- **Crisis Detection**: Local keyword detection with immediate 999 and hotline access
- **Resource Navigator**: Hong Kong-specific mental health resources with filtering
- **Self-Check Screeners**: PHQ-2 and GAD-2 screening tools (informational only)
- **Bilingual Support**: Traditional Chinese (Cantonese) and English
- **Privacy-First**: Runs entirely client-side, no data collection
- **Offline PWA**: Works without internet connection

## Quick Start

1. Open `index.html` in a web browser
2. Add PWA icons to the `icons/` directory (see icons/README.md)
3. Serve from a web server for full PWA functionality

## Technical Details

- **Client-only**: HTML/CSS/Vanilla JavaScript, no backend required
- **Responsive**: Mobile-first design with accessibility features
- **PWA**: Service worker caching, manifest, offline support
- **No tracking**: No analytics, no external fonts, no data transmission

## Important Disclaimers

- This app provides Mental Health First Aid guidance only
- Not medical advice or therapy
- In emergencies, always call 999
- Crisis situations require immediate professional intervention

## File Structure

```
project/
├── index.html          # Main app interface
├── app.js             # Application logic and ALGEE guidance
├── resources.json     # Hong Kong mental health resources
├── sw.js              # Service worker for offline functionality
├── manifest.webmanifest # PWA manifest
├── icons/             # PWA icons directory
└── README.md          # This file
```

## Customization

- Update `resources.json` to modify available mental health resources
- Modify ALGEE templates in `app.js` for different guidance approaches
- Adjust crisis keywords for different languages or contexts
- Customize styling in the `<style>` section of `index.html`

## License

This project is designed for mental health support and should be used responsibly with proper training in Mental Health First Aid principles.