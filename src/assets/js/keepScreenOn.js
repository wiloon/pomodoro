async function kso() {
  let wakeLockObj;

  try {
    // Create a wake lock for the type we want.
    wakeLockObj = await navigator.getWakeLock('screen');
    wakeLockRequest = wakeLockObj.createRequest();
    console.log('👍', 'getWakeLock', wakeLockObj);
  } catch (ex) {
    console.error('👎', 'getWakeLock', ex);
  }

}
