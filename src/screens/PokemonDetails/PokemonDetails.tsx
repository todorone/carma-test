import { useRef } from 'react'
import { View, StyleSheet, Text, TextStyle } from 'react-native'
import { Image, ImageStyle } from 'expo-image'
import BottomSheet, { BottomSheetRef } from '../../ui/BottomSheet'
import { PokemonListDataItem } from '../PokemonList/useFetchPokemonList'
import { TYPO } from '../../ui/styles'

type Props = {
  pokemon: PokemonListDataItem
  closePopup: () => void
}

function PokemonDetails({ pokemon, closePopup }: Props) {
  const bottomSheet = useRef<BottomSheetRef>(null)

  const itemTitleStyle: TextStyle = { ...TYPO.H3, marginTop: 10 }
  const posterStyle: ImageStyle = { alignSelf: 'center', width: 280, height: 280 }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet ref={bottomSheet} snapPoints={snapPoints} onClose={closePopup}>
        <View style={{ paddingHorizontal: 20, alignItems: 'flex-start' }}>
          <Image
            source={{ uri: pokemon.posterUrl }}
            contentFit={'contain'}
            transition={150}
            style={posterStyle}
          />

          <Text style={itemTitleStyle}>
            Name: <Text style={TYPO.TEXT_BIG}>{pokemon.name}</Text>
          </Text>

          <Text style={itemTitleStyle}>
            Height: <Text style={TYPO.TEXT_BIG}>{pokemon.heightDecimeters} decimeters</Text>
          </Text>

          <Text style={itemTitleStyle}>
            Weight: <Text style={TYPO.TEXT_BIG}>{pokemon.weightHectograms} hectograms</Text>
          </Text>

          <Text style={itemTitleStyle}>
            Abilities:{' '}
            <Text style={TYPO.TEXT_BIG}>
              {/*{pokemon.abilities.join(', ').replaceAll('-', ' ')}*/}
            </Text>
          </Text>
        </View>
      </BottomSheet>
    </View>
  )
}

const snapPoints = [550]

export default PokemonDetails
