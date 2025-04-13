import { defineConfig, presetUno, presetAttributify } from 'unocss'

const colors = ['red', 'blue', 'green', 'gray'];
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const variants = ['hover', 'focus'];

const classes = colors.flatMap(c =>
  shades.map(s => `text-${c}-${s}`)
);

const variantClasses = variants.flatMap(v =>
  classes.map(cls => `${v}:${cls}`)
);

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
      vite: {
        version: 6
      }
    }),
    presetAttributify()
  ],
  safelist: [
    // 'text-red-600',
    // 'text-green-600',
    // 'text-yellow-500',
    // 'text-blue-500',
    // 'text-gray-400',
    ...classes,
    ...variantClasses,
  ]
})
