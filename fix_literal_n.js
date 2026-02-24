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

        // Remove the literal \n strings that broke the CSS parser
        content = content.replace(/\\n\s*\/\*/g, '/*');

        // Wait, did I output a literal backslash n, or did I output an actual newline?
        // The regex /\\n\s*\/\*/g will match literally '\' then 'n' then whitespace then '/*'.
        // Let's also enforce left alignment explicitly on .info-grid and its children just in case.

        // Find .info-grid { width: 100% !important; align-self: flex-start !important; }
        // and add margin: 0 !important; just to be safe.
        content = content.replace(
            /\.info-grid\s*{\s*width:\s*100%\s*!important;\s*align-self:\s*flex-start\s*!important;\s*}/,
            '.info-grid { width: 100% !important; align-self: flex-start !important; margin: 0 !important; padding: 0 !important; }'
        );

        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed syntax and margins in " + file);
    }
}

run();
