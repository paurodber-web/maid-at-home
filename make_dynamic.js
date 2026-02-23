const fs = require('fs');

let html = fs.readFileSync('suburb_template.html', 'utf8');

// Use simple regex replacement to avoid quotation mark escaping issues in strings
const replaces = [
    [/<span class="pill-aurora">Welcome to Maid At Home<\/span>/g, '<span class="pill-aurora">{{hero_tagline}}</span>'],
    [/Melbourne homes,<br><span>happy again.<\/span>/g, '{{hero_title}}'],
    [/We started Maid At Home because we believe the standard of home cleaning should be higher\.[\s\S]*?Reliable professionals, consistent results, and a process built entirely around your life\./g, '{{hero_desc}}'],

    // Services Detailed
    [/<h2>Standard Clean<\/h2>/g, '<h2>{{service_1_title}}</h2>'],
    [/<p>Our standard cleaning is perfect for maintaining a fresh, healthy environment on a regular[\s\S]*?basis\.[\s\S]*?We focus on high-traffic areas to ensure your home remains effortless\.<\/p>/g, '<p>{{service_1_desc}}</p>'],
    [/<h2>Deep Clean<\/h2>/g, '<h2>{{service_2_title}}</h2>'],
    [/<p>An intensive, detailed session designed to reach every corner\. Perfect for homes that haven't[\s\S]*?been professionally cleaned in over 3 months\.<\/p>/g, '<p>{{service_2_desc}}</p>'],
    [/<h2>Move In \/ Out<\/h2>/g, '<h2>{{service_3_title}}</h2>'],
    [/<p>Designed for transitioning\. We ensure the property is in immaculate condition for the new[\s\S]*?residents, covering all the essentials for a smooth handover and bond return\.<\/p>/g, '<p>{{service_3_desc}}</p>'],
    [/<h2>Steam Clean<\/h2>/g, '<h2>{{service_4_title}}</h2>'],
    [/<p>Advanced hot-water extraction for carpets and upholstery\. We remove allergens, bacteria, and[\s\S]*?the[\s\S]*?deepest stains using industrial-grade equipment\.<\/p>/g, '<p>{{service_4_desc}}</p>'],

    // Why Choose Us
    [/<div class="s-pill-dot"><\/div>The Difference/g, '<div class="s-pill-dot"></div>{{why_tag}}'],
    [/<h2>Redefining the standard <br><span style="color: var\(--primary\);">of home care\.<\/span><\/h2>/g, '<h2>{{why_h2}}</h2>'],
    [/We[\s\S]*?believe in providing more than just a clean[\s\S]*?home\. We provide peace of mind, reliability, and a level of detail that is simply unmatched\./g, '{{why_desc}}'],
    [/<div class="card-tag">🛡️ Security<\/div>/g, '<div class="card-tag">{{why_card_1_tag}}</div>'],
    [/<h3>Fully Vetted & Insured Professionals<\/h3>/g, '<h3>{{why_card_1_title}}</h3>'],
    [/<p>Every cleaner in our network has passed background checks, reference verification, and a[\s\S]*?two-stage interview\. They are covered by \$5M in public liability insurance\.<\/p>/g, '<p>{{why_card_1_desc}}</p>'],
    [/"I've never felt more secure with someone in my home\."/g, '{{why_card_1_quote}}'],
    [/— Sarah K\./g, '{{why_card_1_author}}'],
    [/<div class="card-tag">✨ Quality<\/div>/g, '<div class="card-tag">{{why_card_2_tag}}</div>'],
    [/<h3>A Systematic, Thorough Clean<\/h3>/g, '<h3>{{why_card_2_title}}</h3>'],
    [/<p>Our 60-point checklist ensures nothing is ever missed—from skirting boards to ceiling fans\.[\s\S]*?<\/p>/g, '<p>{{why_card_2_desc}}</p>'],
    [/"The attention to detail is simply unmatched\."/g, '{{why_card_2_quote}}'],
    [/— Michael T\./g, '{{why_card_2_author}}'],
    [/<div class="card-tag">🤝 Reliability<\/div>/g, '<div class="card-tag">{{why_card_3_tag}}</div>'],
    [/<h3>We Show Up\. Always\.<\/h3>/g, '<h3>{{why_card_3_title}}</h3>'],
    [/<p>Our scheduling platform tracks every appointment in real-time\. If anything is ever disrupted,[\s\S]*?we[\s\S]*?proactively notify you and find a solution—before you even notice\.<\/p>/g, '<p>{{why_card_3_desc}}</p>'],
    [/"3 years and not a single missed clean\."/g, '{{why_card_3_quote}}'],
    [/— James R\./g, '{{why_card_3_author}}'],

    // Testimonials
    [/<div class="s-pill-dot"><\/div>\+1,200 satisfied clients/g, '<div class="s-pill-dot"></div>{{t_tag}}'],
    [/<h2 class="t-section-h2">What our clients say about <span>trusting us\.<\/span><\/h2>/g, '<h2 class="t-section-h2">{{t_h2}}</h2>'],
    [/<p class="t-section-sub">Real reviews from real home owners\. No filters, just clean homes\.<\/p>/g, '<p class="t-section-sub">{{t_desc}}</p>'],
    [/"I never thought hiring a cleaning service could change my quality[\s\S]*?of[\s\S]*?life so much\. Every week feels like moving into a new home\."/g, '{{t_card_1_quote}}'],
    [/Anna Martinez/g, '{{t_card_1_name}}'],
    [/Marketing Director · Seattle/g, '{{t_card_1_role}}'],
    [/Weekly Clean/g, '{{t_card_1_chip}}'],
    [/"We hired the service for our office and the change was immediate\.[\s\S]*?The[\s\S]*?team is silent, efficient, and absolutely trustworthy\."/g, '{{t_card_2_quote}}'],
    [/Elena Vidal/g, '{{t_card_2_name}}'],
    [/CEO · Vidal & Partners/g, '{{t_card_2_role}}'],
    [/Corporate Clean/g, '{{t_card_2_chip}}'],
    [/"The team arrived on time, worked with impeccable discretion, and[\s\S]*?the[\s\S]*?result exceeded all my expectations\. Top-tier professionalism\."/g, '{{t_card_3_quote}}'],
    [/Charles Ross/g, '{{t_card_3_name}}'],
    [/Lawyer · Chicago/g, '{{t_card_3_role}}'],
    [/Maintenance/g, '{{t_card_3_chip}}'],
    [/"We've been with them for 2 years and have never had to call to[\s\S]*?complain\. That, nowadays, is a luxury\."/g, '{{t_card_4_quote}}'],
    [/Laura Page/g, '{{t_card_4_name}}'],
    [/Architect · Austin/g, '{{t_card_4_role}}'],
    [/Deep Clean/g, '{{t_card_4_chip}}'],
    [/"From the first visit I was convinced\. The quote was transparent, no[\s\S]*?surprises, and the work was impeccable from start to finish\."/g, '{{t_card_5_quote}}'],
    [/Marc Towers/g, '{{t_card_5_name}}'],
    [/Entrepreneur · Boston/g, '{{t_card_5_role}}'],
    [/Premium Clean/g, '{{t_card_5_chip}}'],

    // How It Works
    [/<h3>Select<\/h3>/g, '<h3>{{how_1_title}}</h3>'],
    [/<p[\s\S]*?>Choose the perfect[\s\S]*?service[\s\S]*?package for your home's unique needs\.<\/p>/g, '<p style="color: var(--text-sub); font-size: 0.9rem; line-height: 1.6;">{{how_1_desc}}</p>'],
    [/<h3>Schedule<\/h3>/g, '<h3>{{how_2_title}}</h3>'],
    [/<p[\s\S]*?>Pick a time that works[\s\S]*?for[\s\S]*?you\. We're available 7 days a week\.<\/p>/g, '<p style="color: var(--text-sub); font-size: 0.9rem; line-height: 1.6;">{{how_2_desc}}</p>'],
    [/<h3>Clean<\/h3>/g, '<h3>{{how_3_title}}</h3>'],
    [/<p[\s\S]*?>Sit back while our[\s\S]*?vetted[\s\S]*?pros transform your space\.<\/p>/g, '<p style="color: var(--text-sub); font-size: 0.9rem; line-height: 1.6;">{{how_3_desc}}</p>'],
    [/<h3>Relax<\/h3>/g, '<h3>{{how_4_title}}</h3>'],
    [/<p[\s\S]*?>Enjoy the peace of mind[\s\S]*?that[\s\S]*?comes with a spotless environment\.<\/p>/g, '<p style="color: var(--text-sub); font-size: 0.9rem; line-height: 1.6;">{{how_4_desc}}</p>'],
    [/A system built<br><span style="color: var\(--primary\);">around your life\.<\/span>/g, '{{how_h2}}'],
    [/We've redesigned the home cleaning experience to be as simple as ordering a ride\. Logic,[\s\S]*?transparency, and quality are baked into every step\./g, '{{how_desc}}'],

    // Guarantee
    [/✅ Risk Free/g, '{{guarantee_badge}}'],
    [/<h2>The Happiness Guarantee<\/h2>/g, '<h2>{{guarantee_h2}}</h2>'],
    [/We're confident you'll love your clean\. If you're not 100% satisfied, let us know within 24 hours[\s\S]*?and[\s\S]*?we'll come back to fix it for free\./g, '{{guarantee_desc}}']
];

for (let [r_old, r_new] of replaces) {
    html = html.replace(r_old, r_new);
}

fs.writeFileSync('suburb_template_dynamic.html', html);
console.log('Dynamic template updated!');
