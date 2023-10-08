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

  const pokemonData = useFetchPokemonDetails(pokemonUrl)

  const itemTitleStyle: TextStyle = { ...TYPO.H3, marginTop: 10 }
  const posterStyle: ImageStyle = { alignSelf: 'center', width: 280, height: 280 }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet ref={bottomSheet} snapPoints={snapPoints} onClose={closePopup}>
        <View style={{ paddingHorizontal: 20, alignItems: 'flex-start' }}>
          {pokemonData ? (
            <Image
              source={{ uri: pokemonData.posterUrl }}
              contentFit={'contain'}
              transition={150}
              style={posterStyle}
            />
          ) : (
            <Skeleton style={posterStyle} />
          )}

          {pokemonData ? (
            <Text style={itemTitleStyle}>
              Name: <Text style={TYPO.TEXT_BIG}>{capitalizeString(pokemonData.name)}</Text>
            </Text>
          ) : (
            <TextSkeleton style={itemTitleStyle}>Name: Pikachu</TextSkeleton>
          )}

          {pokemonData ? (
            <Text style={itemTitleStyle}>
              Height: <Text style={TYPO.TEXT_BIG}>{pokemonData.heightDecimeters} decimeters</Text>
            </Text>
          ) : (
            <TextSkeleton style={itemTitleStyle}>Height: 5 decimeter</TextSkeleton>
          )}

          {pokemonData ? (
            <Text style={itemTitleStyle}>
              Weight: <Text style={TYPO.TEXT_BIG}>{pokemonData.weightHectograms} hectograms</Text>
            </Text>
          ) : (
            <TextSkeleton style={itemTitleStyle}>Weight: 30 hectogram</TextSkeleton>
          )}

          {pokemonData ? (
            <Text style={itemTitleStyle}>
              Abilities:{' '}
              <Text style={TYPO.TEXT_BIG}>
                {pokemonData.abilities.join(', ').replaceAll('-', ' ')}
              </Text>
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
