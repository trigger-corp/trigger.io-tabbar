//
//  tabbar_EventListener.m
//  Forge
//
//  Created by Connor Dunn on 27/03/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import "tabbar_EventListener.h"
#import "tabbar_Delegate.h"

NSMutableArray* tabbarItems;
char taskKey;

@implementation tabbar_EventListener

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Show tab bar by default
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    ForgeApp.sharedApp.viewController.tabBarHidden = NO;

    // Register delegate
    tabbar_Delegate *delegate = [[tabbar_Delegate alloc] init];
    tabBar.delegate = delegate;

    tabbarItems = [[NSMutableArray alloc] init];
    [tabBar setItems:tabbarItems];
}

+ (void) preFirstWebViewLoad {
    // Reset tabbar on first load/reload
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    [tabbarItems removeAllObjects];
    [tabBar setItems:tabbarItems];
}

@end
