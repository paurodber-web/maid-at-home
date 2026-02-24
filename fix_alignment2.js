const fs = require('fs');

const targetFiles = [
    'about.html',
    'booking.html',
    'contact.html',
    'faqs.html',
    'pricing.html',
    'privacy-policy.html',
    'suburb_template.html',
    'terms&conditions.html',
    'index.html',
    'header&footer.html'
];

const injectCSS = `
        /* --- GLOBAL MOBILE ALIGNMENT FIXES --- */
        @media (max-width: 1100px) {
            .history-content,
            .content-side,
            .header-col-right,
            .why-header-left,
            .t-header > div,
            .proof-header,
            .text-left {
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
            }
            
            .history-content p,
            .content-side p,
            .header-col-right p,
            .t-section-sub,
            .description,
            .why-header-right {
                text-align: center !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }

            /* Fixes specifically for contact section centering */
            .contact-info > .s-pill {
                margin: 0 auto 20px auto !important;
                display: flex !important;
                width: max-content;
            }
            .contact-info > h2,
            .contact-info > p.contact-description {
                text-align: center !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }
        }
`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Insert before the closing </style> tag if not already there
        if (!content.includes('/* --- GLOBAL MOBILE ALIGNMENT FIXES --- */')) {
            const splitTarget = '</style>';
            const splitIdx = content.indexOf(splitTarget);

            if (splitIdx !== -1) {
                content = content.substring(0, splitIdx) + injectCSS + '\n    ' + content.substring(splitIdx);
                fs.writeFileSync(file, content, 'utf8');
                console.log("Injected modified global mobile alignment CSS into " + file);
            }
        }
    }
}

run();
