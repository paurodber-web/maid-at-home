const fs = require('fs');

let html = fs.readFileSync('suburb_template.html', 'utf8');

// Hero section
html = html.replace(
    'Premium house<br>cleaning services<br><span>in {{suburb_name}}.</span>',
    '{{hero_title}}'
);
html = html.replace(
    /Professional house cleaning services in \{\{suburb_name\}\}\. We take care of\s*the chores so you can come home to a clean, relaxing space\./,
    '{{hero_desc}}'
);

// Local Service
html = html.replace(
    />Local Service</,
    '>{{local_tag}}<'
);
html = html.replace(
    /Our local team is dedicated to providing a reliable, thorough clean every time\. Enjoy a spotless home and more free time to do what you love in \{\{suburb_name\}\}\./,
    '{{local_desc}}'
);

// Card 1
html = html.replace(
    />Elite local teams</,
    '>{{card_1_title}}<'
);
html = html.replace(
    /Hospitality-trained professionals vetted for \{\{suburb_name\}\}\. We bring elite standards and local reliability to every home we touch\./,
    '{{card_1_desc}}'
);

// Card 2
html = html.replace(
    />White glove precision</,
    '>{{card_2_title}}<'
);
html = html.replace(
    /We cultivate pristine environments in \{\{suburb_name\}\}, ensuring every surface is polished and meticulously staged\./,
    '{{card_2_desc}}'
);

// Card 3
html = html.replace(
    />Satisfaction guarantee</,
    '>{{card_3_title}}<'
);
html = html.replace(
    /Not 100% satisfied with your clean in \{\{suburb_name\}\}\? We will return and redo it for free\. That is our satisfaction promise\./,
    '{{card_3_desc}}'
);

// Gray section
html = html.replace(
    />The best house cleaning in \{\{suburb_name\}\}</,
    '>{{gray_title}}<'
);
html = html.replace(
    /At Maid At Home, we believe \{\{suburb_name\}\} residents deserve the absolute best\. Our professional cleaning specialists go through rigorous screening and training to ensure they meet our elite housekeeping standards\./,
    '{{gray_desc}}'
);
html = html.replace(
    />Standard and detailed cleans</,
    '>{{gray_list_1}}<'
);
html = html.replace(
    />Specialized deep cleaning</,
    '>{{gray_list_2}}<'
);
html = html.replace(
    />Move-In \/ move-out services</,
    '>{{gray_list_3}}<'
);
html = html.replace(
    />Book Your \{\{suburb_name\}\} Clean</,
    '>{{cta_button_text}}<'
);

fs.writeFileSync('suburb_template_dynamic.html', html);
console.log('Template created');
