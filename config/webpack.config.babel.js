import Config, { environment } from 'webpack-config';

environment.setAll({
  env: () => process.env.NODE_ENV,
});

const configPath = `./config/webpack.config.${ environment.get('env')() }.js`;
const config = new Config().extend(configPath);

console.log(`Using config ${ configPath }:`);
console.dir(config, {
  depth: 5,
  colors: true,
});

export default config;
