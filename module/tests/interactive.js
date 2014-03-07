module("forge.tabbar");

if (forge.is.mobile()) {
	asyncTest("Initial state", 1, function() {
		askQuestion("Is there a bar at the bottom of the screen with no visible buttons?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Hide", 1, function() {
		forge.tabbar.hide();
		askQuestion("Is the tabbar now hidden?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Show", 1, function() {
		forge.tabbar.show();
		askQuestion("Is the tabbar now visible again?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Add a button, press, check if selected", 1, function() {
		forge.tabbar.addButton({text: "ßü††øñ 1", icon: "fixtures/tabbar/1.png", index: 0}, function (button) {
			button.onPressed.addListener(function () {
				askQuestion("Is 'ßü††øñ 1' now selected?", {
					Yes: function () {
						ok(true, "Success");
						start();
					},
					No: function () {
						ok(false, "User claims failure - button not selected");
						start();
					}
				});
			});
		});
		askQuestion("Press the button labelled 'ßü††øñ 1'.", {
			"Nothing happened": function () {
				ok(false, "User claims failure - button cannot be pressed");
				start();
			}
		});
	});
	asyncTest("Add a button, select programmatically", 1, function() {
		forge.tabbar.addButton({text: "ßü††øñ 2", icon: "fixtures/tabbar/2.png", index: 1}, function (button) {
			button.setActive();
		});
		askQuestion("Has a 2nd button appeared, and is it now selected?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Add a button (with leading slash), remove programmatically", 1, function() {
		var b;
		forge.tabbar.addButton({text: "ßü††øñ 3", icon: "/fixtures/tabbar/3.png", index: 2}, function (button) {
			b = button;
		});
		askQuestion("Has a 3rd button appeared, and is 'ßü††øñ <b>2</b>' still selected?", {
			Yes: function () {
				b.remove();
				askQuestion("Has a 3rd button been removed?", {
					Yes: function () {
						ok(true, "Success");
						start();
					},
					No: function () {
						ok(false, "User claims failure");
						start();
					}
				});
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Set tint", 1, function() {
		forge.tabbar.setTint([255, 150, 150, 255]);
		askQuestion("Is the tabbar now red?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Set active tint", 1, function() {
		forge.tabbar.setActiveTint([0, 100, 0, 255]);
		askQuestion("Is the tabbar selected item now dark green?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Remove button", 1, function() {
		forge.tabbar.removeButtons();
		askQuestion("Are all the buttons gone?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Add a icon button, press, check if selected", 1, function() {
		forge.tabbar.addButton({icon: "fixtures/tabbar/1.png", index: 0}, function (button) {
			button.onPressed.addListener(function () {
				askQuestion("Is the button now selected?", {
					Yes: function () {
						ok(true, "Success");
						start();
					},
					No: function () {
						ok(false, "User claims failure - button not selected");
						start();
					}
				});
			});
		});
		askQuestion("Press the button.", {
			"Nothing happened": function () {
				ok(false, "User claims failure - button cannot be pressed");
				start();
			}
		});
	});
	asyncTest("Add a icon button, select programmatically", 1, function() {
		forge.tabbar.addButton({icon: "fixtures/tabbar/2.png", index: 1}, function (button) {
			button.setActive();
		});
		askQuestion("Has a 2nd button appeared, and is it now selected?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Add a icon button (with leading slash), remove programmatically", 1, function() {
		var b;
		forge.tabbar.addButton({icon: "/fixtures/tabbar/3.png", index: 2}, function (button) {
			b = button;
		});
		askQuestion("Has a 3rd button appeared, and is the 2nd button still selected?", {
			Yes: function () {
				b.remove();
				askQuestion("Has a 3rd button been removed?", {
					Yes: function () {
						ok(true, "Success");
						start();
					},
					No: function () {
						ok(false, "User claims failure");
						start();
					}
				});
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Set tint", 1, function() {
		forge.tabbar.setTint([190, 190, 190, 255]);
		askQuestion("Is the tabbar now grey?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Set active tint", 1, function() {
		forge.tabbar.setActiveTint([0, 0, 100, 255]);
		askQuestion("Is the tabbar selected item now dark blue?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
	asyncTest("Remove button", 1, function() {
		forge.tabbar.removeButtons();
		askQuestion("Are all the buttons gone?", {
			Yes: function () {
				ok(true, "Success");
				start();
			},
			No: function () {
				ok(false, "User claims failure");
				start();
			}
		});
	});
}