#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import { mkdir, readdir, copyFile, rename } from 'fs/promises';
import path from 'path';

import {
  warning,
  errorLog,
  successLog,
  convertFirstLetterUpper,
  isAvailableVersion,
} from '../utils';

const program = new Command();
const componentsDir = path.resolve(__dirname, '../src/components');
const templateDir = path.resolve(__dirname, './templates');
const templateRe = /^(template\.).*[mdx|tsx|]$/i;

program
  .command('create <componentName>')
  .description('create a template component quickly whit [componentName]')
  .action((componentName) => {
    console.log(componentName);
    // createTempComponent(componentName);
  });

program.parse(process.argv);

async function createTempComponent(cName: string) {
  const formatName = convertFirstLetterUpper(cName);

  if (!formatName) return;

  const newCompPath = path.join(componentsDir, formatName);

  // check the version of running node.js.
  if (!isAvailableVersion('10.10.0')) return;
  
  // check the path is existed
  if (fs.existsSync(newCompPath)) {
    warning(`The component named ${formatName} already exists!`);
    return;
  }

  try {
    await mkdir(newCompPath);
    // await cp(templateDir, newCompPath);
    const readTempDir = await readdir(templateDir);
    for await (const fileName of readTempDir) {
      await copyFile(`${templateDir}/${fileName}`, `${newCompPath}/${fileName}`);
      if (templateRe.test(fileName)) {
        const newFileName = fileName.replace(/(template)/i, `${cName}`)
        await rename(`${newCompPath}/${fileName}`, `${newCompPath}/${newFileName}`);
      }
    }
    successLog(`Added the ${formatName} component to the libs!`);
  } catch (error) {
    errorLog(error);
  }
}

