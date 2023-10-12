import { View, Button, Text } from 'react-native'
import { useState } from 'react'
import PickerBottomSheet, { PickerBottomSheetProps } from './PickerBottomSheet'

const data = new Array(10000)
  .fill(true)
  .map((_item, index) => ({ id: index, title: 'Option ' + index }))

function Home() {
  const [items, setItems] = useState(data)

  const [pickerProps, setPickerProps] = useState<PickerBottomSheetProps | null>(null)

  const mutateServer = items => {
    const payload = { items: items.filter(item => item.isChecked).map(item => item.id) }
    console.log('mutate', payload)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Selected items</Text>
      {items
        .filter(item => item.isChecked)
        .map(item => {
          return <Text key={item.id}>{item.title}</Text>
        })}

      <Button
        title={'Open'}
        onPress={() => {
          setPickerProps({
            title: 'Select one of the options:',
            items,
            onClose: items => {
              setPickerProps(null)
              setItems(items)
            },
          })
        }}
      />

      <Button
        title={'Submit data'}
        onPress={() => {
          mutateServer(items)
        }}
      />

      {pickerProps && <PickerBottomSheet {...pickerProps} />}
    </View>
  )
}

export default Home
