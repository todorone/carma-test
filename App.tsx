import PokemonList from './src/screens/PokemonList'
import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { COLOR } from './src/ui/styles'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar translucent={false} backgroundColor={COLOR.WHITE} />

      <SafeAreaView style={{ flex: 1 }}>
        <PokemonList />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
