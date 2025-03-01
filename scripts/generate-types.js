// scripts/generate-types.js

import { exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const requiredEnvVars = [
  'CONTENTFUL_SPACE_ID',
  'CONTENTFUL_ENVIRONMENT',
  'CONTENTFUL_MANAGEMENT_TOKEN',
];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const generateTypesCommand = `npx cf-content-types-generator --out src/types --spaceId ${process.env.CONTENTFUL_SPACE_ID} --environment ${process.env.CONTENTFUL_ENVIRONMENT} --token ${process.env.CONTENTFUL_MANAGEMENT_TOKEN} --v10`;

exec(generateTypesCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating types: ${error.message}`);
    console.error(stderr);
    return;
  }
  console.log(`Type generation completed:\n${stdout}`);
});
