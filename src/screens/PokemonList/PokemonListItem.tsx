import { TouchableOpacity, Text, View } from 'react-native'
import { PokemonListDataItem } from '../../data/useFetchPokemonList'
import { capitalizeString } from '../../utils'
import { TextSkeleton } from '../../ui/skeletons'
import { TYPO, PRIMARY_COLOR_20 } from '../../ui/styles'
import Avatar from '../../ui/Avatar'

type Props = {
  pokemon: PokemonListDataItem | null
  openDetails: (pokemonUrl: string) => void
}

function PokemonListItem({ openDetails, pokemon }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ width: '100%', height: HEIGHT, flexDirection: 'row', alignItems: 'center' }}
      onPress={pokemon ? () => openDetails(pokemon.url) : undefined}
    >
      <Avatar style={{ marginRight: 8 }} name={pokemon?.name} />

      <View
        style={{
          width: '100%',
          height: '100%',
          paddingLeft: 8,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: PRIMARY_COLOR_20,
        }}
      >
        {pokemon === null ? (
          <TextSkeleton style={TYPO.H4}>Pokemon name</TextSkeleton>
        ) : (
          <Text style={TYPO.H4}>{capitalizeString(pokemon.name)}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const HEIGHT = 55

export default PokemonListItem
