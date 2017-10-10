//
//  tabbar_delegate.m
//  Forge
//
//  Created by Connor Dunn on 27/03/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import "tabbar_Delegate.h"
#import <objc/runtime.h>

extern char taskKey;

@implementation tabbar_Delegate

- (tabbar_Delegate*)init {
    if (self = [super init]) {
        // "retain"
        me = self;
    }
    return self;
}


- (void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item {
    ForgeTask *task = (ForgeTask *)objc_getAssociatedObject(item, &taskKey);
    NSString *eventName = [NSString stringWithFormat:@"tabbar.buttonPressed.%@", task.callid];
    [[ForgeApp sharedApp] event:eventName withParam:[NSNull null]];
}

@end
