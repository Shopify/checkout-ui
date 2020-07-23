import * as path from 'path';

import {createPackage, Runtime} from '@sewing-kit/config';
import {createProjectTestPlugin} from '@sewing-kit/plugins';
import {quiltPackage, quiltWorkspace} from '@quilted/sewing-kit-plugins';
import type {} from '@sewing-kit/plugin-jest';
import {buildFlexibleOutputs} from '@sewing-kit/plugin-package-flexible-outputs';

export default createPackage((pkg) => {
  pkg.use(
    quiltWorkspace(),
    quiltPackage({react: 'preact', css: true}),
    buildFlexibleOutputs(),
    jestConfiguration(),
  );
  pkg.runtime(Runtime.Browser);
  pkg.entry({root: './src/index'});
});

const jestRoot = path.resolve(__dirname, './config/jest');

function jestConfiguration() {
  return createProjectTestPlugin('CheckoutUi.ConfigureJest', ({hooks}) => {
    hooks.configure.hook((configure) => {
      configure.jestEnvironment?.hook(() => 'jsdom');
      configure.jestTransforms?.hook((transforms) => ({
        ...transforms,
        '\\.svg$': path.join(jestRoot, 'transformers/svg.js'),
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|csv|ico)$': path.join(
          jestRoot,
          'transformers/file.js',
        ),
      }));
    });
  });
}
