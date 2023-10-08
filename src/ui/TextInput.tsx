import React, { createRef, PureComponent, ReactElement } from 'react'
import { TextInput as RNTextInput, TextInputProps, ViewStyle, StyleSheet, View } from 'react-native'
import { BORDER_RADIUS_SMALL, COLOR, isAndroid } from './styles'

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
    const { style, inputStyle, left, right, errorMessage, ...restProps } = this.props

    const borderColor = this.state.isFocused ? COLOR.PRIMARY_60 : UNFOCUSED_BORDER_COLOR

    return (
      <>
        <View
          style={[
            styles.container,
            style,
            {
              opacity: restProps.editable === false ? 0.5 : 1,
              borderColor,
              borderWidth: 2,
              backgroundColor: COLOR.LIGHTEST_GREY,
              marginBottom: style?.marginBottom,
            },
          ]}
        >
          {left}

          <RNTextInput
            ref={this.input}
            style={[styles.input, inputStyle]}
            placeholderTextColor={COLOR.GREY}
            selectionColor={COLOR.PRIMARY}
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

// This is due to the difference in the way RN handles border painting over
// background color on iOS / Android
const UNFOCUSED_BORDER_COLOR = isAndroid ? COLOR.WHITE_08 : 'transparent'

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
