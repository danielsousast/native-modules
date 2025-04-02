package com.danielsousast.nativemodules

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class RCTExampleModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "RCTExampleModule"
    private var listenerCount = 0

    @ReactMethod
    fun printMessage(message: String) {
        Log.d("RCTExampleModule", "Printing message: $message")
    }

    @ReactMethod
    fun returnMessage(promise: Promise) {
        val message = "Hello from React Native!"
        Log.d("RCTExampleModule", "Returning message: $message")
        return promise.resolve(message)
    }

    @ReactMethod
    fun eventMessage(value: Int) {
        var params = Arguments.createMap()
        params.putInt("value", value)
        sendEvent("onMessagePrinted",params)
    }

    private fun sendEvent(eventName: String, params: Any?) {
        reactApplicationContext
            .getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter::class.java))
            .emit(eventName, params)
    }

    @ReactMethod
    fun addListener(eventName: String) {
        if (eventName == "onMessagePrinted") {
            listenerCount++
            Log.d("RCTExampleModule", "Listener added. Total listeners: $listenerCount")
        }
    }

    @ReactMethod
    fun removeListeners(event: Int) {
        listenerCount -= 1
        Log.d("RCTExampleModule", "Listeners removed. Total listeners: $listenerCount")
    }
}