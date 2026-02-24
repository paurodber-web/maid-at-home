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

        // Target the h2 rule inside the unified mobile responsive fixes
        // We will change h2 { font-size: 2.8rem !important; ... } to use clamp(2rem, 4vw, 2.5rem) instead
        content = content.replace(
            /h2\s*\{\s*font-size:\s*2\.8rem\s*!important;\s*line-height:\s*1\.2\s*!important;\s*text-align:\s*center\s*!important;\s*\}/,
            'h2 { font-size: clamp(1.8rem, 4vw, 2.4rem) !important; line-height: 1.2 !important; text-align: center !important; }'
        );

        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed H2 font size in " + file);
    }
}

run();
