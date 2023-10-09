import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { useFetchPokemonList, PokemonListDataItem } from './useFetchPokemonList'
import PokemonListItem from './PokemonListItem'
import { TYPO } from '../../ui/styles'
import PokemonDetails from '../PokemonDetails'
import { usePopup, noop } from '../../utils'
import { TextInput } from '../../ui/TextInput'

function PokemonList() {
  const [searchValue, setSearchValue] = useState('')
  const isSearchApplied = searchValue.length > 2

  let pokemonsData = useFetchPokemonList()

  if (isSearchApplied) {
    pokemonsData = pokemonsData.filter(pokemon => {
      if (pokemon === null) return true

      if (pokemon.name.toLowerCase().includes(searchValue.toLowerCase())) return true

      return false
    })
  }

  const { isPopupVisible, openPopup, closePopup, props } = usePopup<{
    pokemon: PokemonListDataItem
  }>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Squad</Text>

      <TextInput
        style={styles.searchInput}
        placeholder={'Search...'}
        left={<Text style={TYPO.H4}>👀 </Text>}
        value={searchValue}
        onChangeText={setSearchValue}
        clearButtonMode={'always'}
      />

      <ScrollView style={styles.list} contentContainerStyle={styles.listContainer}>
        {pokemonsData !== undefined &&
          pokemonsData.map((pokemon, index) => (
            <PokemonListItem
              key={pokemon?.id ?? index}
              pokemon={pokemon}
              openDetails={
                pokemon !== null
                  ? () => {
                      openPopup({ pokemon })
                      setSearchValue('')
                    }
                  : noop
              }
            />
          ))}

        {pokemonsData !== undefined && pokemonsData.length === 0 && isSearchApplied && (
          <Text style={styles.notFound}>Nothing found...🧐</Text>
        )}
      </ScrollView>

      {isPopupVisible && <PokemonDetails {...props!} closePopup={closePopup} />}
    </View>
  )
}

export default PokemonList

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  title: { marginVertical: 5, ...TYPO.H1 },
  searchInput: { marginVertical: 10, width: '100%' },
  list: { flex: 1 },
  listContainer: { paddingBottom: 50 },
  notFound: { marginTop: 50, alignSelf: 'center', ...TYPO.TEXT_BIG },
})
