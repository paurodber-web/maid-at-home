const fs = require('fs');
const path = require('path');

const targetFiles = [
    'about.html',
    'booking.html',
    'contact.html',
    'faqs.html',
    'header&footer.html',
    'pricing.html',
    'privacy-policy.html',
    'suburb_template.html',
    'terms&conditions.html'
];

function run() {
    const indexHtml = fs.readFileSync('index.html', 'utf8');

    // Extract desktop header block
    const desktopHeaderRegex = /(\s*\.site-header\s*\{[\s\S]*?)(?=\s*\.brand\s*\{)/;
    const desktopHeaderMatch = indexHtml.match(desktopHeaderRegex);
    if (!desktopHeaderMatch) { console.log('Desktop header not found'); return; }
    const desktopHeader = desktopHeaderMatch[1];

    // Extract mobile header block
    const mobileHeaderRegex = /(\s*@media\s*\(max-width:1100px\)\s*\{\s*\.site-header\s*\{[\s\S]*?)(?=\s*\.photo-nav\s*\{)/;
    const mobileHeaderMatch = indexHtml.match(mobileHeaderRegex);
    if (!mobileHeaderMatch) { console.log('Mobile header not found'); return; }
    const mobileHeader = mobileHeaderMatch[1];

    // Extract overlay block
    const overlayRegex = /(\s*\.panel::before\s*\{[\s\S]*?)(?=\s*\.panel-content\s*\{)/;
    const overlayMatch = indexHtml.match(overlayRegex);
    if (!overlayMatch) { console.log('Overlay not found in index'); return; }
    const overlay = overlayMatch[1];

    console.log("Found pieces!");

    for (const file of targetFiles) {
        if (!fs.existsSync(file)) {
            console.log(`Skipping ${file}`);
            continue;
        }
        let content = fs.readFileSync(file, 'utf8');

        let changed = false;

        // replace desktop header
        if (desktopHeaderRegex.test(content)) {
            content = content.replace(desktopHeaderRegex, desktopHeader);
            changed = true;
        } else {
            console.log(`Desktop header missing in ${file}`);
        }

        // replace mobile header (only if media query exists)
        if (mobileHeaderRegex.test(content)) {
            content = content.replace(mobileHeaderRegex, mobileHeader);
            changed = true;
        } else {
            console.log(`Mobile header missing or different structure in ${file}`);
            // Let's try to match @media(max-width: 768px) and similar if it exists
        }

        // replace overlay
        if (overlayRegex.test(content)) {
            content = content.replace(overlayRegex, overlay);
            changed = true;
        } else {
            console.log(`Overlay missing in ${file}`);
        }

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
}

run();
