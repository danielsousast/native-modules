import { StyleSheet, NativeModules, TouchableOpacity, NativeEventEmitter, Button, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const { ExampleModule } = NativeModules;

export default function HomeScreen() {
  const [message, setMessage] = useState('undefined');
  const [eventMessage, setEventMessage] = useState('undefined');

  async function handlePrintMessage() {
    try {
      const message = await ExampleModule?.returnMessage()
      setMessage(message)
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  function handleRemoveEventListener() {
    try {
      subscription.remove()
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  function handleEventMessage() {
    try {
      ExampleModule?.eventMessage(17)
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  const eventEmitter = new NativeEventEmitter(ExampleModule);

  const subscription = eventEmitter.addListener('onMessagePrinted', (event) => {
    setEventMessage(event.value);
  });

  return (

    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 24 }}>ExampleModule</ThemedText>
      <Button
        title="Call Print Message"
        onPress={() => ExampleModule?.printMessage('Hello from React Native!')}
      />
      <Button
        title="Call Get Message"
        onPress={handlePrintMessage}
      />
      <Button
        title="Call Event Message"
        onPress={handleEventMessage}
      />
      <Button
        title="Remove Event Listener"
        onPress={handleRemoveEventListener}
      />

      <ThemedView style={styles.messageWrapper}>
        <ThemedText>Message: {message}</ThemedText>
        <ThemedText>Event Message: {eventMessage}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageWrapper: {
    marginBottom: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 4,
  }
});
