//
//  tabbar_API.m
//  Forge
//
//  Created by Connor Dunn on 27/03/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import "tabbar_API.h"
#import <objc/runtime.h>

extern NSMutableArray* tabbarItems;
extern char taskKey;
char indexKey;

@implementation tabbar_API

static bool hidden = NO;

+ (void)show:(ForgeTask*)task {
    ForgeApp.sharedApp.viewController.tabBarHidden = NO;
    [task success:nil];
}


+ (void)hide:(ForgeTask*)task {
    ForgeApp.sharedApp.viewController.tabBarHidden = YES;
    [task success:nil];
}


+ (void)addButton:(ForgeTask*)task {
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;

    if (![task.params objectForKey:@"icon"]) {
        [task error:@"Missing text" type:@"BAD_INPUT" subtype:nil];
        return;
    }

    ForgeFile *file = [[ForgeFile alloc] initWithObject:[task.params objectForKey:@"icon"]];

    [file data:^(NSData *data) {
        UIImage *icon = [[UIImage alloc] initWithData:data];

        if (!icon) {
            [task error:@"Bad icon" type:@"BAD_INPUT" subtype:nil];
            return;
        }

        icon = [icon imageWithWidth:30 andHeight:30 andRetina:YES];

        UITabBarItem *item = [[UITabBarItem  alloc ] init ];
        item.image = icon;
        item.tag = 0;

        if ([task.params objectForKey:@"text"] != nil) {
            item.title = [task.params objectForKey:@"text"];
        } else {
            // We don't have a title - center the image vertically.
            item.imageInsets = UIEdgeInsetsMake(5, 0, -5, 0);
        }

        objc_setAssociatedObject(item, &taskKey, task, OBJC_ASSOCIATION_RETAIN);

        int index = 0;
        if ([task.params objectForKey:@"index"] != nil) {
            index = [[task.params objectForKey:@"index"] intValue];
        } else {
            index = 9999999;
        }
        objc_setAssociatedObject(item, &indexKey, [NSNumber numberWithInt:index], OBJC_ASSOCIATION_RETAIN);

        int realIndex = 0;
        for (UITabBarItem *curItem in tabbarItems) {
            NSNumber *curIndex = objc_getAssociatedObject(curItem, &indexKey);
            if ([curIndex intValue] < index) {
                realIndex++;
            }
        }
        [tabbarItems insertObject:item atIndex:realIndex];
        [tabBar setItems:tabbarItems];
        [task success:task.callid];

    } errorBlock:^(NSError *error) {
        [task error:@"Failed to load image" type:@"UNEXPECTED_FAILURE" subtype:nil];
    }];
}


+ (void)removeButtons:(ForgeTask*)task {
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    [tabbarItems removeAllObjects];
    [tabBar setItems:tabbarItems];
    [task success:nil];
}


+ (void)removeButton:(ForgeTask *)task id:(NSString*)buttonId {
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    for (UITabBarItem* item in tabbarItems) {
        ForgeTask *task = (ForgeTask *)objc_getAssociatedObject(item, &taskKey);
        if ([task.callid isEqualToString:buttonId]) {
            [tabbarItems removeObject:item];
            [tabBar setItems:tabbarItems];
            break;
        }
    }
    [task success:nil];
}


+ (void)setActive:(ForgeTask *)task id:(NSString*)buttonId {
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    for (UITabBarItem* item in tabbarItems) {
        ForgeTask *task = (ForgeTask *)objc_getAssociatedObject(item, &taskKey);
        if ([task.callid isEqualToString:buttonId]) {
            tabBar.selectedItem = item;
            break;
        }
    }
    [task success:nil];
}


+ (void)setTint:(ForgeTask *)task color:(NSArray*)color {
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    if (![color isKindOfClass:[NSArray class]]) {
        [task error:@"Missing tint" type:@"BAD_INPUT" subtype:nil];
        return;
    }

    if ([tabBar respondsToSelector:@selector(setBarTintColor:)]) {
        tabBar.barTintColor = [UIColor colorWithRed:[(NSNumber*)[color objectAtIndex:0] floatValue]/255
                                              green:[(NSNumber*)[color objectAtIndex:1] floatValue]/255
                                               blue:[(NSNumber*)[color objectAtIndex:2] floatValue]/255
                                              alpha:[(NSNumber*)[color objectAtIndex:3] floatValue]/255];
        [task success:nil];
    } else if ([tabBar respondsToSelector:@selector(setTintColor:)]) {
        tabBar.tintColor = [UIColor colorWithRed:[(NSNumber*)[color objectAtIndex:0] floatValue]/255
                                           green:[(NSNumber*)[color objectAtIndex:1] floatValue]/255
                                            blue:[(NSNumber*)[color objectAtIndex:2] floatValue]/255
                                            alpha:[(NSNumber*)[color objectAtIndex:3] floatValue]/255];
        [task success:nil];
    } else {
        [task error:@"Not available on this platform" type:@"UNAVAILABLE" subtype:nil];
    }
}


+ (void)setActiveTint:(ForgeTask *)task color:(NSArray*)color {
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    if (![color isKindOfClass:[NSArray class]]) {
        [task error:@"Missing tint" type:@"BAD_INPUT" subtype:nil];
        return;
    }

    if ([tabBar respondsToSelector:@selector(setBarTintColor:)]) {
        tabBar.tintColor = [UIColor colorWithRed:[(NSNumber*)[color objectAtIndex:0] floatValue]/255
                                           green:[(NSNumber*)[color objectAtIndex:1] floatValue]/255
                                            blue:[(NSNumber*)[color objectAtIndex:2] floatValue]/255
                                           alpha:[(NSNumber*)[color objectAtIndex:3] floatValue]/255];
        [task success:nil];
    } else if ([tabBar respondsToSelector:@selector(setSelectedImageTintColor:)]) {
        tabBar.selectedImageTintColor = [UIColor colorWithRed:[(NSNumber*)[color objectAtIndex:0] floatValue]/255
                                                        green:[(NSNumber*)[color objectAtIndex:1] floatValue]/255
                                                         blue:[(NSNumber*)[color objectAtIndex:2] floatValue]/255
                                                        alpha:[(NSNumber*)[color objectAtIndex:3] floatValue]/255];
        [task success:nil];
    } else {
        [task error:@"Not available on this platform" type:@"UNAVAILABLE" subtype:nil];
    }
}


+ (void)setInactive:(ForgeTask *)task {
    UITabBar *tabBar = ForgeApp.sharedApp.viewController.tabBar;
    tabBar.selectedItem = nil;
    [task success:nil];
}

@end
