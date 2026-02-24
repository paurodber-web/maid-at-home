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

        // 1. Remove duplicated `<body> <html>` which I accidentally added to some files
        content = content.replace(/<\/body>\s*<\/html>\s*<\/body>\s*<\/html>/g, '</body>\n</html>');
        content = content.replace(/<\/body>\s*<\/body>/g, '</body>');

        // 2. Remove all `<!-- Mobile Menu Overlay --> ... </div>` blocks
        // The block is:
        // <!-- Mobile Menu Overlay -->
        // <div class="mobile-menu" id="mobileMenu">
        // ...
        // </div>
        // Let's remove them all using regex, then append exactly ONE right after </header>

        while (content.includes('<!-- Mobile Menu Overlay -->\n    <div class="mobile-menu" id="mobileMenu">')) {
            const startIdx = content.indexOf('<!-- Mobile Menu Overlay -->');
            if (startIdx !== -1) {
                const endBlockIdx = content.indexOf('</div>', startIdx + '<!-- Mobile Menu Overlay -->'.length);
                if (endBlockIdx !== -1) {
                    content = content.substring(0, startIdx) + content.substring(endBlockIdx + 6);
                } else {
                    break; // Safety
                }
            } else {
                break;
            }
        }

        // Let's do a more robust string replacement for the stray one in booking:
        content = content.replace(/<!-- Mobile Menu Overlay -->[\s\S]*?<div class="mobile-menu" id="mobileMenu">[\s\S]*?<\/div>/g, '');

        // Now append exactly 1 directly after </header>
        const headerEnd = content.indexOf('</header>');
        if (headerEnd !== -1) {
            const mobileHTML = `
    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobileMenu">
        <a href="about.html" onclick="toggleMenu()">About Us</a>
        <a href="pricing.html" onclick="toggleMenu()">Pricing</a>
        <a href="contact.html" onclick="toggleMenu()">Contact</a>
        <a href="faqs.html" onclick="toggleMenu()">FAQs</a>
        <a href="booking.html" class="nav-cta" onclick="toggleMenu()">Book Now</a>
    </div>`;
            content = content.substring(0, headerEnd + 9) + mobileHTML + content.substring(headerEnd + 9);
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log("Cleaned HTML in " + file);
    }
}

run();
