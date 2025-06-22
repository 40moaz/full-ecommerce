import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
}
