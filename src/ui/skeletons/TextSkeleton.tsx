import { PropsWithChildren } from 'react'
import { StyleProp, TextStyle, Animated } from 'react-native'
import { useSkeletonAnimation } from './useSkeletonAnimation'
import { PRIMARY_COLOR, BORDER_RADIUS_MEDIUM } from '../styles'

interface Props {
  style?: StyleProp<TextStyle>
}

function TextSkeleton({ style, children }: PropsWithChildren<Props>) {
  const opacity = useSkeletonAnimation()

  return (
    <Animated.Text
      style={[
        { backgroundColor: PRIMARY_COLOR, opacity, borderRadius: BORDER_RADIUS_MEDIUM },
        style,
        { color: '#00000000' },
      ]}
    >
      {children}
    </Animated.Text>
  )
}

export default TextSkeleton
