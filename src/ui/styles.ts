// Border radius
import { TextStyle } from 'react-native'

export const BORDER_RADIUS_SMALL = 8
export const BORDER_RADIUS_MEDIUM = 12
export const BORDER_RADIUS_BIG = 16

// Colors
const PRIMARY = '#1979FF'

export const COLOR = {
  BLACK: '#0D0F23',
  WHITE: '#FFFFFF',
  PRIMARY,
  PRIMARY_80: PRIMARY + 'CC',
  PRIMARY_60: PRIMARY + '99',
  PRIMARY_20: PRIMARY + '33',
  PRIMARY_08: PRIMARY + '14',
}

const createBaseFontConfig =
  (fontWeight: TextStyle['fontWeight']) =>
  (fontSize: number, color: string): TextStyle => ({
    fontWeight,
    fontSize,
    lineHeight: fontSize * 1.5,
    color,
  })

export const font400 = createBaseFontConfig('400')
export const font700 = createBaseFontConfig('700')

export const TYPO = {
  H1: font700(32, COLOR.BLACK),
  H2: font700(24, COLOR.BLACK),
  H3: font700(19, COLOR.BLACK),
  H4: font400(18, COLOR.BLACK),
  TEXT: font400(13, COLOR.BLACK),
  TEXT_BIG: font400(15, COLOR.BLACK),
  TEXT_SMALL: font400(11, COLOR.BLACK),
  TEXT_TINY: font400(9, COLOR.BLACK),
}
