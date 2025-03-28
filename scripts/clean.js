const { execSync } = require('child_process');

const CLEANUP_FOLDERS = [
  'apps/webapp/.angular',
  'apps/webapp/dist',
  'apps/webapp/node_modules',
  'packages/**/node_modules',
  'packages/**/dist',
  'node_modules',
];

function clean() {
  console.log('🧹 Starting cleanup...');

  CLEANUP_FOLDERS.forEach((folder) => {
    console.log(`Cleaning ${folder}...`);
    execSync(`rimraf -g "${folder}"`, { stdio: 'inherit' });
  });

  console.log('✨ Cleanup completed!');
}

clean();
