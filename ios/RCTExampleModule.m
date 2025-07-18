//
//  RCTExampleModule.m
//  nativemodules
//
//  Created by Daniel Sousa on 18/07/25.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(RCTExampleModule, NSObject)
  RCT_EXTERN_METHOD(printMessage:(NSString *) message)
@end