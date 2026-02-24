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

function extractBlock(text, startKeyword, endKeyword) {
    const startIdx = text.indexOf(startKeyword);
    if (startIdx === -1) return null;
    let endIdx = text.indexOf(endKeyword, startIdx);
    if (endIdx === -1) return null;
    endIdx += endKeyword.length;

    // find the closing brace after endKeyword
    endIdx = text.indexOf('}', endIdx);
    if (endIdx === -1) return null;
    return text.substring(startIdx, endIdx + 1);
}

function run() {
    const indexHtml = fs.readFileSync('index.html', 'utf8');

    // Desktop
    const newDesktop = extractBlock(indexHtml, '.site-header {', '.site-header.hidden {');
    // Mobile
    const newMobile = extractBlock(indexHtml, '@media(max-width:1100px) {', '.site-header.menu-open .menu-toggle span {');
    // wait, @media has a closing brace. Instead of exact extract, let's hardcode the start end for mobile.
    let mStart = indexHtml.indexOf('@media(max-width:1100px) {');
    let mEnd = indexHtml.indexOf('.photo-nav {', mStart); // inside the media query
    // wait, mobile block ends exactly before .panel { inside the media query? Or does the media query close at the end of index.html styles?

    // Actually, in index.html the mobile media query goes on to style .panel etc.
    // The user ONLY wants the header styles inside the mobile media query. But maybe they want the whole media query if it styles the panel? No, "mismo header... y que la hero section tiene el mismo overlay".
}

run();
