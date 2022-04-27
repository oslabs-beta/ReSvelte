module.exports = function (api) {
    api.cache(true);
    return {
      plugins: ['macros'],
      presets: [
            ['@babel/preset-env', {targets: {node: 'current'}}],
            '@babel/preset-typescript',
            ['@babel/preset-react', {runtime: 'automatic'}]
          ],
        };
  };

  