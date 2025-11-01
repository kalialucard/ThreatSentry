# ThreatSentry AI

Welcome to ThreatSentry AI, a powerful, AI-enhanced security log analysis and threat intelligence platform. Built with Next.js and Google's Genkit, this tool is designed to help you ingest, search, and analyze security data with speed and intelligence.

## Core Features

- **AI-Powered Dashboard**: Get an at-a-glance overview of log volumes, active incidents, and system health metrics.
- **Log Ingestion & Analysis**: Paste, upload, or connect various log formats. Use AI to automatically parse and analyze raw logs for anomalies.
- **Interactive Incident Management**: View a list of security incidents. Get AI-generated summaries and perform instant threat assessments on any IP address found in the details.
- **Advanced Log Search**: A powerful search interface with structured filters for time range, severity, host, and more, allowing you to pinpoint specific events quickly.
- **Real-time Threat Intelligence**: The Threat Intel Center uses AI to assess the risk of any IP address, providing a threat score, a detailed summary, and a recommended action.
- **AI-Assisted Settings**: Chat with an AI assistant on the Settings page to get suggestions for tuning your anomaly detection rules based on sample log data.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Generative AI**: [Genkit (Google)](https://firebase.google.com/docs/genkit)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## Getting Started

### Requirements

To run this application and use all its features, you will need the following:

1.  **Node.js**: Version 20.x or higher.
2.  **npm** (or a compatible package manager like `yarn` or `pnpm`).
3.  **Google AI API Key**: Required for all AI-powered features.

### 1. Set up your Google AI API Key

The AI features in this application are powered by Google's Gemini models through Genkit.

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free API key.
- Create a new file named `.env` in the root directory of this project.
- Add your API key to the `.env` file. It should look like this:

```
GEMINI_API_KEY=YOUR_API_KEY_HERE
```
_Note: If you don't provide a key, AI features like incident summarization will use mock data so you can still explore the UI._

### 2. Install Dependencies

Open your terminal in the project's root directory and run the following command to install all the necessary packages:

```bash
npm install
```

### 3. Run the Development Server

Once the dependencies are installed, you can start the Next.js development server:

```bash
npm run dev
```

The application will now be running and accessible at [http://localhost:9002](http://localhost:9002) (or the port specified in your environment).

---

## How to Use ThreatSentry AI: From Beginner to Pro

### For the Beginner: Your First 5 Minutes

If you're new to security tools, start here to get comfortable.

1.  **View the Dashboard**:
    - The first page you see is the **Dashboard**. It gives you a high-level overview. Don't worry about the numbers yet; just get a feel for the visuals.

2.  **Assess a Harmless IP**:
    - Navigate to the **Threat Intel** page using the sidebar.
    - In the input box, type `8.8.8.8` (this is Google's public DNS server) and click **Analyze IP**.
    - The AI will assess it and give it a low threat score (0-3) with a recommendation of "allow." This shows you how the tool analyzes safe IPs.

3.  **Analyze Sample Logs**:
    - Go to the **Ingest Logs** page.
    - On the "Paste Logs" tab, you'll see some example log text in the text area.
    - Click the **Parse & Analyze** button. The AI will read the logs and give you a summary of what it found, including the number of anomalies.

4.  **Explore an Incident**:
    - Go to the **Incidents** page. This page lists pre-detected security events.
    - Click the **View Details** button on any incident.
    - In the pop-up, click the **Summarize with AI** button. The AI will generate a human-readable summary of the technical incident data.

### For the Intermediate User: The Analyst Workflow

Now that you're comfortable, let's use the tool to investigate a potential threat.

1.  **Start with the Incident**:
    - On the **Incidents** page, find "INC-001: Brute-force attack..." and click **View Details**.
    - Notice the IP address `198.51.100.12` is highlighted in the details. **Click on it**.
    - A popover appears with the AI's threat assessment. You'll see a high threat score and a recommendation to "block." This confirms the IP is malicious without you having to leave the incident view.

2.  **Pivot to the Search Page**:
    - Now that you have a malicious IP, let's find all activity related to it.
    - Go to the **Search** page. In the main search bar, you could type `src_ip:"198.51.100.12"`, but let's use the filters.
    - Click the **Severity** button and check the `error` and `critical` boxes.
    - You will see the log table update in real-time to show only logs matching your filter. This is how you can zero in on the most critical events.
    - You can combine filters. Try adding a **Time Range** to narrow your search even further.

### For the Pro: Leveraging Advanced Capabilities

A professional needs speed, power, and customization.

1.  **Structured KQL-like Queries**:
    - The search bar on the **Search** page is your most powerful tool. It's designed for Kibana-style (KQL) queries.
    - **Example**: Find all failed root login attempts from outside your corporate network.
      - `severity:(error OR critical) AND user:root AND action:login NOT src_ip:10.0.0.0/8`
    - This level of querying allows for precise and rapid threat hunting.

2.  **Tune the AI Engine**:
    - Go to the **Settings** page. The "Anomaly Detection Engine" card contains a chat interface.
    - This isn't just a chatbot; it's an AI reasoner for your detection rules. In a real-world scenario, you could feed it a sample of new, tricky logs.
    - **Ask it a complex question**, like: `"Based on the provided logs, suggest a rule to detect a slow-and-low brute force attack that occurs over 30 minutes."`
    - The AI will provide you with a detailed suggestion and the reasoning behind it, helping you improve your automated detection capabilities.

3.  **Command-Line Interface (CLI)**:
    - For automation and scripting, you can run the IP threat assessment directly from your terminal. This is useful for integrating ThreatSentry AI with other scripts or tools.
    - **Usage**:
      ```bash
      npm run run:threat-intel -- <IP_ADDRESS>
      ```
    - **Example**:
      ```bash
      npm run run:threat-intel -- 198.51.100.12
      ```
    - This will output the full JSON assessment, which can be piped into other tools like `jq` for processing.
      ```bash
      npm run run:threat-intel -- 198.51.100.12 | jq .recommendedAction
      "block"
      ```

By mastering these features, you can use ThreatSentry AI not just as a log viewer, but as an intelligent partner in your security operations workflow.
# ThreatSentry
# ThreatSentry
