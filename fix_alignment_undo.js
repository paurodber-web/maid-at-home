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

        // Target string from fix_alignment.js
        const startMarker = '/* --- GLOBAL MOBILE ALIGNMENT FIXES --- */';
        const startIdx = content.indexOf(startMarker);

        if (startIdx !== -1) {
            // Find the end of the media query block
            // It ends with standard closing braces. 
            // In fix_alignment.js, the block was inserted right before `}</style>` or similar?
            const endIdx = content.indexOf('</style>', startIdx);
            if (endIdx !== -1) {
                // Remove everything from startIdx up to endIdx
                content = content.substring(0, startIdx) + content.substring(endIdx);
                fs.writeFileSync(file, content, 'utf8');
                console.log("Removed forced centering from " + file);
            }
        }
    }
}

run();
