// Loaded with defer from index.html.
// This timestamp is a page-load baseline; it does not prove anything about
// script execution order after the button is clicked.
window.browserTimingLab = {
  deferredScriptAt: performance.now()
};
console.info(
  `[Browser Timing Lab] Deferred script ran at ${window.browserTimingLab.deferredScriptAt.toFixed(1)} ms`
);
