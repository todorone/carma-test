import React, { createRef, PureComponent, ReactElement } from 'react'
import { TextInput as RNTextInput, TextInputProps, ViewStyle, StyleSheet, View } from 'react-native'
import { BORDER_RADIUS_SMALL, COLOR } from './styles'

interface Props {
  inputStyle?: ViewStyle
  style?: ViewStyle
  placeholder: string
  value: string
  left?: ReactElement
  right?: ReactElement
}

interface State {
  isFocused: boolean
}

export class TextInput extends PureComponent<Props & TextInputProps, State> {
  state: State = { isFocused: false }

  input = createRef<RNTextInput>()

  onFocus = () => this.setState({ isFocused: true })
  onBlur = () => this.setState({ isFocused: false })

  render() {
    const { style, inputStyle, left, right, ...restProps } = this.props

    const borderColor = this.state.isFocused ? COLOR.PRIMARY_80 : COLOR.PRIMARY_20

    return (
      <>
        <View
          style={[
            styles.container,
            style,
            {
              borderColor,
              borderWidth: 2,
              marginBottom: style?.marginBottom,
            },
          ]}
        >
          {left}

          <RNTextInput
            ref={this.input}
            style={[styles.input, inputStyle]}
            placeholderTextColor={COLOR.LIGHT_GREY}
            selectionColor={COLOR.PRIMARY_80}
            cursorColor={COLOR.PRIMARY_80}
            underlineColorAndroid={'transparent'}
            clearTextOnFocus={false}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            {...restProps}
          />

          {right}
        </View>
      </>
    )
  }
}

export const TEXT_INPUT_HEIGHT = 48

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    height: TEXT_INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS_SMALL,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 17,
    fontWeight: '400',
    color: COLOR.BLACK,
    lineHeight: 21,
  },
})
