// Copy .htaccess file from public to out folder after build
const fs = require('fs');
const path = require('path');

const publicHtaccess = path.join(__dirname, '..', 'public', '.htaccess');
const outHtaccess = path.join(__dirname, '..', 'out', '.htaccess');

if (fs.existsSync(publicHtaccess)) {
  fs.copyFileSync(publicHtaccess, outHtaccess);
  console.log('✅ Copied .htaccess to out folder');
} else {
  console.warn('⚠️  public/.htaccess not found');
}

