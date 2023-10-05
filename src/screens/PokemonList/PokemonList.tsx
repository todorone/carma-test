import { ScrollView, Text } from 'react-native'
import { useFetchPokemonList } from '../../data/useFetchPokemonList'
import PokemonListItem from './PokemonListItem'
import { TYPO } from '../../ui/styles'

export default function PokemonList() {
  const { data, isLoading } = useFetchPokemonList()

  const openDetailsPopup = () => {
    console.log('show pokemon detail')
  }

  return (
    <>
      <Text style={{ marginLeft: 20, marginVertical: 5, ...TYPO.H1 }}>Pokemon Squad</Text>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginHorizontal: 20,
        }}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {data &&
          data.map((pokemon, index) => (
            <PokemonListItem
              key={pokemon?.url ?? index}
              pokemon={pokemon}
              openDetails={openDetailsPopup}
            />
          ))}
      </ScrollView>
    </>
  )
}

const placeholders = [1, 2, 3, 4, 5]
