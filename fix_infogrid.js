const fs = require('fs');

const targetFiles = [
    'about.html',
    'booking.html',
    'contact.html',
    'faqs.html',
    'pricing.html',
    'privacy-policy.html',
    'suburb_template.html',
    'terms&conditions.html',
    'index.html',
    'header&footer.html'
];

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Add explicit left alignment to .info-grid
        if (!content.includes('/* Info Grid Left Align Fix */')) {
            const insertionPoint = '/* Badge/Pill Centering */';
            const alignFix = `
            /* Info Grid Left Align Fix */
            .info-grid {
                width: 100% !important;
                align-self: flex-start !important;
            }
            `;
            content = content.replace(insertionPoint, alignFix + '\\n            ' + insertionPoint);
            fs.writeFileSync(file, content, 'utf8');
            console.log("Fixed info grid left align in " + file);
        }
    }
}

run();
