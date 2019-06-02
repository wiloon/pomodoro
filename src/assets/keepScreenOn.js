function kso() {
  let wakeLockObj = null;

  navigator.getWakeLock('screen').then((wlObj) => {
    wakeLockObj = wlObj;
    let wakeLockRequest = null;
    const toggleWakeLock = () => {
      if (wakeLockRequest) {
        wakeLockRequest.cancel();
        wakeLockRequest = null;
        return;
      }
      wakeLockRequest = wakeLockObj.createRequest();
    };

    wakeLockCheckbox.addEventListener('click', () => {
      toggleWakeLock();
      return console.log(
        `Wake lock is ${
          wakeLockObj.active ? 'active' : 'not active'}`);
    });
  }).catch((err) => {
    return console.error('Could not obtain wake lock', err);
  });


}
