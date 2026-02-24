const fs = require('fs');

const targetFiles = [
    'about.html',
    'booking.html',
    'contact.html',
    'faqs.html',
    'pricing.html',
    'privacy-policy.html',
    'suburb_template.html',
    'terms&conditions.html'
];

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Fix the mismatched braces
        content = content.replace(/\.menu-toggle\s*\{\s*display:\s*flex\s*\}\s*\}\s*\}/g, '.menu-toggle { display: flex; } }');

        // Some files might have spaces or newlines instead
        content = content.replace(/\}\s*\}[\s\n]*\/\*\s*---\s*GLOBAL\s*RESPONSIVE\s*FIXES/g, '} /* --- GLOBAL RESPONSIVE FIXES');

        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed syntax error in " + file);
    }
}

run();
