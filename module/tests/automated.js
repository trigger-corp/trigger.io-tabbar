module("forge.tabbar");

asyncTest("hide", 1, function() {
    forge.tabbar.hide(function () {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("show", 1, function() {
    forge.tabbar.show(function () {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("setTint", 1, function() {
    forge.tabbar.setTint([100, 50, 25, 255], function () {
        ok(true);
        start();
    }, function () {
        // Fails on iOS 4
        ok(true);
        start();
    });
});

asyncTest("setTint - 'red'", 1, function() {
    forge.tabbar.setTint("red", function () {
        ok(false);
        start();
    }, function () {
        ok(true);
        start();
    });
});

asyncTest("setTint - fail", 1, function() {
    forge.tabbar.setTint([], function () {
        ok(false);
        start();
    }, function () {
        ok(true);
        start();
    });
});

asyncTest("setActiveTint", 1, function() {
    forge.tabbar.setActiveTint([100, 50, 25, 255], function () {
        ok(true);
        start();
    }, function () {
        // Fails on iOS 4
        ok(true);
        start();
    });
});

asyncTest("setActiveTint - 'red'", 1, function() {
    forge.tabbar.setActiveTint("red", function () {
        ok(false);
        start();
    }, function () {
        ok(true);
        start();
    });
});

asyncTest("setActiveTint - fail", 1, function() {
    forge.tabbar.setActiveTint(undefined, function () {
        ok(false);
        start();
    }, function () {
        ok(true);
        start();
    });
});

asyncTest("removeButtons - no buttons", 1, function() {
    forge.tabbar.removeButtons(function () {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("setInactive - no buttons", 1, function() {
    forge.tabbar.setInactive(function () {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - text/icon", 1, function() {
    forge.tabbar.addButton({
        text: "†és†",
        icon: "fixtures/tabbar/1.png"
    }, function (button) {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - text/icon - high index", 1, function() {
    forge.tabbar.addButton({
        text: "†és†",
        icon: "fixtures/tabbar/1.png",
        index: 500
    }, function (button) {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - text/icon - low index", 1, function() {
    forge.tabbar.addButton({
        text: "†és†",
        icon: "fixtures/tabbar/1.png",
        index: -500
    }, function (button) {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - text/icon - good index", 1, function() {
    forge.tabbar.addButton({
        text: "†és†",
        icon: "fixtures/tabbar/1.png",
        index: 2
    }, function (button) {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - methods", 1, function() {
    forge.tabbar.addButton({
        text: "†és†",
        icon: "fixtures/tabbar/1.png"
    }, function (button) {
        button.setActive(function () {
            button.remove(function () {
                ok(true);
                start();
            }, function () {
                ok(false);
                start();
            });
        }, function () {
            ok(false);
            start();
        });
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("setInactive", 1, function() {
    forge.tabbar.setInactive(function () {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("removeButtons", 1, function() {
    forge.tabbar.removeButtons(function () {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - text/icon", 1, function() {
    forge.tabbar.addButton({
        text: "†és†",
        icon: "fixtures/tabbar/1.png"
    }, function (button) {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - text", 1, function() {
    forge.tabbar.addButton({
        text: "†és†"
    }, function (button) {
        ok(false);
        start();
    }, function () {
        ok(true);
        start();
    });
});

asyncTest("addButton - icon", 1, function() {
    forge.tabbar.addButton({
        icon: "fixtures/tabbar/1.png"
    }, function (button) {
        ok(true);
        start();
    }, function () {
        ok(false);
        start();
    });
});

asyncTest("addButton - bad icon", 1, function() {
    forge.tabbar.addButton({
        text: "†és†",
        icon: "16sdfgsdg.png"
    }, function (button) {
        ok(false);
        start();
    }, function () {
        ok(true);
        start();
    });
});
