# **App Name**: Log Insights Sentinel

## Core Features:

- Log Ingestion: Ingest logs from various sources (syslog, EVTX, JSON) via paste, file upload, or direct feed. Support for RFC 5424/RFC-3164 (Syslog).
- Log Parsing and Normalization: Parse raw logs into a canonical schema with fields like timestamp, host, facility, severity, message, event_id, provider, user, src_ip, dst_ip, etc. Provides toCanonical() and toHuman() helpers.
- Real-time and Batch Ingest: Process small inputs client-side; handle large uploads and heavy processing via authenticated Cloud Functions (parseLog, analyzeLog) for parsing, enrichment, and storage.
- Anomaly Detection Engine: Detect anomalies using rule-based checks (failed login thresholds, blacklisted IPs, known suspicious event IDs) and statistical baselining (rate baselines, z-score deviations). Also employs an Isolation Forest model for unsupervised anomaly detection. A reasoning tool to enable or disable parts of this ruleset.
- Alerting & Notifications: Generate alerts with severity levels and send notifications via email, Slack/webhook, Firebase Cloud Messaging, and webhooks. Support alert deduping and suppression.
- Dashboards & Visualization: Display time series charts, heatmaps, top N failed logins, event-type distribution, and correlation graphs. Offer drilldowns to raw log lines and per-event explanations.
- Search & Saved Queries: Enable full-text and structured search with filters (IP, user, event_id, host, time range). Allow users to save and share queries within projects.
- LLM Summarization (Optional): Optionally provide LLM-powered summaries of incidents for better understanding. Cloud function 'summarizeIncidents' relies on user-provided API keys and understanding of associated privacy trade-offs.
- Client-Side Encryption (Optional): Offer optional client-side encryption (Web Crypto PBKDF2 + AES-GCM) for sensitive logs before upload. Only ciphertext stored in Firestore if enabled. Never store master passphrases server-side.
- GeoIP Enrichment: Enrich ingested logs with GeoIP information to provide location awareness during analysis.
- User-Agent Enrichment: Enrich ingested logs with User-Agent information to enrich the analytical tool capabilities.
- Vendor format ingestion (optional): Support for more obscure/less commonly used formats, marked as optional. May require more operator maintenence.
- Firestore database: Database to manage settings for anomaly detection engine.

## Style Guidelines:

- Primary color: Deep navy blue (#1A237E) for a professional and secure feel.
- Background color: Light gray (#F5F5F5) for a clean and modern look.
- Accent color: Vivid cyan (#00BCD4) to highlight alerts and key data points.
- Body font: 'Inter' (sans-serif) for a modern, readable text.
- Headline font: 'Space Grotesk' (sans-serif) to give titles and headings a bit of techy/modern look and feel. 'Inter' used in the body.
- Code font: 'Source Code Pro' (monospace) for displaying log snippets and code.
- Use clear, minimalist icons to represent log sources, severity levels, and actions.
- A clean, dashboard-centric layout that emphasizes data visualization and key metrics.
- Subtle animations to indicate loading states and user interactions (e.g., when parsing logs or generating alerts).