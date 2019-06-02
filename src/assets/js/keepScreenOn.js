function kso() {
  navigator.getWakeLock("screen").then(function(wakeLock) {
    var request = wakeLock.createRequest();
    setTimeout(function() {
      request.cancel();
    }, 6000);
  });
}
