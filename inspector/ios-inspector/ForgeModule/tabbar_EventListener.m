//
//  tabbar_EventListener.m
//  Forge
//
//  Created by Connor Dunn on 27/03/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import "tabbar_EventListener.h"
#import "tabbar_Delegate.h"

UITabBar *tabbar;
NSMutableArray* tabbarItems;
char taskKey;

@implementation tabbar_EventListener

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	// Create the tabbar
	tabbar = [[UITabBar alloc] initWithFrame:CGRectMake(0.0f, ([[ForgeApp sharedApp] webView].frame.origin.y + [[ForgeApp sharedApp] webView].frame.size.height) - 49.0f, 320.0f, 49.0f)];
	tabbar.autoresizingMask = UIViewAutoresizingNone | UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleTopMargin;
	tabbar_Delegate *delegate = [[tabbar_Delegate alloc] init];
	tabbar.delegate = delegate;
	
	tabbarItems = [[NSMutableArray alloc] init];
	[tabbar setItems:tabbarItems];
	
	// Resize webview scroll area
	if (floor(NSFoundationVersionNumber) <= NSFoundationVersionNumber_iOS_6_1) {
		[[ForgeApp sharedApp] webView].frame = CGRectMake([[ForgeApp sharedApp] webView].frame.origin.x, [[ForgeApp sharedApp] webView].frame.origin.y, [[ForgeApp sharedApp] webView].frame.size.width, [[ForgeApp sharedApp] webView].frame.size.height - tabbar.frame.size.height);
	} else {
		UIEdgeInsets inset = [[ForgeApp sharedApp] webView].scrollView.contentInset;
		UIEdgeInsets newInset = UIEdgeInsetsMake(inset.top, inset.left, inset.bottom + tabbar.frame.size.height, inset.right);
		[[[ForgeApp sharedApp] webView].scrollView setContentInset:newInset];
		[[[ForgeApp sharedApp] webView].scrollView setScrollIndicatorInsets:newInset];
	}
	
	// Add tabbar to view
	[[[ForgeApp sharedApp] viewController].view insertSubview:tabbar aboveSubview:[ForgeApp sharedApp].webView];
}

+ (void) preFirstWebViewLoad {
	// Reset tabbar on first load/reload
	[tabbarItems removeAllObjects];
	[tabbar setItems:tabbarItems];
}

@end
