const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replaces = [
    // 1. Hero text (EXCEPT badge & trust chips which stay the same)
    [/Melbourne homes,<br><span>happy again\.<\/span>/g, '{{hero_title}}'],
    [/We started Maid At Home because we believe the standard of home cleaning should be higher\.[\s\S]*?Reliable professionals, consistent results, and a process built entirely around your life\./g, '{{hero_desc}}'],

    // 2. Services Detailed (Titles & Descriptions, keep Checklists)
    [/<h2>Standard Clean<\/h2>/g, '<h2>{{service_1_title}}</h2>'],
    [/<p>Our standard cleaning is perfect for maintaining a fresh, healthy environment on a regular[\s\S]*?basis\.[\s\S]*?We focus on high-traffic areas to ensure your home remains effortless\.<\/p>/g, '<p>{{service_1_desc}}</p>'],

    [/<h2>Deep Clean<\/h2>/g, '<h2>{{service_2_title}}</h2>'],
    [/<p>An intensive, detailed session designed to reach every corner\. Perfect for homes that haven't[\s\S]*?been professionally cleaned in over 3 months\.<\/p>/g, '<p>{{service_2_desc}}</p>'],

    [/<h2>Move In \/ Out<\/h2>/g, '<h2>{{service_3_title}}</h2>'],
    [/<p>Designed for transitioning\. We ensure the property is in immaculate condition for the new[\s\S]*?residents, covering all the essentials for a smooth handover and bond return\.<\/p>/g, '<p>{{service_3_desc}}</p>'],

    [/<h2>Steam Clean<\/h2>/g, '<h2>{{service_4_title}}</h2>'],
    [/<p>Advanced hot-water extraction for carpets and upholstery\. We remove allergens, bacteria, and[\s\S]*?the[\s\S]*?deepest stains using industrial-grade equipment\.<\/p>/g, '<p>{{service_4_desc}}</p>'],

    // 3. Why Choose Us
    // Title of section
    [/<h2>Redefining the standard <br><span style="color: var\(--primary\);">of home care\.<\/span><\/h2>/g, '<h2>{{why_h2}}</h2>'],
    [/We\s+believe in providing more than just a clean\s+home\. We provide peace of mind, reliability, and a level of detail that is simply unmatched\./g, '{{why_desc}}'],

    // Cards: KEEP tags and titles. Replace only Descriptions, Quotes, Authors.
    [/<p>Every cleaner in our network has passed background checks, reference verification, and a\s+two-stage interview\. They are covered by \$5M in public liability insurance\.<\/p>/g, '<p>{{why_card_1_desc}}</p>'],
    [/"I've never felt more secure with someone in my home\."/g, '{{why_card_1_quote}}'],
    [/— Sarah K\./g, '{{why_card_1_author}}'],

    [/<p>Our 60-point checklist ensures nothing is ever missed—from skirting boards to ceiling fans\.\s*<\/p>/g, '<p>{{why_card_2_desc}}</p>'],
    [/"The attention to detail is simply unmatched\."/g, '{{why_card_2_quote}}'],
    [/— Michael T\./g, '{{why_card_2_author}}'],

    [/<p>Our scheduling platform tracks every appointment in real-time\. If anything is ever disrupted,\s*we\s*proactively notify you and find a solution—before you even notice\.<\/p>/g, '<p>{{why_card_3_desc}}</p>'],
    [/"3 years and not a single missed clean\."/g, '{{why_card_3_quote}}'],
    [/— James R\./g, '{{why_card_3_author}}'],

    // 4. Testimonials
    [/<div class="s-pill-dot"><\/div>\+1,200 satisfied clients/g, '<div class="s-pill-dot"></div>{{t_tag}}'],
    [/<h2 class="t-section-h2">What our clients say about <span>trusting us\.<\/span><\/h2>/g, '<h2 class="t-section-h2">{{t_h2}}</h2>'],
    [/<p class="t-section-sub">Real reviews from real home owners\. No filters, just clean homes\.<\/p>/g, '<p class="t-section-sub">{{t_desc}}</p>'],

    // Testimonial cards (1-5)
    [/"I never thought hiring a cleaning service could change my quality[\s\S]*?of[\s\S]*?life so much\. Every week feels like moving into a new home\."/g, '{{t_card_1_quote}}'],
    [/Anna Martinez/g, '{{t_card_1_name}}'],
    [/Marketing Director · Seattle/g, '{{t_card_1_role}}'],
    [/<span class="t-chip">Weekly Clean<\/span>/g, '<span class="t-chip">{{t_card_1_chip}}</span>'],

    [/"We hired the service for our office and the change was immediate\.[\s\S]*?The[\s\S]*?team is silent, efficient, and absolutely trustworthy\."/g, '{{t_card_2_quote}}'],
    [/Elena Vidal/g, '{{t_card_2_name}}'],
    [/CEO · Vidal & Partners/g, '{{t_card_2_role}}'],
    [/<span class="t-chip">Corporate Clean<\/span>/g, '<span class="t-chip">{{t_card_2_chip}}</span>'],

    [/"The team arrived on time, worked with impeccable discretion, and[\s\S]*?the[\s\S]*?result exceeded all my expectations\. Top-tier professionalism\."/g, '{{t_card_3_quote}}'],
    [/Charles Ross/g, '{{t_card_3_name}}'],
    [/Lawyer · Chicago/g, '{{t_card_3_role}}'],
    [/<span class="t-chip">Maintenance<\/span>/g, '<span class="t-chip">{{t_card_3_chip}}</span>'],

    [/"We've been with them for 2 years and have never had to call to[\s\S]*?complain\. That, nowadays, is a luxury\."/g, '{{t_card_4_quote}}'],
    [/Laura Page/g, '{{t_card_4_name}}'],
    [/Architect · Austin/g, '{{t_card_4_role}}'],
    [/<span class="t-chip">Deep Clean<\/span>/g, '<span class="t-chip">{{t_card_4_chip}}</span>'],

    [/"From the first visit I was convinced\. The quote was transparent, no[\s\S]*?surprises, and the work was impeccable from start to finish\."/g, '{{t_card_5_quote}}'],
    [/Marc Towers/g, '{{t_card_5_name}}'],
    [/Entrepreneur · Boston/g, '{{t_card_5_role}}'],
    [/<span class="t-chip">Premium Clean<\/span>/g, '<span class="t-chip">{{t_card_5_chip}}</span>'],

    // 5. How It Works
    [/We've redesigned the home cleaning experience to be as simple as ordering a ride\. Logic,[\s\S]*?transparency, and quality are baked into every step\./g, '{{how_desc}}']
];

for (let [r_old, r_new] of replaces) {
    if (!r_old.test(html)) {
        console.warn('Regex not found:', r_old);
    }
    // reset regex lastIndex since we tested it
    r_old.lastIndex = 0;
    html = html.replace(r_old, r_new);
}

fs.writeFileSync('suburb_template.html', html);
console.log('Done!');
