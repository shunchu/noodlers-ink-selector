import { defineConfig, presetUno, presetAttributify } from 'unocss'

// More selective color palette
const colors = ['red', 'blue', 'green', 'gray'];
const commonShades = [300, 400, 500, 600];
const hoverColors = ['red-500', 'blue-500', 'gray-200', 'green-500'];

// Generate safelist more efficiently
const textClasses = colors.flatMap(c =>
  commonShades.map(s => `text-${c}-${s}`)
);

const bgClasses = colors.flatMap(c =>
  commonShades.map(s => `bg-${c}-${s}`)
);

const borderClasses = colors.flatMap(c =>
  commonShades.map(s => `border-${c}-${s}`)
);

const hoverClasses = ['hover'].flatMap(v =>
  hoverColors.map(cls => [
    `${v}:text-${cls}`,
    `${v}:bg-${cls}`,
    `${v}:border-${cls}`
  ]).flat()
);

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class'
    }),
    presetAttributify()
  ],
  safelist: [
    // Common text colors
    ...textClasses,
    // Common background colors
    ...bgClasses,
    // Common border colors
    ...borderClasses,
    // Hover variants
    ...hoverClasses,
  ]
})
