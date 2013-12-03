``tabbar``: Native tab bar
==========================

The ``tabbar`` module shows a fixed footer as part of your app which can
show multiple "tab" buttons, these buttons can be selected by the user
or activated by JavaScript.

To get an idea of how these footers can look, see our blog post, [How to build hybrid mobile apps combining native UI components with HTML5](<http://trigger.io/cross-platform-application-development-blog/2012/04/30/how-to-build-hybrid-mobile-apps-combining-native-ui-components-with-html5/>).

##API

!method: forge.tabbar.show(success, error)
!param: success `function()` callback to be invoked when no errors occur
!description: Shows the tabbar. The tabbar is shown by default and will only be hidden if you call [forge.tabbar.hide()](index.html#forgetabbarhidesuccess-error).
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.tabbar.hide(success, error)
!param: success `function()` callback to be invoked when no errors occur
!description: Hides the tabbar.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.tabbar.setTint(color, success, error)
!param: color `array` an array of four integers in the range [0,255] that make up the RGBA color to tint the tabbar. For example, opaque red is [255, 0, 0, 255].
!param: success `function()` callback to be invoked when no errors occur
!description: Set a color to tint the tabbar with.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.tabbar.setActiveTint(color, success, error)
!param: color `array` an array of four integers in the range [0,255] that make up the RGBA color to tint the active tab item. For example, opaque red is [255, 0, 0, 255].
!param: success `function()` callback to be invoked when no errors occur
!description: Set a color to tint active tabbar item with.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.tabbar.addButton(params, success, error)
!param: params `object` button options, must contain an ``icon``, ``text`` and optionally ``index``
!param: success `function(button)` called with the button object
!description: Add a button with an ``icon`` and ``text`` to the tabbar. 
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

The first parameter is an object of options for the button, which can include:

-  ``icon`` (required): This sets the icon which will be shown on the
   tab, only the alpha channel of the icon will be used with the color
   being replaced for a consistent style. You can use a file object as
   returned by something like [forge.file.saveURL](/modules/file/current/docs/index.html#forgefilesaveurlurl-success-error), or a
   string path relative to the ``src`` directory, e.g.
   ``"img/button.png"``.
-  ``text`` (required): This sets the text which will appear below the
   icon on the tab.
-  ``index`` (recommended): This sets the order of the button to be
   added, not setting this will result in the order of the tabs not
   being fixed.

When adding a button the success callback will be called with a button
object. This object has methods to allow you to interact with the button
as follows:

-  ``button.remove(success, error)``: Remove the button
-  ``button.setActive(success, error)``: Mark the button as selected,
   without calling this and before the user clicks on one of the buttons
   no button will be marked active.
-  ``button.onPressed.addListener(callback, error)``: Add a callback to
   handle when the button is pressed

**Example**:

    forge.tabbar.addButton({
      icon: "search.png",
      text: "Search",
      index: 0
    }, function (button) {
      button.setActive();
      button.onPressed.addListener(function () {
        alert("Search");
      });
    });

!method: forge.tabbar.removeButtons(success, error)
!param: success `function()` callback to be invoked when no errors occur
!description: Remove all buttons from the tabbar.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur

!method: forge.tabbar.setInactive(success, error)
!param: success `function()` callback to be invoked when no errors occur
!description: Unselect any currently active tab, leaving the tabbar with no tabs selected.
!platforms: iOS, Android
!param: error `function(content)` called with details of any error which may occur


