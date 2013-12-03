//
//  tabbar_API.h
//  Forge
//
//  Created by Connor Dunn on 27/03/2012.
//  Copyright (c) 2012 Trigger Corp. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface tabbar_API : NSObject

+ (void)show:(ForgeTask*)task;
+ (void)hide:(ForgeTask*)task;
+ (void)addButton:(ForgeTask*)task;
+ (void)removeButtons:(ForgeTask*)task;
+ (void)removeButton:(ForgeTask *)task id:(NSString*)buttonId;
+ (void)setActive:(ForgeTask *)task id:(NSString*)buttonId;
+ (void)setTint:(ForgeTask *)task color:(NSArray*)color;
+ (void)setActiveTint:(ForgeTask *)task color:(NSArray*)color;
+ (void)setInactive:(ForgeTask *)task;

@end
