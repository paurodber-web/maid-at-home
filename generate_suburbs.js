const fs = require('fs');
const path = require('path');

function parseSuburbsInfo() {
    const content = fs.readFileSync('./suburbs/suburbs_info', 'utf8');
    // Split by the main suburb separator
    const suburbSections = content.split(/==================================================== SUBURB:/);
    const data = {};

    suburbSections.forEach(section => {
        if (!section.trim()) return;

        // Extract suburb name: handle potential newlines and equals
        const nameMatch = section.match(/(.*?)(?:\r?\n|=)/);
        let suburbName = nameMatch ? nameMatch[1].trim() : "";
        
        // Check if the name continues on the next line (for long names like East Melbourne)
        if (section.includes("Melbourne") && !suburbName.includes("Melbourne")) {
             const lines = section.split('\n');
             if (lines[1] && lines[1].includes("Melbourne")) {
                 suburbName += " " + lines[1].split('=')[0].trim();
             }
        }
        
        suburbName = suburbName.replace(/\s+/g, ' ').trim();
        const suburbData = { suburb_name: suburbName };

        // Regex mapping for standard fields
        const mappings = {
            hero_title: /\{hero_title\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            hero_description: /\{hero_description\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            standard_clean_description: /\{standard_clean_description\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            deep_clean_description: /\{deep_clean_description\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            move_clean_description: /\{move_clean_description\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            steam_clean_description: /\{steam_clean_description\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            trust_section_title: /\{trust_section_title\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            testimonial_intro: /\{testimonial_intro\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            process_section_title: /\{process_section_title\} ([\s\S]*?)(?=\{|$|Testimonial)/,
            guarantee_text: /\{guarantee_text\} ([\s\S]*?)(?=\{|$|Testimonial)/
        };

        Object.keys(mappings).forEach(key => {
            const match = section.match(mappings[key]);
            if (match) {
                suburbData[key] = match[1].replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").trim();
            }
        });

        // Testimonials parsing
        const testimonials = [];
        const testimonialMatches = section.matchAll(/Testimonial (\d+) Name: (.*?) Rating: (.*?) Text: ([\s\S]*?)(?=Testimonial \d+|$)/g);
        for (const match of testimonialMatches) {
            testimonials.push({
                name: match[2].split('–')[0].trim(),
                text: match[4].replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").trim()
            });
        }
        suburbData.testimonials = testimonials;

        if (suburbName) {
            data[suburbName] = suburbData;
        }
    });

    return data;
}

try {
    const suburbsData = parseSuburbsInfo();
    const template = fs.readFileSync('suburb_template_dynamic.html', 'utf8');

    if (!fs.existsSync('./suburbs')) { fs.mkdirSync('./suburbs'); }

    Object.keys(suburbsData).forEach(suburbName => {
        const data = suburbsData[suburbName];
        let output = template;

        // Replace placeholders
        output = output.replace(/{{suburb_name}}/g, data.suburb_name);
        output = output.replace(/{{hero_title}}/g, data.hero_title || "");
        output = output.replace(/{{hero_desc}}/g, data.hero_description || "");
        output = output.replace(/{{standard_desc}}/g, data.standard_clean_description || "");
        output = output.replace(/{{deep_desc}}/g, data.deep_clean_description || "");
        output = output.replace(/{{move_desc}}/g, data.move_clean_description || "");
        output = output.replace(/{{how_it_works_desc}}/g, data.guarantee_text || ""); // Using guarantee text for the desc as requested
        output = output.replace(/{{local_tag}}/g, `Verified in ${data.suburb_name}`);
        output = output.replace(/{{gray_desc}}/g, data.hero_description || "");

        // Testimonials
        if (data.testimonials) {
            data.testimonials.forEach((t, i) => {
                const idx = i + 1;
                output = output.replace(new RegExp(`{{t${idx}_quote}}`, 'g'), `"${t.text}"`);
                output = output.replace(new RegExp(`{{t${idx}_name}}`, 'g'), t.name);
            });
        }

        // Final cleanup for filename
        const filename = data.suburb_name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + '.html';
        const filepath = path.join('./suburbs', filename);
        
        fs.writeFileSync(filepath, output);
        console.log('Generated: ' + filename);
    });

    console.log('Successfully generated all suburb pages!');

} catch (e) {
    console.error('Error:', e);
}
