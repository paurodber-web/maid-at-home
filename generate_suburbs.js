const fs = require('fs');
const path = require('path');

// Suburb list
const suburbs = [
    "Abbotsford", "Albert Park", "Altona", "Ascot Vale", "Balaclava", "Balwyn",
    "Balwyn North", "Box Hill", "Brighton", "Brunswick", "Brunswick East",
    "Brunswick West", "Burnley", "Camberwell", "Carlton", "Carlton North",
    "Coburg", "Coburg North", "Collingwood", "Docklands", "East Melbourne",
    "Elwood", "Essendon", "Fitzroy", "Fitzroy North", "Flemington",
    "Footscray", "Hampton", "Hawthorn", "Hawthorn East", "Keilor East",
    "Kensington", "Kew", "Kew East", "Maidstone", "Maribyrnong",
    "Melbourne CBD", "Middle Park", "Moonee Ponds", "Northcote",
    "North Melbourne", "Pascoe Vale", "Pascoe Vale South", "Prahran",
    "Preston", "Reservoir", "Richmond", "Ripponlea", "Seddon", "South Yarra",
    "Southbank", "St Kilda", "St Kilda East", "Sunshine", "Thornbury",
    "West Melbourne", "Windsor", "Yarraville"
];

// Content variations
const vars = {
    hero_title: [
        `Premium house<br>cleaning services<br><span>in {{suburb_name}}.</span>`,
        `Top-rated home<br>cleaning experts<br><span>for {{suburb_name}}.</span>`,
        `Impeccable house<br>cleaning & care<br><span>in {{suburb_name}}.</span>`,
        `Trusted local<br>house cleaners<br><span>serving {{suburb_name}}.</span>`,
        `Exceptional home<br>cleaning standard<br><span>in {{suburb_name}}.</span>`
    ],
    hero_desc: [
        `Professional house cleaning services in {{suburb_name}}. We take care of the chores so you can come home to a clean, relaxing space.`,
        `Experience the finest home cleaning in {{suburb_name}}. Our trusted professionals ensure every corner of your house shines flawlessly.`,
        `Save your valuable time. We provide reliable and premium cleaning to {{suburb_name}} residents who demand excellence.`,
        `Reclaim your weekends with our meticulous house cleaning available throughout {{suburb_name}}. Your sanctuary awaits.`,
        `From routine upkeep to detailed deep cleans, our {{suburb_name}} experts deliver a pristine home environment tailored to your lifestyle.`
    ],
    local_tag: [
        `Local Service`,
        `{{suburb_name}} Specialists`,
        `Area Experts`,
        `Dedicated Team`,
        `Your Local Cleaners`
    ],
    local_desc: [
        `Our local team is dedicated to providing a reliable, thorough clean every time. Enjoy a spotless home and more free time to do what you love in {{suburb_name}}.`,
        `We proudly serve the {{suburb_name}} community with top-tier housekeeping. Expect absolute consistency and a refreshing clean, designed around your schedule.`,
        `Living in {{suburb_name}} is busy enough. Let our specialized local cleaning crew handle your home\'s maintenance with unmatched care and efficiency.`,
        `Your home deserves the best care. We deploy highly trained local professionals to ensure {{suburb_name}} properties remain pristine all year long.`,
        `For the residents of {{suburb_name}}, we bring a superior standard of clean. A dependable local service that respects your home and family.`
    ],
    card_1_title: [
        `Elite local teams`,
        `Vetted Professionals`,
        `Trustworthy Staff`,
        `Premium Cleaners`,
        `Dedicated Crew`
    ],
    card_1_desc: [
        `Hospitality-trained professionals vetted for {{suburb_name}}. We bring elite standards and local reliability to every home we touch.`,
        `Every member of our {{suburb_name}} team is background checked, fully insured, and extensively trained to respect your space.`,
        `We hire only the top percentile of housekeeping talent in the {{suburb_name}} area, ensuring peace of mind every visit.`,
        `Our highly experienced cleaners treat your {{suburb_name}} home with the utmost discretion and professionalism at all times.`,
        `Your security and comfort come first. We send only carefully selected {{suburb_name}} experts to maintain your household.`
    ],
    card_2_title: [
        `White glove precision`,
        `Exceptional Detail`,
        `Immaculate Results`,
        `Flawless Execution`,
        `Detailed Focus`
    ],
    card_2_desc: [
        `We cultivate pristine environments in {{suburb_name}}, ensuring every surface is polished and meticulously staged.`,
        `No corner is overlooked. Our detailed checklists guarantee a consistently high-quality finish for your {{suburb_name}} property.`,
        `From baseboards to benchtops, our precise approach means your {{suburb_name}} house looks and feels fresh every single time.`,
        `We go beyond the surface. Enjoy a thoroughly sanitized, perfectly arranged home right here in {{suburb_name}}.`,
        `Our eye for detail sets us apart in {{suburb_name}}. We leave your home not just clean, but beautifully presented.`
    ],
    card_3_title: [
        `Satisfaction guarantee`,
        `100% Peace of Mind`,
        `Risk-Free Booking`,
        `Our Quality Promise`,
        `Guaranteed Results`
    ],
    card_3_desc: [
        `Not 100% satisfied with your clean in {{suburb_name}}? We will return and redo it for free. That is our satisfaction promise.`,
        `We stand by our work in {{suburb_name}}. If any aspect of the service falls short, let us know and we\'ll make it right immediately.`,
        `Your happiness is our priority. We are committed to leaving {{suburb_name}} customers completely satisfied after every clean.`,
        `With our ironclad guarantee for all {{suburb_name}} bookings, you can trust us to deliver exceptional housekeeping without the stress.`,
        `Expect perfection. If we miss anything in your {{suburb_name}} residence, our team will proactively return to solve it at no extra cost.`
    ],
    gray_title: [
        `The best house cleaning in {{suburb_name}}`,
        `Why {{suburb_name}} chooses us`,
        `Elevating home cleaning in {{suburb_name}}`,
        `Premium cleaning standards for {{suburb_name}}`,
        `Unmatched housekeeping in {{suburb_name}}`
    ],
    gray_desc: [
        `At Maid At Home, we believe {{suburb_name}} residents deserve the absolute best. Our professional cleaning specialists go through rigorous screening and training to ensure they meet our elite housekeeping standards.`,
        `We bring a refined layer of care to homes across {{suburb_name}}. By combining top-tier products with expert techniques, we transform any living space into a spotless, relaxing sanctuary.`,
        `Discover why families and professionals in {{suburb_name}} trust our tailored approach. We deliver consistently beautiful results and reliable scheduling so you never have to worry about chores again.`,
        `Cleaning isn't just a chore for us; it's a craft. We proudly offer {{suburb_name}} households a dependable, high-end cleaning service built on trust, transparency, and relentless attention to detail.`,
        `Experience the difference of a truly premium service right here in {{suburb_name}}. Our dedicated local cleaners work precisely to maintain the harmony and cleanliness of your property.`
    ],
    gray_list_1: [
        `Standard and detailed cleans`,
        `Regular weekly & fortnightly visits`,
        `Comprehensive maintenance cleaning`,
        `Consistent routine upkeep`,
        `Customized recurring cleans`
    ],
    gray_list_2: [
        `Specialized deep cleaning`,
        `Spring cleaning sessions`,
        `Intensive top-to-bottom scrub`,
        `Detailed seasonal refreshes`,
        `Deep corner-to-corner sanitization`
    ],
    gray_list_3: [
        `Move-In / move-out services`,
        `End of lease cleaning`,
        `Pre-sale property staging cleans`,
        `New home preparation`,
        `Thorough handover cleans`
    ],
    cta_button_text: [
        `Book Your {{suburb_name}} Clean`,
        `Get Your Clean in {{suburb_name}}`,
        `Secure Your Booking`,
        `Book Local Service`,
        `Schedule Your Clean`
    ]
};

