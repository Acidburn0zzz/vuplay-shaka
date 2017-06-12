(function () {

    // Set your mpeg dash stream url
    var mpegdashStreamUrl = "<mpeg-dash-stream-url>";

    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<vudrm-token>"

    // Set polyfills required by shaka
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
        // setup the shaka player and attach an error event listener
        var video = document.getElementById('video');
        var player = new shaka.Player(video);
        player.addEventListener('error', onErrorEvent);

        // configure the DRM license servers
        var playReadyLaURL = "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken)
        player.configure({
            drm: {
                servers: {
                    "com.widevine.alpha": "https://widevine-proxy.drm.technology/proxy",
                    "com.microsoft.playready": playReadyLaURL
                }
            }
        })

        // load the mpeg-dash stream into the shaka player
        player.load(mpegdashStreamUrl).then(function () {
            console.log("The stream has now been loaded!");
        }).catch(onError);

    } else {
        console.error("This browser does not have the minimum set of APIs needed for shaka!");
    }
})();

function onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    onError(event.detail);
}

function onError(error) {
    console.error('Error code', error.code, 'object', error);
}