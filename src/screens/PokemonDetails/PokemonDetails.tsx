import { useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Image } from 'expo-image'
import BottomSheet, { BottomSheetRef } from '../../ui/BottomSheet'
import { PokemonListDataItem } from '../PokemonList/useFetchPokemonList'
import { TYPO } from '../../ui/styles'

type Props = {
  pokemon: PokemonListDataItem
  closePopup: () => void
}

function PokemonDetails({ pokemon, closePopup }: Props) {
  const bottomSheet = useRef<BottomSheetRef>(null)

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet ref={bottomSheet} snapPoints={snapPoints} onClose={closePopup}>
        <View style={styles.body}>
          <Image
            source={{ uri: pokemon.posterUrl }}
            contentFit={'contain'}
            transition={150}
            style={styles.poster}
          />

          <Text style={styles.itemTitle}>
            Name: <Text style={TYPO.TEXT_BIG}>{pokemon.name}</Text>
          </Text>

          <Text style={styles.itemTitle}>
            Height: <Text style={TYPO.TEXT_BIG}>{pokemon.heightDecimeters} decimeters</Text>
          </Text>

          <Text style={styles.itemTitle}>
            Weight: <Text style={TYPO.TEXT_BIG}>{pokemon.weightHectograms} hectograms</Text>
          </Text>

          <Text style={styles.itemTitle}>
            Abilities:{' '}
            <Text style={TYPO.TEXT_BIG}>{pokemon.abilities.join(', ').replaceAll('-', ' ')}</Text>
          </Text>
        </View>
      </BottomSheet>
    </View>
  )
}

const snapPoints = [550]

export default PokemonDetails

const styles = StyleSheet.create({
  body: { paddingHorizontal: 20, alignItems: 'flex-start' },
  poster: { marginVertical: 10, alignSelf: 'center', width: 280, height: 280 },
  itemTitle: { ...TYPO.H3, marginTop: 10 },
})
