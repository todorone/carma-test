import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useFetchPokemonList } from '../../data/useFetchData'
import PokemonListItem from './PokemonListItem'
import { TYPO } from '../../ui/styles'
import PokemonDetails from '../PokemonDetails'
import { usePopup } from '../../utils'
import { useState } from 'react'
import { TextInput } from '../../ui/TextInput'

export default function PokemonList() {
  const [searchValue, setSearchValue] = useState('')

  let { data: pokemons } = useFetchPokemonList()

  if (searchValue.length > 2) {
    pokemons = pokemons.filter(pokemon => {
      if (pokemon === null) return true

      if (pokemon.name.toLowerCase().includes(searchValue.toLowerCase())) return true

      return false
    })
  }

  const { isPopupVisible, openPopup, closePopup, props } = usePopup<{ pokemonUrl: string }>()

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={{ marginVertical: 5, ...TYPO.H1 }}>Pokemon Squad</Text>

      <TextInput
        style={{ marginVertical: 10, width: '100%' }}
        placeholder={'Search...'}
        left={<Text style={TYPO.H4}>👀 </Text>}
        value={searchValue}
        onChangeText={setSearchValue}
        clearButtonMode={'always'}
      />

      <ScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {pokemons &&
          pokemons.map((pokemon, index) => (
            <PokemonListItem
              key={pokemon?.url ?? index}
              pokemon={pokemon}
              openDetails={() => {
                openPopup({ pokemonUrl: pokemon!.url })
                setSearchValue('')
              }}
            />
          ))}

        {pokemons && pokemons.length === 0 && searchValue.length > 2 && (
          <Text style={{ marginTop: 50, alignSelf: 'center', ...TYPO.TEXT_BIG }}>
            Nothing found...🧐
          </Text>
        )}
      </ScrollView>

      {isPopupVisible && <PokemonDetails {...props!} closePopup={closePopup} />}
    </View>
  )
}
