# 🛡️ Novus: Secure Clipboard Detox

**Novus** is a privacy-focused Chrome extension built with React and Plasmo. It acts as a "surgical scrub" for your clipboard, automatically detecting and redacting sensitive AWS credentials before they can be pasted into LLMs like ChatGPT.

## 🚀 Features
* **Context-Aware Redaction**: Uses regex to identify AWS Access Keys and Secret Keys, but only triggers when security keywords are nearby to prevent false positives.
* **Real-Time Protection**: Intercepts the paste event to scrub data locally on your machine—sensitive keys never reach the cloud.
* **Activity History**: A sleek popup UI that tracks the last 5 "detox" events, showing you exactly what was blocked and where.
* **Toggle Control**: Easily enable or disable protection with a persistent global switch.

## 🛠️ Tech Stack
* **Framework**: [Plasmo](https://www.plasmo.com/) (Browser Extension Framework)
* **Library**: React + TypeScript
* **Styling**: Tailwind CSS
* **Storage**: Plasmo Storage API for cross-context state management

## 📦 Installation (Development Mode)
1. Clone this repository.
2. Run `pnpm install` to install dependencies.
3. Run `pnpm dev` to start the development server.
4. Open Chrome and go to `chrome://extensions`.
5. Enable **Developer Mode** and click **Load Unpacked**.
6. Select the `build/chrome-mv3-dev` folder.

## 🔒 Privacy
Novus does not collect, store, or transmit any user data. All redaction happens locally within the browser context.