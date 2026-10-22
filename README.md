# Browser Timing Lab

A small, local browser experiment for observing how a brief main-thread pause affects responsiveness and timestamps.

## Files

- `index.html` — page structure and deferred script loading
- `style.css` — responsive styling
- `main.js` — records events and runs a short, user-selected main-thread pause
- `after-test.js` — records when a deferred script executes

## Run it

1. Download or extract this folder.
2. Open `index.html` in a modern browser.
3. Choose 100, 300, or 500 ms and select **Run timing test**.
4. Compare the requested duration with the measured duration in the event log.

For best consistency, serve the folder from a simple local static server. No dependencies or build step are required.

## Safety and interpretation

This is a controlled demonstration on its own page. It does not target a console, exploit a browser, or bypass platform security. The busy loop intentionally blocks the main thread briefly, so keep durations short.

The `after-test.js` script is loaded with `defer`, which means it normally executes after HTML parsing and before `DOMContentLoaded`. Its timestamp is a page-load baseline, not evidence that it ran after a button-triggered pause. A main-thread pause is also different from pausing network requests.
