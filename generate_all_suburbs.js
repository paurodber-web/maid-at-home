
const fs = require('fs');
const path = require('path');

const infoFilePath = path.join(__dirname, 'suburbs', 'suburbs_text');
const templatePath = path.join(__dirname, 'suburb_template.html');
const outputDir = path.join(__dirname, 'suburbs');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

function generatePages() {
    const rawData = fs.readFileSync(infoFilePath, 'utf8').replace(/\r\n/g, '\n');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Split by suburb header
    const sections = rawData.split(/==================================================== SUBURB: /);

    for (let i = 1; i < sections.length; i++) {
        let section = sections[i];
        const suburbNameRow = section.split('\n')[0].split(' =')[0].trim();
        const suburbName = suburbNameRow;

        console.log(`Generating page for: ${suburbName}...`);

        let pageHtml = template;

        // Path adjustments for sub-directory
        // Assets in HTML
        pageHtml = pageHtml.replace(/(href|src)="(\.\/)?assets\//g, '$1="../assets/');
        // Assets in CSS url()
        pageHtml = pageHtml.replace(/url\(['"]?(\.\/)?assets\//g, (match) => {
            return match.includes('"') ? 'url("../assets/' : (match.includes("'") ? "url('../assets/" : "url(../assets/");
        });

        // Navigation links
        const rootLinks = ['index.html', 'about.html', 'pricing.html', 'contact.html', 'faqs.html', 'booking.html', 'terms&conditions.html'];
        rootLinks.forEach(link => {
            const re = new RegExp(`href="(\\.\\/)?${link}"`, 'g');
            pageHtml = pageHtml.replace(re, `href="../${link}"`);
        });

        const highlightColor = 'rgb(165, 180, 252)';
        const placeholders = {
            '{{suburb_name}}': `<span style="color: ${highlightColor};">${suburbName}</span>`,
            '{{SUBURB_NAME}}': suburbName
        };

        const escapedSuburb = suburbName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const subRegexPattern = `(\\b\\w+\\s+${escapedSuburb}|${escapedSuburb})`;
        const subRegex = new RegExp(subRegexPattern, 'gi');

        // Improved Tag Extraction (Multi-line)
        const tagsMapping = {
            '{hero_title}': '{{HERO_TITLE}}',
            '{hero_description}': '{{HERO_DESCRIPTION}}',
            '{standard_clean_description}': '{{STANDARD_DESCRIPTION}}',
            '{deep_clean_description}': '{{DEEP_DESCRIPTION}}',
            '{move_clean_description}': '{{MOVE_DESCRIPTION}}',
            '{steam_clean_description}': '{{STEAM_DESCRIPTION}}',
            '{trust_section_title}': '{{REDEFINING_SUBTITLE}}',
            '{testimonial_intro}': '{{TESTIMONIAL_INTRO}}',
            '{process_section_title}': '{{HOW_DESC}}',
            '{guarantee_text}': '{{GUARANTEE_TEXT}}'
        };

        // Extract all tags using a non-greedy catch-all until the next brace or section break
        for (const [tag, placeholder] of Object.entries(tagsMapping)) {
            const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Look for the tag and grab everything until the next tag starting with { on a new line
            const tagRegex = new RegExp(`${escapedTag}\\s*([\\s\\S]*?)(?=\\n\\s*\\{|\\n\\s*-------------------|\\n\\s*={5,}|$)`);
            const match = section.match(tagRegex);
            if (match) {
                let content = match[1].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();

                // ONLY wrap suburb name in blue span if it's the HERO TITLE
                if (placeholder === '{{HERO_TITLE}}') {
                    content = content.replace(subRegex, `<span style="color: ${highlightColor};">$1</span>`);
                }

                placeholders[placeholder] = content;
                console.log(`  - Found ${placeholder}: ${placeholders[placeholder].substring(0, 50)}...`);
            } else {
                console.warn(`  - Warning: Tag ${tag} not found in section for ${suburbName}`);
            }
        }

        // Improved Testimonial Extraction (Multi-line)
        // Extract the whole TESTIMONIAL CARDS block
        const tBlockMatch = section.match(/TESTIMONIAL CARDS[\s\S]*?-------------------([\s\S]*?)(?==|$)/);
        if (tBlockMatch) {
            const tBlock = tBlockMatch[1];
            for (let t = 1; t <= 5; t++) {
                // Match "Testimonial X Text: [QUOTE] Name: [NAME] Suburb: [SUBURB] Rating: [RATING]"
                const tRegex = new RegExp(`Testimonial ${t} Text:\\s*([\\s\\S]*?)\\s*Name:\\s*([\\s\\S]*?)\\s*Suburb:\\s*([\\s\\S]*?)\\s*Rating:\\s*`, 'm');
                const tMatch = tBlock.match(tRegex);
                if (tMatch) {
                    let quote = tMatch[1].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
                    // NO highlight in testimonials per user request

                    // Ensure it starts and ends with quotes (either smart or standard)
                    if (!quote.startsWith('“') && !quote.startsWith('"')) quote = `"${quote}`;
                    if (!quote.endsWith('”') && !quote.endsWith('"')) quote = `${quote}"`;

                    placeholders[`{{T_CARD_${t}_QUOTE}}`] = quote;
                    placeholders[`{{T_CARD_${t}_NAME}}`] = tMatch[2].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();

                    let subVal = tMatch[3].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
                    // NO highlight in testimonials per user request
                    placeholders[`{{T_CARD_${t}_SUBURB}}`] = subVal;
                }
            }
        }

        // Perform Replacements
        for (const [key, value] of Object.entries(placeholders)) {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(escapedKey, 'g');
            pageHtml = pageHtml.replace(re, value || '');
        }

        const fileName = suburbName.toLowerCase().replace(/\s+/g, '-') + '.html';
        const outputPath = path.join(outputDir, fileName);
        fs.writeFileSync(outputPath, pageHtml);
    }

    console.log('Success: All suburb pages generated with full multi-line text and fixed assets.');
}

generatePages();
