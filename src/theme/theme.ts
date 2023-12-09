import {Dimensions} from 'react-native';

export const SCREEN_DIMENSIONS = Dimensions.get('screen');
export const WINDOW_DIMENSIONS = Dimensions.get('window');

export const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
export const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

export const WINDOW_WIDTH = WINDOW_DIMENSIONS.width;
export const WINDOW_HEIGHT = WINDOW_DIMENSIONS.height;

export const PADDING_HORIZONTAL: number = WINDOW_WIDTH < 400 ? 20 : 40;

export const HEIGHT_INPUT_AND_BUTTON = 48;

interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
};

interface Color {
  primaryPurpleHex: string;
  primaryPinkHex: string;
  primaryRedHex: string;
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
  primaryBlueHex: string;
  secondPinkHex: string;
}

export const COLORS: Color = {
  primaryPurpleHex: '#6B129D',
  primaryPinkHex: '#FE5EFC',
  secondPinkHex: '#F970FC',
  primaryWhiteHex: '#FFFFFF',
  primaryBlackHex: '#000000',
  primaryBlueHex: '#9324CA',

  primaryRedHex: '#DC3535',
  primaryOrangeHex: '#D17842',
  primaryDarkGreyHex: '#141921',
  secondaryDarkGreyHex: '#21262E',
  primaryGreyHex: '#252A32',
  secondaryGreyHex: '#252A32',
  primaryLightGreyHex: '#52555A',
  secondaryLightGreyHex: '#AEAEAE',
  primaryBlackRGBA: 'rgba(12,15,20,0.5)',
  secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
};

interface FontFamily {
  lato_black: string;
  lato_blackItalic: string;
  lato_bold: string;
  lato_boldItalic: string;
  lato_light: string;
  lato_lightItalic: string;
  lato_regular: string;
  lato_thin: string;
  lato_thinItalic: string;
}

export const FONT_FAMILY: FontFamily = {
  lato_black: 'Lato-Black',
  lato_blackItalic: 'Lato-BlackItalic',
  lato_bold: 'Lato-Bold',
  lato_boldItalic: 'Lato-BoldItalic',
  lato_light: 'Lato-Light',
  lato_lightItalic: 'Lato-LightItalic',
  lato_regular: 'Lato-Regular',
  lato_thin: 'Lato-Thin',
  lato_thinItalic: 'Lato-ThinItalic',
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

export const FONT_SIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDER_RADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};
