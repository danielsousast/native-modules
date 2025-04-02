import { StyleSheet, NativeModules, TouchableOpacity, NativeEventEmitter } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { ExampleModule } = NativeModules;

export default function HomeScreen() {
  async function handlePrintMessage() {
   const message = await ExampleModule?.returnMessage()
    console.log("Message: ", message);
  }

  const eventEmitter = new NativeEventEmitter(ExampleModule);

  const subscription = eventEmitter.addListener('onMessagePrinted', (event) => {
    console.log("Message: ", event.value);
  });

  return (

    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 24 }}>Welcome!</ThemedText>
      <TouchableOpacity style={{ marginBottom: 24 }} onPress={() => ExampleModule?.printMessage('Hello from React Native!')}>
        <ThemedText>Call Native Module</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePrintMessage} style={{ marginBottom: 24 }}>
        <ThemedText>Call Get Message</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => ExampleModule?.eventMessage(17)}
        style={{ marginBottom: 24 }}
      >
        <ThemedText>Call Event Message</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => subscription.remove()} style={{ marginBottom: 24 }}>
        <ThemedText>Remove Event Listener</ThemedText>
      </TouchableOpacity>
    </ThemedView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
