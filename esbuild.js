const esbuild = require('esbuild');

const watch = process.argv.includes('--watch');

async function build() {
  const context = await esbuild.context({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/turbowarp_studio.js',
    format: 'iife',
    globalName: 'OBSWebSocketExtensionBundle',
    banner: {
      js: '(function(Scratch) { "use strict"; if (!Scratch.extensions.unsandboxed) { throw new Error("OBS WebSocket extension must run unsandboxed"); }',
    },
    footer: {
      js: '})(Scratch);',
    },
    // We don't want to bundle Scratch itself, it's provided by the environment
    external: [], 
    logLevel: 'info',
  });

  if (watch) {
    await context.watch();
    console.log('Watching for changes...');
  } else {
    await context.rebuild();
    await context.dispose();
  }
}

build().catch(() => process.exit(1));
