// Border radius
import { TextStyle } from 'react-native'

export const BORDER_RADIUS_SMALL = 8
export const BORDER_RADIUS_MEDIUM = 12
export const BORDER_RADIUS_BIG = 16

// Hit slops
export const mediumHitSlop = { left: 15, right: 15, top: 15, bottom: 15 }

// Colors
export const BLACK = '#0D0F23'
export const GREY = '#A0A1B4'
export const LIGHTEST_GREY = '#F7F7F8'
export const WHITE = '#FFFFFF'
export const WHITE_80 = '#FFFFFFCC'
export const WHITE_60 = '#FFFFFF99'
export const WHITE_20 = '#FFFFFF33'
export const WHITE_08 = '#FFFFFF14'
export const PRIMARY_COLOR = '#1979FF'
export const PRIMARY_COLOR_80 = PRIMARY_COLOR + 'CC'
export const PRIMARY_COLOR_60 = PRIMARY_COLOR + '99'
export const PRIMARY_COLOR_20 = PRIMARY_COLOR + '33'
export const PRIMARY_COLOR_08 = PRIMARY_COLOR + '14'
export const ERROR_COLOR = '#EC3324'
export const ERROR_COLOR_80 = '#EC3324CC'
export const ERROR_COLOR_60 = '#EC332499'
export const ERROR_COLOR_20 = '#EC332433'
export const ERROR_COLOR_08 = '#EC332414'

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
  H1: font700(32, BLACK),
  H2: font700(24, BLACK),
  H3: font700(19, BLACK),
  H4: font400(18, BLACK),
  TEXT: font400(13, BLACK),
  TEXT_BIG: font400(15, BLACK),
  TEXT_SMALL: font400(11, BLACK),
  TEXT_TINY: font400(9, BLACK),
}
