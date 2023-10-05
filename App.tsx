import PokemonList from './src/screens/PokemonList'
import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <PokemonList />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
