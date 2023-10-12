import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useState, useRef, memo, useCallback } from 'react'

type Item = { id: number; title: string; isChecked?: boolean }

export type PickerBottomSheetProps = {
  title?: string
  items: Array<Item>
  onClose: (items: Array<Item>) => void
}

function PickerBottomSheet(props: PickerBottomSheetProps) {
  const [items, setItems] = useState(props.items!)

  const bottomSheetRef = useRef<BottomSheet>(null)

  const selectItem = useCallback((id: number) => {
    setItems(items =>
      items.map(item => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked }
        } else return item
      }),
    )
  }, [])

  console.log('==== RENDER ====')

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose
      onClose={() => {
        props.onClose(items)
      }}
    >
      {props.title !== undefined && <Text style={styles.title}>{props.title}</Text>}

      <BottomSheetFlatList
        data={items}
        renderItem={({ item }) => {
          return <Item item={item} selectItem={selectItem} />
        }}
      />

      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <Button title={'Cancel'} />
        <Button
          title={'Confirm'}
          onPress={() => {
            bottomSheetRef.current?.close()
          }}
        />
      </View>
    </BottomSheet>
  )
}

const Item = memo(function Item({ item, selectItem }: { item: Item }) {
  console.log('>> item', item.id)

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 15,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: item.isChecked ? COLORS.PRIMARY_600 : 'transparent',
        borderRadius: 10,
      }}
      onPress={() => selectItem(item.id)}
    >
      <Text style={{ flex: 1 }}>{item.title}</Text>

      <Text>{item.isChecked && 'CHECKED'}</Text>
    </TouchableOpacity>
  )
})

function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        marginHorizontal: 10,
        flex: 1,
        height: 50,
        backgroundColor: COLORS.PRIMARY_600,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff' }}>{title}</Text>
    </TouchableOpacity>
  )
}

const COLORS = {
  GRAY_900: '#101828',
  PRIMARY_600: '#FF6600',
}

const styles = StyleSheet.create({
  title: { marginTop: 10, marginLeft: 20, fontSize: 20, color: COLORS.GRAY_900 },
})

export default PickerBottomSheet