// Function to generate a random index based on a string seed (so each suburb always gets the same variation, consistent over builds)
function hash(str, max) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum % max;
}

try {
    const template = fs.readFileSync('suburb_template_dynamic.html', 'utf8');

    // Create suburbs directory if it doesn't exist
    if (!fs.existsSync('./suburbs')) {
        fs.mkdirSync('./suburbs');
    }

    suburbs.forEach(suburb => {
        let output = template;

        // For each variable key, pick a variation based on a hash of suburb name + key
        Object.keys(vars).forEach(key => {
            const arr = vars[key];
            const index = hash(suburb + key, arr.length);
            let chosenVal = arr[index];

            // Render the suburb name inside the chosen copy
            chosenVal = chosenVal.replace(/\{\{suburb_name\}\}/g, suburb);

            // Replace the key in the template
            output = output.replace(new RegExp('\{\{' + key + '\}\}', 'g'), chosenVal);
        });

        // Finally, replace any remaining {{suburb_name}} (like in the HTML title or header)
        output = output.replace(/\{\{suburb_name\}\}/g, suburb);

        const filename = suburb.toLowerCase().replace(/\s+/g, '-') + '.html';
        const filepath = path.join('./suburbs', filename);

        fs.writeFileSync(filepath, output);
        console.log('Generated ' + filename);
    });

    console.log('Successfully updated suburbs with dynamic, varied content!');

} catch (e) {
    console.error(e);
}
