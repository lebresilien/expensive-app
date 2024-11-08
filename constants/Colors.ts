/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

//const tintColorLight = '#0a7ea4';
const tintColorLight = '#0ea5e9';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: 'transparent',
    tint: tintColorLight,
    inactiveTint: '#d4d4d4',
    icon: '#0ea5e9',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    activeTint: 'white',
    contentBackground: '#a3a3a3'
  },
  dark: {
    text: '#ECEDEE',
    background: 'transparent',
    tint: tintColorDark,
    inactiveTint: '#d4d4d4',
    icon: '#0ea5e9',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    activeTint: 'white',
    contentBackground: '#a3a3a3'
  },
};
