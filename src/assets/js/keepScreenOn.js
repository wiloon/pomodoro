async function kso() {

  try {

    let controller = new AbortController();
    await WakeLock.request("screen", {signal: controller.signal});

  } catch {

  }

}
