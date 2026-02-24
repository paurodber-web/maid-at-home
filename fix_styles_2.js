const fs = require('fs');

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

    // Extract exact blocks by precise regex
    const desktopHeaderRx = /(\s*\.site-header\s*\{[\s\S]*?\s*\.site-header\.hidden\s*\{[\s\S]*?\n\s*\})/;
    const mobileHeaderRx = /(\s*@media\s*\(max-width:1100px\)\s*\{\s*\.site-header\s*\{[\s\S]*?\s*\.mobile-menu\s*\.nav-cta\s*\{[\s\S]*?\n\s*\})/;
    const overlayRx = /(\s*\.panel::before\s*\{[\s\S]*?\n\s*\})/;

    const desktopMatch = indexHtml.match(desktopHeaderRx);
    const mobileMatch = indexHtml.match(mobileHeaderRx);
    const overlayMatch = indexHtml.match(overlayRx);

    const newDesktop = desktopMatch ? desktopMatch[1] : '';
    const newMobile = mobileMatch ? mobileMatch[1] : '';
    const newOverlay = overlayMatch ? overlayMatch[1] : '';

    if (!newDesktop || !newMobile || !newOverlay) {
        console.log("Could not extract one of the CSS blocks from index.html.");
        return;
    }

    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        // Clean up the previously corrupted `.site-header.is-sticky \n\n .brand`
        content = content.replace(/\.site-header\.is-sticky\s*\n\s*\n\s*\.brand\s*\{/g, '.site-header.is-sticky {\n            position: fixed;\n            top: 16px;\n            left: 16px;\n            right: 16px;\n            background: white;\n            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\n            border: 1px solid rgba(0, 0, 0, 0.05);\n        }\n\n        .site-header.is-sticky .brand {\n');

        // Replace desktop header
        let localDesktopRx = /(\s*\.site-header\s*\{[\s\S]*?\s*\.site-header\.hidden\s*\{[\s\S]*?\n\s*\})/;
        if (localDesktopRx.test(content)) {
            content = content.replace(localDesktopRx, newDesktop);
            changed = true;
        }

        // Check if there is already a mobile .site-header block
        let localMobileRx = /(\s*@media\s*\(max-width:1100px\)\s*\{\s*\.site-header\s*\{[\s\S]*?\s*\.mobile-menu\s*\.nav-cta\s*\{[\s\S]*?\n\s*\})/;
        if (localMobileRx.test(content)) {
            content = content.replace(localMobileRx, newMobile);
            changed = true;
        } else {
            // Need to insert it! Right before </style>
            content = content.replace('</style>', newMobile + '\n    </style>');
            changed = true;
        }

        // Replace overlay
        let localOverlayRx = /(\s*\.panel::before\s*\{[\s\S]*?\n\s*\})/;
        if (localOverlayRx.test(content)) {
            content = content.replace(localOverlayRx, newOverlay);
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
}

run();
