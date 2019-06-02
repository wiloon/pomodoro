function kso() {
  ((doc, nav, $, html) => {

    let wakeLockObj = null;
    nav.getWakeLock('screen').then((wlObj) => {
      wakeLockObj = wlObj;
    }).catch((err) => {
      return console.error('Could not obtain wake lock', err);
    });
    let wakeLockRequest = null;
    const toggleWakeLock = () => {
      if (wakeLockRequest) {
        wakeLockRequest.cancel();
        wakeLockRequest = null;
        return;
      }
      wakeLockRequest = wakeLockObj.createRequest();
    };

  })(document, navigator, document.querySelector.bind(document),
    document.createElement.bind(document));
}
