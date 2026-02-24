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

        // 1. In the UNIFIED block, change h1 font-size to clamp(2.3rem, 4.5vw, 4.5rem)
        content = content.replace(
            /h1\s*\{\s*font-size:\s*3\.2rem\s*!important;\s*line-height:\s*1\.1\s*!important;\s*text-align:\s*center\s*!important;\s*\}/,
            'h1 { font-size: clamp(2.3rem, 4.5vw, 4.5rem) !important; line-height: 1.05 !important; text-align: center !important; }'
        );

        // 2. The unified block added padding to .panel. We need to make sure .panel-content doesn't have overlapping 96px padding.
        // Let's add padding override for .panel-content to the UNIFIED block
        // First check if .panel-content padding fix is already there, if not, add it.
        if (!content.includes('/* Panel Content Overflow Fix */')) {
            const insertionPoint = '/* Badge/Pill Centering */';
            const paddingFix = `
            /* Panel Content Overflow Fix */
            .panel {
                padding-left: 0 !important; 
                padding-right: 0 !important;
            }
            .panel-content {
                padding-left: 24px !important;
                padding-right: 24px !important;
                max-width: 100vw;
                box-sizing: border-box;
            }
            `;
            content = content.replace(insertionPoint, paddingFix + '\\n            ' + insertionPoint);
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed H1 font and panel padding in " + file);
    }
}

run();
