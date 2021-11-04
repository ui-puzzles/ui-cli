import { resolve } from 'path';
import { versions } from 'process';
import chalk from 'chalk';

// get local path
export const getDirPath = (relPath: string = '') => {
  return resolve(__dirname, relPath)
}

// get runtime path
export const getCwdPath = (relPath: string = '') => {
  return resolve(process.cwd(), relPath)
}

export function warning(msg: string) {
  if (!msg) return;

  console.log(chalk.yellow(`Warning: ${msg}`));
}

export function errorLog(msg: any) {
  if (!msg) return;

  console.log(chalk.red(`Error: ${msg}`));
}

export function successLog(msg: string) {
  if (!msg) return;

  console.log(chalk.green(`Success🧩: ${msg}`));
}

export function convertFirstLetterUpper(str = '') {
  if (!str || typeof str !== 'string') return;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isAvailableVersion(version: string) {
  if (versions.node < version) {
    warning(`The node.js version can not less than v${version}!`)
    return false;
  }

  return true;
}