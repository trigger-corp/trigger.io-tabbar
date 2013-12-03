package io.trigger.forge.android.modules.tabbar;

import io.trigger.forge.android.core.ForgeApp;
import io.trigger.forge.android.core.ForgeParam;
import io.trigger.forge.android.core.ForgeTask;

import java.io.IOException;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.View;

import com.google.gson.JsonArray;

public class API {
	public static void show(final ForgeTask task) {
		task.performUI(new Runnable() {
			public void run() {
				Util.tabs.setVisibility(View.VISIBLE);
				task.success();
			}
		});
	}

	public static void hide(final ForgeTask task) {
		task.performUI(new Runnable() {
			public void run() {
				Util.tabs.setVisibility(View.GONE);
				task.success();
			}
		});
	}

	public static void addButton(final ForgeTask task) {
		task.performUI(new Runnable() {
			public void run() {
				try {
					Util.addButton(ForgeApp.getActivity(), task.callid, task.params);
					task.success(task.callid);
				} catch (IOException e) {
					task.error(e);
				}
			}
		});
	}

	public static void removeButtons(final ForgeTask task) {
		task.performUI(new Runnable() {
			public void run() {
				Util.removeAllTabs();
				task.success();
			}
		});
	}

	public static void setActive(final ForgeTask task, @ForgeParam("id") final String id) {
		task.performUI(new Runnable() {
			public void run() {
				try {
					Util.highlightTab(ForgeApp.getActivity(), id);
					task.success();
				} catch (IOException e) {
					task.error(e);
				}
			}
		});
	}

	public static void removeButton(final ForgeTask task, @ForgeParam("id") final String id) {
		task.performUI(new Runnable() {
			public void run() {
				Util.removeTab(id);
				task.success();
			}
		});
	}

	public static void setTint(final ForgeTask task, @ForgeParam("color") final JsonArray colorArray) {
		task.performUI(new Runnable() {
			public void run() {
				int color = Color.argb(colorArray.get(3).getAsInt(), colorArray.get(0).getAsInt(), colorArray.get(1).getAsInt(), colorArray.get(2).getAsInt());
				ColorDrawable bgColor = new ColorDrawable(color);
				Util.tabs.setBackgroundDrawable(bgColor);
				task.success();
			}
		});
	}

	public static void setActiveTint(final ForgeTask task, @ForgeParam("color") final JsonArray colorArray) {
		task.performUI(new Runnable() {
			public void run() {
				try {
					int color = Color.argb(colorArray.get(3).getAsInt(), colorArray.get(0).getAsInt(), colorArray.get(1).getAsInt(), colorArray.get(2).getAsInt());
					Util.setActiveTint(ForgeApp.getActivity(), color);
					task.success();
				} catch (IOException e) {
					task.error(e);
				}
			}
		});
	}

	public static void setInactive(final ForgeTask task) {
		task.performUI(new Runnable() {
			public void run() {
				try {
					Util.highlightTab(ForgeApp.getActivity(), null);
					task.success();
				} catch (IOException e) {
					task.error(e);
				}
			}
		});
	}
}
