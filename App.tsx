import { SafeAreaView, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'

import PokemonList from './src/screens/PokemonList'
import { COLOR } from './src/ui/styles'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.flexOne}>
      <StatusBar translucent={false} backgroundColor={COLOR.WHITE} />

      <SafeAreaView style={styles.flexOne}>
        <PokemonList />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
})
