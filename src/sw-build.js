
const {injectManifest} = require('workbox-build');

const swSrc = 'src/sw-custom.js';
const swDest = 'build/sw.js';

injectManifest({
  swSrc,
  swDest,
  globDirectory: 'build',
  globPatterns: ['**/*.{js,css,html,png,svg}'],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 102,
  // Other configuration options...
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});