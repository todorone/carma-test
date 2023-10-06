import { useRef } from 'react'
import { View, StyleSheet, Text, TextStyle } from 'react-native'
import { Image, ImageStyle } from 'expo-image'
import BottomSheet, { BottomSheetRef } from '../../ui/BottomSheet'
import { useFetchPokemonDetails } from '../../data/useFetchData'
import { TYPO } from '../../ui/styles'
import { TextSkeleton, Skeleton } from '../../ui/skeletons'
import { capitalizeString } from '../../utils'

type Props = {
  pokemonUrl: string
  closePopup: () => void
}

function PokemonDetails({ pokemonUrl, closePopup }: Props) {
  const bottomSheet = useRef<BottomSheetRef>(null)

  const { data: pokemon } = useFetchPokemonDetails(pokemonUrl)
  console.log('>> pokemon', pokemon)

  const itemTitleStyle: TextStyle = { ...TYPO.H3, marginTop: 10 }
  const posterStyle: ImageStyle = { alignSelf: 'center', width: 280, height: 280 }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet ref={bottomSheet} snapPoints={snapPoints} onClose={closePopup}>
        <View style={{ paddingHorizontal: 20, alignItems: 'flex-start' }}>
          {pokemon ? (
            <Image source={{ uri: pokemon.posterUrl }} contentFit={'contain'} style={posterStyle} />
          ) : (
            <Skeleton style={posterStyle} />
          )}

          {pokemon ? (
            <Text style={itemTitleStyle}>
              Name: <Text style={TYPO.TEXT_BIG}>{capitalizeString(pokemon.name)}</Text>
            </Text>
          ) : (
            <TextSkeleton style={itemTitleStyle}>Name: Pikachu</TextSkeleton>
          )}

          {pokemon ? (
            <Text style={itemTitleStyle}>
              Height: <Text style={TYPO.TEXT_BIG}>{pokemon.heightDecimeters} decimeters</Text>
            </Text>
          ) : (
            <TextSkeleton style={itemTitleStyle}>Height: 5 decimeter</TextSkeleton>
          )}

          {pokemon ? (
            <Text style={itemTitleStyle}>
              Weight: <Text style={TYPO.TEXT_BIG}>{pokemon.weightHectograms} hectograms</Text>
            </Text>
          ) : (
            <TextSkeleton style={itemTitleStyle}>Weight: 30 hectogram</TextSkeleton>
          )}

          {pokemon ? (
            <Text style={itemTitleStyle}>
              Abilities:{' '}
              <Text style={TYPO.TEXT_BIG}>{pokemon.abilities.join(', ').replaceAll('-', ' ')}</Text>
            </Text>
          ) : (
            <TextSkeleton style={itemTitleStyle}>Abilities: some, other, another</TextSkeleton>
          )}
        </View>
      </BottomSheet>
    </View>
  )
}

const snapPoints = [550]

export default PokemonDetails
