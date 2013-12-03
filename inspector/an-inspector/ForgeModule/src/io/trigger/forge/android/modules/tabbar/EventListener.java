package io.trigger.forge.android.modules.tabbar;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeEventListener;

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
		LinearLayout tabs = new LinearLayout(ForgeApp.getActivity());
		tabs.setOrientation(LinearLayout.HORIZONTAL);

		int size = 75;
		DisplayMetrics metrics = new DisplayMetrics();
		ForgeApp.getActivity().getWindowManager().getDefaultDisplay().getMetrics(metrics);
		int requiredSize = Math.round(metrics.density * size);

		tabs.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, requiredSize));
		tabs.setGravity(Gravity.CENTER);

		ColorDrawable bgColor = new ColorDrawable(0xFFEEEEEE);
		tabs.setBackgroundDrawable(bgColor);

		ForgeApp.getActivity().mainLayout.addView(tabs);
		ForgeApp.getActivity().mainLayout.setBackgroundColor(0xFFFFFFFF);

		// Reference to tabs layout to edit later
		Util.tabs = tabs;
		Util.selectedColor = 0xFF1C8DD9;
		Util.selectedId = null;
		Util.tabObjects = new HashMap<String, LinearLayout>();
	}
}
