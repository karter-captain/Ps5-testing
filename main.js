(() => {
  const button = document.querySelector("#run-test");
  const durationInput = document.querySelector("#duration");
  const status = document.querySelector("#status");
  const log = document.querySelector("#log");

  function record(message) {
    const item = document.createElement("li");
    item.textContent = `${performance.now().toFixed(1)} ms — ${message}`;
    log.prepend(item);
  }

  record("Page script initialized");

  button.addEventListener("click", () => {
    const duration = Number(durationInput.value);
    const start = performance.now();

    status.textContent = `Main thread paused for approximately ${duration} ms…`;
    record(`Test started; requested pause: ${duration} ms`);

    // Deliberately blocks only this demo page's main thread for a short,
    // user-selected interval. This is for timing observation, not exploitation.
    while (performance.now() - start < duration) {
      // Busy wait for the selected short interval.
    }

    const elapsed = performance.now() - start;
    status.textContent = `Test finished. Measured pause: ${elapsed.toFixed(1)} ms.`;
    record(`Main thread resumed; measured pause: ${elapsed.toFixed(1)} ms`);
  });
})();
