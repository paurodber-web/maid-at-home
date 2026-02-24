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

        // Target h1
        content = content.replace(
            /h1\s*\{\s*font-size:\s*clamp\([^\)]+\)\s*!important;\s*line-height:\s*1\.05\s*!important;\s*text-align:\s*center\s*!important;\s*\}/,
            'h1 { font-size: 2.4rem !important; line-height: 1.1 !important; text-align: center !important; }'
        );
        content = content.replace(
            /h1\s*\{\s*font-size:\s*3\.2rem\s*!important;\s*line-height:\s*1\.1\s*!important;\s*text-align:\s*center\s*!important;\s*\}/,
            'h1 { font-size: 2.4rem !important; line-height: 1.1 !important; text-align: center !important; }'
        );

        // Target h2
        content = content.replace(
            /h2\s*\{\s*font-size:\s*clamp\([^\)]+\)\s*!important;\s*line-height:\s*1\.2\s*!important;\s*text-align:\s*center\s*!important;\s*\}/,
            'h2 { font-size: 2rem !important; line-height: 1.2 !important; text-align: center !important; }'
        );
        content = content.replace(
            /h2\s*\{\s*font-size:\s*2\.8rem\s*!important;\s*line-height:\s*1\.2\s*!important;\s*text-align:\s*center\s*!important;\s*\}/,
            'h2 { font-size: 2rem !important; line-height: 1.2 !important; text-align: center !important; }'
        );

        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed H1/H2 font sizes in " + file);
    }
}

run();
