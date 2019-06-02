async function kso() {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  document.body.appendChild(checkbox);

  let controller;

  checkbox.onclick = async () => {
    try {
      if (checkbox.checked) {
        controller = new AbortController();
        await WakeLock.request("screen", { signal: controller.signal });
      } else if (controller) {
        controller.abort();
      }
    } catch {
      checkbox.checked = false;
    }
  }
}
