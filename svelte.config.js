const { mdsvex } = require('mdsvex');
const { typescript, postcss } = require('svelte-preprocess');
module.exports = {
  extensions: ['.svelte', '.svx'],
  preprocess: [typescript(), postcss(), mdsvex()],
};
