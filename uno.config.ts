import { defineConfig, presetAttributify, presetWind3 } from 'unocss';
import presetIcons from '@unocss/preset-icons/browser';
import antDesignIcons from '@iconify-json/ant-design/icons.json';

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
    presetAttributify(),
    presetIcons({
      warn: true,
      extraProperties: {
        'display': 'inline-block',
      },
      collections: {
        'ant-design': () => antDesignIcons,
      }
    }),
    presetWind3(),
  ],
  safelist: [
    'i-ant-design:check-circle-filled',
    'i-ant-design:close-circle-filled',
    'i-ant-design:exclamation-circle-filled',
    'i-ant-design:question-circle-filled',
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
