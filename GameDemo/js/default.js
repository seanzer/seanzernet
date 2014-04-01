// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=392286
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            var p = WinJS.UI.processAll().
                then(function () {
                    WinJS.Navigation.navigate("/pages/playcraftGame/playcraftGame.html");
                });
            args.setPromise(p);
            p.done();
        }
    };

    nav.onnavigating = function (args) {
        var host = document.getElementById("GameDemoFrame");
        host.winControl && host.winControl.dispose && host.winControl.dispose();
        WinJS.Utilities.disposeSubTree(host);
        WinJS.Utilities.empty(host);

        var url = args.detail.location;
        var options = args.detail.state;
        WinJS.UI.Pages.render(url, host, options);
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();