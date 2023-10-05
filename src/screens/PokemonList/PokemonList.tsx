import { ScrollView, Text } from 'react-native'
import { useFetchPokemonList } from '../../data/useFetchData'
import PokemonListItem from './PokemonListItem'
import { TYPO } from '../../ui/styles'
import { useState } from 'react'
import PokemonDetails from '../PokemonDetails'

export default function PokemonList() {
  const { data, isLoading } = useFetchPokemonList()

  const { isPopupVisible, openPopup, closePopup, props } = usePopup<{ pokemonUrl: string }>()

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
              openDetails={() => openPopup({ pokemonUrl: pokemon!.url })}
            />
          ))}
      </ScrollView>

      {isPopupVisible && <PokemonDetails {...props!} closePopup={closePopup} />}
    </>
  )
}

function usePopup<TProps>() {
  const [props, setProps] = useState<TProps | null>(null)

  return {
    openPopup: (props: TProps) => {
      setProps(props)
    },
    closePopup: () => {
      setProps(null)
    },
    props,
    isPopupVisible: props !== null,
  }
}
