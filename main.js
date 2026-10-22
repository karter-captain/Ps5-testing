(() => {
  const $ = (selector) => document.querySelector(selector);
  const featureList = $("#features");
  const environment = $("#environment");
  const status = $("#status");

  const checks = [
    ["Fetch API", () => typeof window.fetch === "function", "Web request API presence; no request is sent."],
    ["Web Workers", () => typeof window.Worker === "function", "Worker API presence; no worker is started."],
    ["Service Workers", () => "serviceWorker" in navigator, "API presence only; registration is not attempted."],
    ["WebAssembly", () => typeof window.WebAssembly === "object", "WebAssembly API presence; no module is executed."],
    ["Web Crypto", () => !!(window.crypto && window.crypto.subtle), "Cryptographic API presence; no keys or secrets are accessed."],
    ["Notifications API", () => "Notification" in window, "API presence only; no permission is requested."],
    ["Gamepad API", () => "getGamepads" in navigator, "Gamepad API presence; no controller state is read."],
    ["WebGL", () => { const c = document.createElement("canvas"); try { return !!(c.getContext("webgl") || c.getContext("experimental-webgl")); } catch (_) { return false; } }, "Checks WebGL context creation only."],
    ["WebGL 2", () => { const c = document.createElement("canvas"); try { return !!c.getContext("webgl2"); } catch (_) { return false; } }, "Checks WebGL 2 context creation only."],
    ["IndexedDB", () => "indexedDB" in window, "Database API presence; no database is created."],
    ["BroadcastChannel", () => typeof window.BroadcastChannel === "function", "Messaging API presence; no channel is opened."],
    ["ResizeObserver", () => typeof window.ResizeObserver === "function", "Layout observation API presence."],
    ["Performance API", () => !!(window.performance && typeof performance.now === "function"), "High-resolution timing API presence."],
    ["User Activation API", () => "userActivation" in navigator, "Reports whether interaction-state API is exposed."],
    ["Clipboard API", () => !!(navigator.clipboard && navigator.clipboard.writeText), "Clipboard API presence; clipboard access is not attempted."],
    ["Fullscreen API", () => typeof document.documentElement.requestFullscreen === "function", "Fullscreen method presence; fullscreen is not requested."]
  ];

  function addDetail(label, value) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    environment.append(dt, dd);
  }

  function runChecks() {
    featureList.replaceChildren();
    environment.replaceChildren();
    const secure = Boolean(window.isSecureContext);
    $("#secure-state").textContent = secure ? "Yes" : "No";

    let storage = "Unavailable";
    try {
      const key = "__capability_lab_test__";
      localStorage.setItem(key, "1");
      localStorage.removeItem(key);
      storage = "Available";
    } catch (_) {}
    $("#storage-state").textContent = storage;

    addDetail("User agent", navigator.userAgent || "Not exposed");
    addDetail("Platform string", navigator.platform || "Not exposed");
    addDetail("Language", navigator.language || "Not exposed");
    addDetail("Online hint", typeof navigator.onLine === "boolean" ? String(navigator.onLine) : "Not exposed");
    addDetail("Secure context", secure ? "Yes (browser-reported)" : "No (browser-reported)");
    addDetail("Cookies enabled", typeof navigator.cookieEnabled === "boolean" ? String(navigator.cookieEnabled) : "Not exposed");
    addDetail("Screen size", (screen.width || "?") + " × " + (screen.height || "?"));
    addDetail("Viewport", window.innerWidth + " × " + window.innerHeight);
    addDetail("JavaScript time", new Date().toISOString());

    let available = 0;
    for (const [name, test, description] of checks) {
      let supported = false;
      try { supported = Boolean(test()); } catch (_) {}
      if (supported) available++;
      const li = document.createElement("li");
      li.className = "feature";
      const top = document.createElement("div");
      top.className = "feature-top";
      const title = document.createElement("span");
      title.className = "feature-name";
      title.textContent = name;
      const state = document.createElement("span");
      state.className = "feature-state";
      state.textContent = supported ? "AVAILABLE" : "NOT DETECTED";
      const detail = document.createElement("p");
      detail.textContent = description;
      top.append(title, state);
      li.append(top, detail);
      featureList.append(li);
    }
    $("#check-count").textContent = available + " / " + checks.length;
    status.textContent = "Checks complete. These are feature-presence results, not vulnerability findings.";
  }

  function buildReport() {
    const lines = [
      "Browser Capability Lab report",
      "Generated: " + new Date().toISOString(),
      "User agent: " + (navigator.userAgent || "Not exposed"),
      "Platform string: " + (navigator.platform || "Not exposed"),
      "Secure context: " + Boolean(window.isSecureContext),
      "Feature checks:"
    ];
    for (const item of featureList.children) {
      const name = item.querySelector(".feature-name")?.textContent || "Feature";
      const state = item.querySelector(".feature-state")?.textContent || "Unknown";
      lines.push("- " + name + ": " + state);
    }
    lines.push("", "This report checks browser feature availability only. It does not test for vulnerabilities or prove exploitability.");
    return lines.join("\n");
  }

  $("#run-checks").addEventListener("click", runChecks);
  $("#copy-report").addEventListener("click", async () => {
    const report = buildReport();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(report);
        status.textContent = "Report copied to clipboard.";
      } else {
        window.prompt("Copy the report below:", report);
        status.textContent = "Clipboard API unavailable; offered a manual copy option.";
      }
    } catch (_) {
      window.prompt("Copy the report below:", report);
      status.textContent = "Automatic copy was blocked; offered a manual copy option.";
    }
  });
  runChecks();
})();
