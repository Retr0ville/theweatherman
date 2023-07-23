// module.exports = {
//   presets: [
//     ['@babel/preset-env', {targets: {node: 'current'}}],
//     '@babel/preset-typescript',
//   ],
// };

module.exports = function(api) {
  api.cache(true)

  const presets =  [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ]
  const plugins = []

  if (process.env.NODE_ENV === "test") {    
    plugins.push("require-context-hook")    
  }

  return {
    presets,
    plugins
  }
}