import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PokemonListDataItem } from '../../data/useFetchData'
import { capitalizeString } from '../../utils'
import { TextSkeleton } from '../../ui/skeletons'
import { TYPO, COLOR } from '../../ui/styles'
import Avatar from '../../ui/Avatar'

type Props = {
  pokemon: PokemonListDataItem | null
  openDetails: (pokemonUrl: string) => void
}

function PokemonListItem({ openDetails, pokemon }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={pokemon ? () => openDetails(pokemon.url) : undefined}
      disabled={pokemon === null}
    >
      <Avatar style={styles.avatar} name={pokemon?.name} />

      <View style={styles.content}>
        {pokemon === null ? (
          <TextSkeleton style={TYPO.H4}>Pokemon name</TextSkeleton>
        ) : (
          <Text style={TYPO.H4}>{capitalizeString(pokemon.name)}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default PokemonListItem

const styles = StyleSheet.create({
  container: { width: '100%', height: 55, flexDirection: 'row', alignItems: 'center' },
  avatar: { marginRight: 8 },
  content: {
    width: '100%',
    height: '100%',
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLOR.PRIMARY_20,
  },
})
