import { SafeAreaView, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import Home from './src/Home'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.flexOne}>
      <StatusBar translucent={false} backgroundColor={'#fff'} />

      <SafeAreaView style={styles.flexOne}>
        <Home />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
})
