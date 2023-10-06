import { memo } from 'react'
import { View, ViewStyle, Image, Text } from 'react-native'
import { COLOR } from './styles'
import { Skeleton } from './skeletons'

interface Props {
  imageUri?: string
  name?: string
  style?: ViewStyle
  size?: number
}

function Avatar({ imageUri, name, style, size = SIZE }: Props) {
  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: COLOR.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  }

  if (imageUri === undefined && name === undefined) {
    return <Skeleton style={style ? [containerStyle, style] : containerStyle} />
  }

  return (
    <View style={style ? [containerStyle, style] : containerStyle}>
      {imageUri ? (
        <Image
          style={{ width: size, height: size, borderRadius: size / 2 }}
          source={{ uri: imageUri }}
        />
      ) : (
        <Text style={{ fontSize: 14, color: '#fff' }}>{name!.substring(0, 2).toUpperCase()}</Text>
      )}
    </View>
  )
}

const SIZE = 40

export default memo(Avatar)
