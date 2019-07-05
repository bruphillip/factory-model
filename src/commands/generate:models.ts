import { GluegunToolbox, GluegunFilesystem, GluegunParameters } from 'gluegun'
import { resolve, relative, basename } from 'path';
const directory = require('../directory');

module.exports = {
  name: 'generate:models',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, print, parameters, template } = toolbox;

    const config = checkIfThereisAnyDirectoryAndRequireIt(filesystem);

    if(!config) {
      return print.error('There aren\'t any config file in your directory :(');
    }

    try {
      validation(config, parameters);

      const modelName = `${parameters.first}.js`;
      await template.generate({
        template: 'model.js.ejs',
        target: resolve(config.model , modelName),
        props: {name: parameters.first}
      });

      const controllerName = `${parameters.first}Controller.js`;
      const controllerToModel = relative(config.controller, resolve(config.model, modelName.split('.')[0]));
      await template.generate({
        template: 'controller.js.ejs',
        target:resolve(config.controller, controllerName) ,
        props: {
          name: parameters.first,
          path: controllerToModel
        }
      });


      const imports = importToRoutes(config,parameters);
      updateRoutesPath(filesystem, config, imports);

      print.success('Everthing goes okay');
    } catch (err) {
      return print.error('Unfortunately an error happen :( ' + err);

    }


  }
}

function importToRoutes(config: any, parameters: GluegunParameters): string {
  const routeToController = relative(basename(config.route), resolve(config.controller + `/${parameters.first}Controller`));
  const [controller, ] = `${parameters.first}Controller.js`.split('.');
  const routeName = parameters.first.toLowerCase();
  return  `
/*
import ${controller} from '${routeToController}';

routes.get('/${routeName}', ${controller}.index);
routes.post('/${routeName}', ${controller}.store);
routes.put('/${routeName}/:id', ${controller}.update);
routes.delete('/${routeName}/:id', ${controller}.delete);
*/
  `;
}

function updateRoutesPath(filesystem: GluegunFilesystem, config: any, toImport: string): void {
  filesystem.append(config.route, toImport);
}

function checkIfThereisAnyDirectoryAndRequireIt({ exists, path }: GluegunFilesystem): any {
  for (const name of directory.name) {
    if(exists(`${path()}/${name}`)) {
      return require(`${path()}/${name}`);
    }
  }
  return false;
}

function validation(config: any, parameters: GluegunParameters): void | Error {
  if(!config.controller) {
    throw new Error('undefined config: controller');
  }
  if(!config.model) {
    throw new Error('undefined config: models');
  }
  if(!config.route) {
    throw new Error('undefined config: routes');
  }
  if(!parameters.first) {
    throw new Error('undefined parameters');
  }

  return null;
}