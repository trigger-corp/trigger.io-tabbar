package io.trigger.forge.android.modules.tabbar;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeFile;
import io.trigger.forge.android.util.BitmapUtil;

import java.io.IOException;
import java.util.HashMap;

import android.app.Activity;
import android.content.Context;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class Util {
	public static LinearLayout tabs;
	public static HashMap<String, LinearLayout> tabObjects = new HashMap<String, LinearLayout>();
	public static int selectedColor = 0xFF1C8DD9;
	public static String selectedId = null;

	public static void addButton(final Context context, final String callid, JsonObject params) throws IOException {
		int size = 75;
		DisplayMetrics metrics = new DisplayMetrics();
		((Activity) context).getWindowManager().getDefaultDisplay().getMetrics(metrics);
		int requiredSize = Math.round(metrics.density * size);

		LinearLayout tab = new LinearLayout(context) {
			@Override
			public boolean onTouchEvent(MotionEvent event) {
				try {
					Util.highlightTab(context, callid);
				} catch (IOException e) {
				}
				ForgeApp.event("tabbar.buttonPressed." + callid, null);
				return super.onTouchEvent(event);
			}
		};

		tab.setTag(params);
		tab.setOrientation(LinearLayout.VERTICAL);
		tab.setGravity(Gravity.CENTER);
		int margin = Math.round(metrics.density * 10);
		LinearLayout.LayoutParams tabLayout = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, requiredSize - margin, 1);
		tabLayout.setMargins(margin, margin, margin, margin);
		tab.setLayoutParams(tabLayout);

		ImageView image = new ImageView(context);
		image.setScaleType(ImageView.ScaleType.CENTER);
		JsonElement icon = params.get("icon");
		
		try {
			image.setImageDrawable(BitmapUtil.scaledDrawableFromStreamWithTint(ForgeApp.getActivity(), new ForgeFile(ForgeApp.getActivity(), icon).fd().createInputStream(), 0, 32, 0xFF929292));
		} catch (NullPointerException e) {
			throw new IOException("Missing image file for tabbar button.");
		}
		image.setTag("image");
		tab.addView(image, new ViewGroup.LayoutParams(Math.round(metrics.density * 32), Math.round(metrics.density * 32)));
		TextView text = new TextView(context);
		text.setText(params.get("text").getAsString());
		text.setTextColor(0xFF929292);
		text.setTextSize(TypedValue.COMPLEX_UNIT_PX, metrics.density * 12);
		text.setGravity(Gravity.CENTER);
		text.setTag("text");
		tab.addView(text, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

		int index;
		if (params.has("index")) {
			index = params.get("index").getAsInt();
		} else {
			index = 99999;
		}
		params.addProperty("index", index);

		int realIndex = 0;
		for (LinearLayout curTab : tabObjects.values()) {
			if (((JsonObject)curTab.getTag()).get("index").getAsInt() < index) {
				realIndex++;
			}
		}

		tabObjects.put(callid, tab);

		tabs.addView(tab, realIndex);

	}

	public static void highlightTab(final Context context, String callid) throws IOException {
		for (LinearLayout tab : tabObjects.values()) {
			tab.setBackgroundColor(0);
			JsonObject params = (JsonObject) tab.getTag();

			String iconPath = params.get("icon").getAsString();
			((ImageView) tab.findViewWithTag("image")).setImageDrawable(BitmapUtil.scaledDrawableFromLocalFileWithTint(context, iconPath, 0, 32, 0xFF929292));
			((TextView) tab.findViewWithTag("text")).setTextColor(0xFF929292);
		}
		if (callid != null && tabObjects.get(callid) != null) {
			JsonObject params = (JsonObject) tabObjects.get(callid).getTag();

			String iconPath = params.get("icon").getAsString();
			((ImageView) tabObjects.get(callid).findViewWithTag("image")).setImageDrawable(BitmapUtil.scaledDrawableFromLocalFileWithTint(context, iconPath, 0, 32, selectedColor));
			((TextView) tabObjects.get(callid).findViewWithTag("text")).setTextColor(selectedColor);
			selectedId = callid;
		} else {
			selectedId = null;
		}
	}

	public static void setActiveTint(final Context context, int color) throws IOException {
		selectedColor = color;
		highlightTab(context, selectedId);
	}

	public static void removeTab(String callid) {
		tabs.removeView(tabObjects.remove(callid));
	}

	public static void removeAllTabs() {
		tabs.removeAllViews();
		tabObjects.clear();
	}
}
