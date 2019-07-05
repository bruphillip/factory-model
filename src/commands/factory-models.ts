import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'factory-models',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    print.success('Welcome to Factory-Model =)');

    print.warning('to use this lib create an file as the example below');

    print.fancy(`
    module.exports = {
      model: path to model,
      controller: path to controller,
      route: path to route.js
    }
    `);
  }
}
