// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function loadGame() {
        pc.start('pcGameCanvas', 'TheGame', '../../js/', ['angrycannons.js'], '../../playcraftjs/lib/');
    }

    if (window.WinJS) {
        WinJS.UI.Pages.define("/pages/playcraftGame/playcraftGame.html", {
            // This function is called whenever a user navigates to this page. It
            // populates the page elements with the app's data.
            ready: function (element, options) {
                // TODO: Initialize the page here.
                loadGame();
            },

            unload: function () {
                // TODO: Respond to navigations away from this page.
            },

            updateLayout: function (element) {
                /// <param name="element" domElement="true" />

                // TODO: Respond to changes in layout.
            }
        });
    } else {
        document.addEventListener("DOMContentLoaded", loadGame);
    }
})();
