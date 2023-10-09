import { memo } from 'react'
import { View, ViewStyle, Text } from 'react-native'
import { Image } from 'expo-image'
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
    backgroundColor: imageUri ? COLOR.PRIMARY_08 : COLOR.PRIMARY,
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
          transition={50}
          source={{ uri: imageUri }}
        />
      ) : (
        <Text style={{ fontSize: 14, color: '#fff' }}>{name!.substring(0, 2).toUpperCase()}</Text>
      )}
    </View>
  )
}

const SIZE = 50

export default memo(Avatar)
