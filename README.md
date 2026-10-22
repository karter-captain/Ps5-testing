# Browser Capability Lab

A static, read-only browser capability dashboard for compatibility and diagnostics.

## What it checks
- Basic environment details exposed to the page
- Secure-context and local-storage availability
- Presence of selected Web APIs, including Fetch, Workers, WebAssembly, Web Crypto, Notifications, WebGL, IndexedDB, and timing APIs
- A copyable report for troubleshooting

## What it does not do
- It does not scan for or exploit vulnerabilities.
- It does not run native code or interact with PS5 system services.
- It does not request notification, clipboard, location, or other permissions.
- It does not send the report to a server.

## Interpret results carefully
Feature presence does not prove every operation is usable. A missing API may reflect browser implementation choices, platform restrictions, privacy settings, or policy. User-agent and platform strings may be incomplete or misleading. This report cannot determine whether a PS5 firmware version is vulnerable or whether an exploit is possible.

## Run it
Open the GitHub Pages site, then select **Refresh checks**. **Copy report** attempts to copy results when the browser permits it and otherwise offers a manual copy option.

The site uses plain HTML, CSS, and JavaScript with no build step or third-party dependencies.
