// Copy .htaccess file from public to out folder after build
const fs = require('fs');
const path = require('path');

const publicHtaccess = path.join(__dirname, '..', 'public', '.htaccess');
const outHtaccess = path.join(__dirname, '..', 'out', '.htaccess');
const outNextHtaccess = path.join(__dirname, '..', 'out', '_next', '.htaccess');
const outNextDir = path.join(__dirname, '..', 'out', '_next');

// Copy root .htaccess
if (fs.existsSync(publicHtaccess)) {
  fs.copyFileSync(publicHtaccess, outHtaccess);
  console.log('✅ Copied .htaccess to out folder');
} else {
  console.warn('⚠️  public/.htaccess not found');
}

// Create .htaccess in _next folder to fix 403 Forbidden errors
if (fs.existsSync(outNextDir)) {
  const nextHtaccessContent = `# Allow access to _next folder files
Options -Indexes +FollowSymLinks
Require all granted
`;
  fs.writeFileSync(outNextHtaccess, nextHtaccessContent);
  console.log('✅ Created .htaccess in _next folder');
} else {
  console.warn('⚠️  out/_next folder not found');
}
