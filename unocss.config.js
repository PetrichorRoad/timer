// uno.config.ts
import { defineConfig, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import presetTheme from 'unocss-preset-theme';
import { myTheme, safelist } from './src/utils/theme/theme';
export default defineConfig({
  presets: [
    presetUno(),
    presetTheme({
      theme: myTheme
    }),
    presetIcons(),
  ],
})