# Quick Clear Extension (Edge)

A small Microsoft Edge extension to clear data for the **current website** and reload the tab.

## What it does

- Clears site data for the active page origin.
- Reloads the current tab automatically.
- Shows a small badge for quick feedback (`OK` / `ERR`).

## Install locally in Edge

1. Open `edge://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.

## How to use

1. Open the website you want to reset.
2. Click the extension icon.
3. The tab reloads after clearing data.

## Project files

- `manifest.json` — extension configuration.
- `background.js` — click handler and data-clearing logic.
