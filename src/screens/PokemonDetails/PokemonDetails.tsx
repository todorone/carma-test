import BottomSheet, { BottomSheetRef } from '../../ui/BottomSheet'
import { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { useFetchPokemonDetails } from '../../data/useFetchData'

type Props = {
  pokemonUrl: string
  closePopup: () => void
}

function PokemonDetails({ pokemonUrl, closePopup }: Props) {
  const bottomSheet = useRef<BottomSheetRef>(null)

  const { data } = useFetchPokemonDetails(pokemonUrl)
  console.log('>> details', data)

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet ref={bottomSheet} snapPoints={snapPoints} onClose={closePopup}>
        <View style={{ width: '100%', height: 500 }} />
      </BottomSheet>
    </View>
  )
}

const snapPoints = ['90%']

export default PokemonDetails
