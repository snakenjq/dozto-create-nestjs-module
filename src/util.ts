import * as fs from 'fs';
import * as fsx from 'fs-extra';
import * as path from 'path';
import * as replace from 'replace';
import * as CONFIG from './config.json';
import * as ora from 'ora';
import { Clone } from 'nodegit';

export const initModuleFolder = async (targetPath: string): Promise<void> => {
  const spinner = ora(
    `Initialize module template to Path: ${targetPath}`,
  ).start();
  try {
    await Clone.clone(CONFIG.template, targetPath);
    removeGitFiles(targetPath);
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    console.error(error);
    process.exit(1);
  }
  return;
};

export const replaceFolderNames = (
  targetPath: string,
  moduleName: string,
): void => {
  let files = [];
  if (fs.existsSync(targetPath)) {
    files = fs.readdirSync(targetPath);
    files.map((file, index) => {
      const curPath = path.join(targetPath, file);
      if (fs.statSync(curPath).isDirectory()) {
        rename(targetPath, curPath, moduleName);
        replaceFolderNames(curPath, moduleName);
      } else {
        rename(targetPath, curPath, moduleName);
      }
    });
  }
};

export const replaceModuleName = (
  targetPath: string,
  moduleName: string,
): void => {
  const moduleNameFirstUpper = nameToFirstUpperCase(moduleName);

  const spinner = ora('Replace module name').start();
  updateFile(targetPath, '__name__', moduleName);
  updateFile(targetPath, '__Name__', moduleNameFirstUpper);
  spinner.succeed();
};

export const removeFolder = (targetPath: string): void =>
  fsx.removeSync(targetPath);

export const removeGitFiles = (targetPath: string): void => {
  fsx.removeSync(path.join(targetPath, '.git'));
  fsx.removeSync(path.join(targetPath, '.gitignore'));
};

export const rename = (
  targetPath: string,
  curPath: string,
  moduleName: string,
): void => {
  const sliptPath = curPath.split(targetPath);
  if (sliptPath.length > 1 && sliptPath[1]) {
    const newName = sliptPath[1].replace(/__name__/g, moduleName);
    const renamePath = path.join(targetPath, newName);
    fs.renameSync(curPath, renamePath);
  }
};

export const checkSrcFolder = (targetPath: string): string => {
  const spinner = ora(`Check directory`).start();
  const packagePath = path.join(targetPath, 'package.json');
  if (!fs.existsSync(packagePath)) {
    spinner.fail();
    console.error('Path is not a root directory');
    process.exit(1);
  }
  spinner.succeed();
  return path.join(targetPath, 'src');
};

const updateFile = (
  filePath: string,
  targetContext: string,
  modifyContext?: string,
): boolean => {
  if (fs.existsSync(filePath)) {
    replace({
      regex: targetContext,
      replacement: modifyContext || '',
      paths: [filePath],
      recursive: true,
      silent: true,
    });
    return true;
  }
  return false;
};

const nameToFirstUpperCase = (name: string): string => {
  const nameChars = name.slice(1);
  const firstChar = name.slice(0, 1).toUpperCase();
  return `${firstChar}${nameChars}`;
};
