const packageJson = require('../../package.json');

export const environment = {
  appName: 'Angular Ngrx Material Starter',
  envName: 'TEST',
  production: false,
  test: true,
  i18nPrefix: '',
  firebaseConfig: {
    apiKey: 'AIzaSyBwtKq2XQCF61Wj-4Ek3jTY1GH74PCo3Fk',
    authDomain: 'matstarter-46ec0.firebaseapp.com',
    databaseURL: 'https://matstarter-46ec0.firebaseio.com',
    projectId: 'matstarter-46ec0',
    storageBucket: 'matstarter-46ec0.appspot.com',
    messagingSenderId: '298452491866',
    appId: '1:298452491866:web:5dd35586b4352ba6'
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
