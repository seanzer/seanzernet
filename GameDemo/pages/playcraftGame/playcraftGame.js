// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function loadGame(gameName) {
        var filesToLoad;
        switch (gameName) {
            case 'Angry Cannons':
                filesToLoad = ['angrycannons.js'];
                break;
            case 'Scrollia':
                filesToLoad = [
                    'scrollia/components/brain.js',
                    'scrollia/components/health.js',
                    'scrollia/components/healthbar.js',
                    'scrollia/systems/brain.js',
                    'scrollia/systems/healthbar.js',
                    'scrollia/systems/health.js',
                    'scrollia/systems/gamephysics.js',
                    'scrollia/systems/playercontrol.js',
                    'scrollia/soundmanager.js',
                    'scrollia/entityfactory.js',
                    'scrollia/gamescene.js',
                    'scrollia/game.js'
                ];
                break;
        }
        pc.start('pcGameCanvas', 'TheGame', '../../js/', filesToLoad, '../../playcraftjs/lib/');
    }

    if (window.WinJS) {
        WinJS.UI.Pages.define("/pages/playcraftGame/playcraftGame.html", {
            // This function is called whenever a user navigates to this page. It
            // populates the page elements with the app's data.
            ready: function (element, options) {
                // TODO: Initialize the page here.
                loadGame(options.name);
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
        document.addEventListener("DOMContentLoaded", function DCLd() {
            switch (location.hash) {
                case '#b':
                    loadGame('Scrollia');
                case '#a':
                default:
                    loadGame('Angry Cannons');
                    break;
            }
        });
    }
})();
