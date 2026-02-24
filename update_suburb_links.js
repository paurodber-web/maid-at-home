const fs = require('fs');
const path = require('path');

const suburbsDir = path.join(__dirname, 'suburbs');
const files = fs.readdirSync(suburbsDir).filter(f => f.endsWith('.html'));

const suburbMap = {};
files.forEach(f => {
    // Convert filename back to "Display Name"
    // e.g. "abbotsford.html" -> "Abbotsford"
    // But wait, some suburbs have spaces like "Albert Park" -> "albert-park.html"
    // The spans in index.html already have the correct display names.
    // So we should do the reverse or just match.
    const name = f.replace('.html', '').replace(/-/g, ' ');
    suburbMap[name.toLowerCase()] = f;
});

function updateFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the area-list div
    const areaListRegex = /<div class="area-list">([\s\S]*?)<\/div>/;
    const match = content.match(areaListRegex);
    if (!match) {
        console.log(`No area-list found in ${filePath}`);
        return;
    }

    const originalSpans = match[1];
    // Match each span: <span>Name</span> or <span><a ...>Name</a></span>
    const spanRegex = /<span>([\s\S]*?)<\/span>/g;

    let newSpans = originalSpans.replace(spanRegex, (m, inner) => {
        // Remove existing tags if any to get the raw name
        const rawName = inner.replace(/<[^>]*>?/gm, '').trim();
        const key = rawName.toLowerCase();

        if (suburbMap[key]) {
            const link = `suburbs/${suburbMap[key]}`;
            // If the file is inside the suburbs directory, the link should be relative.
            // But this script updates index.html and header&footer.html (which are in the root).
            // So "suburbs/filename.html" is correct.
            // UNLESS it's the header&footer.html which might be used as a template?
            // Wait, suburb_template.html also has the footer.
            // generate_all_suburbs.js already handles path adjustment for links in the template.

            return `<span><a href="${link}" style="color: inherit; text-decoration: none;">${rawName}</a></span>`;
        } else {
            // As per the rule: "eliminando de él los archivos que ya no existen"
            // We return empty string or nothing if it's not found.
            // But maybe we should keep it as a span without a link? 
            // The rule says "eliminando de él los archivos que ya no existen", which is a bit ambiguous.
            // Does it mean remove the LINK or remove the SUBURB from the list?
            // Usually, if a service area page doesn't exist, we don't list it or don't link it.
            return ``; // Remove it
        }
    });

    // Clean up extra whitespace if needed
    newSpans = newSpans.replace(/\s+/g, ' ').trim();

    content = content.replace(areaListRegex, `<div class="area-list">${newSpans}</div>`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
}

updateFile('index.html');
updateFile('header&footer.html');
updateFile('suburb_template.html');
updateFile('about.html');
updateFile('pricing.html');
updateFile('contact.html');
updateFile('faqs.html');
updateFile('booking.html');
updateFile('terms&conditions.html');
updateFile('privacy-policy.html');
