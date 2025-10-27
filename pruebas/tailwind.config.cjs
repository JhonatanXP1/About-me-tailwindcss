// tailwind.config.cjs
module.exports = {
  content: ["./public/**/*.html"], // dónde buscar clases
  theme: {
    extend: {
      colors: {
        'fondo-oscuro': '#1d1d1d'
      },
      fontFamily: { 'roboto-mono': ['"Roboto Mono"', 'monospace'] }
    },
  },
  plugins: [],
};