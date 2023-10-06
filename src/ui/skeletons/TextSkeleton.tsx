import { PropsWithChildren } from 'react'
import { StyleProp, Text, TextStyle, Animated } from 'react-native'
import { useSkeletonAnimation } from './useSkeletonAnimation'
import { COLOR, BORDER_RADIUS_SMALL } from '../styles'

interface Props {
  style?: StyleProp<TextStyle>
}

function TextSkeleton({ style, children }: PropsWithChildren<Props>) {
  const opacity = useSkeletonAnimation()

  return (
    <Animated.View
      style={{ backgroundColor: COLOR.PRIMARY, opacity, borderRadius: BORDER_RADIUS_SMALL }}
    >
      <Text style={[style, { color: '#00000000' }]}>{children}</Text>
    </Animated.View>
  )
}

export default TextSkeleton
