import { PropsWithChildren } from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'
import { BORDER_RADIUS_MEDIUM, PRIMARY_COLOR } from '../styles'
import { useSkeletonAnimation } from './useSkeletonAnimation'

interface Props {
  style?: StyleProp<ViewStyle>
}

function Skeleton({ style, children }: PropsWithChildren<Props>) {
  const opacity = useSkeletonAnimation()

  return (
    <Animated.View
      style={[
        { borderRadius: BORDER_RADIUS_MEDIUM },
        style,
        { backgroundColor: PRIMARY_COLOR, opacity },
      ]}
    >
      {children}
    </Animated.View>
  )
}

export default Skeleton
