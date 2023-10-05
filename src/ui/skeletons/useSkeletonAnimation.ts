import { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

export function useSkeletonAnimation() {
  const opacityValue = useRef(new Animated.Value(OPACITY_FROM)).current

  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: OPACITY_TO,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: OPACITY_FROM,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]),
  )

  useEffect(() => {
    animation.start()
    return () => animation.stop()
  }, [])

  return opacityValue
}

const OPACITY_FROM = 0.3
const OPACITY_TO = 1
