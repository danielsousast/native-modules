//
//  RCTExampleModule.swift
//  nativemodules
//
//  Created by Daniel Sousa on 18/07/25.
//

import Foundation

@objc (RCTExampleModule)
class RCTExampleModule: NSObject {
  
  @objc
  func printMessage(_ message: String) {
    print(message)
  }
}
