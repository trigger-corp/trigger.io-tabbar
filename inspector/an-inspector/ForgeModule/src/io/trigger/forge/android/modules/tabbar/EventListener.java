package io.trigger.forge.android.modules.tabbar;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeEventListener;
import io.trigger.forge.android.core.ForgeViewController;

import java.util.HashMap;

import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.LinearLayout;

public class EventListener extends ForgeEventListener{
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Reference to tabs layout to edit later
        Util.selectedColor = 0xFF1C8DD9;
        Util.selectedId = null;
        Util.tabObjects = new HashMap<String, LinearLayout>();

        ForgeViewController.setTabBarHidden(false, null);
    }
}
