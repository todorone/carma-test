import { forwardRef, PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import RNBottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetProps,
  useBottomSheet,
} from '@gorhom/bottom-sheet'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { COLOR } from './styles'

interface Props {
  snapPoints: BottomSheetProps['snapPoints']
  handleHeight?: BottomSheetProps['handleHeight']
  contentHeight?: BottomSheetProps['contentHeight']
  onClose: () => void
  containerTopPadding?: boolean // if false, content's top-left and right borders should be rounded
}

const BottomSheet = forwardRef<RNBottomSheet, PropsWithChildren<Props>>(function BottomSheet(
  { snapPoints, onClose, contentHeight, handleHeight, containerTopPadding = true, children },
  ref,
) {
  return (
    <RNBottomSheet
      ref={ref}
      snapPoints={snapPoints}
      handleHeight={handleHeight}
      contentHeight={contentHeight}
      enablePanDownToClose
      backgroundStyle={styles.background}
      handleComponent={() => {
        return (
          <View
            style={{
              position: containerTopPadding ? undefined : 'absolute',
              marginVertical: 10,
              width: 60,
              height: 6,
              backgroundColor: COLOR.PRIMARY,
              borderRadius: 3,
              alignSelf: 'center',
            }}
          />
        )
      }}
      onClose={onClose}
      backdropComponent={Backdrop}
    >
      {children}
    </RNBottomSheet>
  )
})

function Backdrop({ animatedIndex }: BottomSheetBackdropProps) {
  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: '#000000',
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.8], Extrapolate.CLAMP),
  }))

  const { close } = useBottomSheet()

  const gesture = Gesture.Tap().onStart(() => {
    runOnJS(close)()
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[StyleSheet.absoluteFill, containerStyle]} />
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  background: { backgroundColor: COLOR.WHITE },
})

export default BottomSheet

export type BottomSheetRef = RNBottomSheet
