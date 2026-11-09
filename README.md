# ThreatSentry AI 🛡️

> AI-enhanced security log analysis and threat intelligence platform built with Next.js and Google Genkit.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## What It Does

ThreatSentry AI ingests raw security logs, parses them with AI, surfaces anomalies as incidents, and lets you pivot instantly from an IP address in a log to a full threat assessment — all in one unified interface.

## Features

| Feature | Description |
|---|---|
| **AI Log Parser** | Paste or upload any log format; Genkit AI extracts structured events automatically |
| **Incident Dashboard** | Live overview of log volumes, active incidents, and system health |
| **Threat Intel Lookup** | Enter any IP → get threat score, risk summary, and recommended action |
| **Advanced Search** | Filter by time range, severity, host, event type with sub-second results |
| **AI Settings Advisor** | Chat with an AI assistant to tune your anomaly detection rules |

## Screenshot

<!-- TODO: add a dashboard screenshot here -->
![ThreatSentry Dashboard](docs/screenshot.png)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **AI:** [Genkit (Google)](https://firebase.google.com/docs/genkit)
- **UI:** [ShadCN/UI](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Language:** TypeScript

## Installation

**Prerequisites:** Node.js 20+, npm.

```bash
git clone https://github.com/kalialucard/ThreatSentry.git
cd ThreatSentry
npm install
```

Set up your Genkit / Google AI API key:

```bash
# Add to .env.local
echo "GOOGLE_API_KEY=your_key_here" >> .env.local
```

## Usage

```bash
# Start the dev server
npm run dev
# → http://localhost:9002

# Start the Genkit AI dev server (in a separate terminal)
npm run genkit:dev

# Production build
npm run build && npm start
```

## Project Structure

```
ThreatSentry/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # ShadCN UI components
│   ├── ai/             # Genkit AI flows
│   └── lib/            # Shared utilities
├── docs/               # Screenshots and docs
└── package.json
```

## Contributing

PRs welcome. Open an issue first for large changes.

## License

[MIT](LICENSE) © kalialucard
