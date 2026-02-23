const fs = require('fs');
const path = require('path');

const indexContent = fs.readFileSync('index.html', 'utf8');
const htmlRegex = /href="([^"]+\.html)"/g;
let match;
const links = [];

while ((match = htmlRegex.exec(indexContent)) !== null) {
    links.push(match[1]);
}

console.log('Links found in index.html:');
links.forEach(link => {
    const fullPath = path.resolve(__dirname, link);
    if (!fs.existsSync(fullPath)) {
        console.log(`[MISSING] ${link} -> ${fullPath}`);
    } else {
        console.log(`[EXISTS] ${link}`);
    }
});
