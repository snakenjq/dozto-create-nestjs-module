#!/usr/bin/env node
import * as path from 'path';
import * as inquirer from 'inquirer';

import {
  replaceFolderNames,
  initModuleFolder,
  replaceModuleName,
  checkSrcFolder,
} from './util';

const SRC_PATH = checkSrcFolder(process.cwd());

const QUESTIONS = [
  {
    name: 'moduleName',
    type: 'input',
    message: 'Please input module name:',
    validate: (input: string) => {
      if (!input) return 'Sorry, please input module name';
      //TODO:validate name(special character, space)
      return true;
    },
  },
  {
    name: 'confirm',
    type: 'confirm',
    message: 'confirm to create module?',
  },
];

inquirer.prompt(QUESTIONS).then(async answers => {
  let { moduleName, confirm } = answers;
  if (!confirm) return;
  moduleName = moduleName.toLowerCase();
  const targetPath = path.join(SRC_PATH, `${moduleName}-module`);
  await initModuleFolder(targetPath);
  replaceFolderNames(targetPath, moduleName);
  replaceModuleName(targetPath, moduleName);
});
