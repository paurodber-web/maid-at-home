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
        /* --- GLOBAL RESPONSIVE FIXES --- */
        @media (max-width: 1100px) {
            section,
            .history-section,
            .social-proof-section,
            .principles-section,
            .final-cta-section,
            .t-section,
            .how-section,
            .guarantee-section,
            .contact-section,
            .faq-section {
                padding: 60px 24px !important;
            }

            .history-grid,
            .mirrored-grid-layout,
            .principles-grid,
            .proof-grid,
            .cards-grid,
            .contact-grid,
            .principles-cards-grid,
            .bento-grid,
            .value-grid,
            .scope-grid,
            .pricing-grid,
            .info-grid {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
            }

            .history-image img,
            .service-image img,
            .bento-card img {
                height: auto !important;
                max-height: 400px;
                width: 100% !important;
            }

            .history-content h2,
            .content-side h2,
            .header-col-right h2,
            .t-section-h2,
            .cta-card h2,
            .contact-info h2 {
                font-size: 2.5rem !important;
                line-height: 1.2 !important;
            }

            .cta-card {
                padding: 60px 24px !important;
            }

            .panel-content {
                padding: 120px 24px 40px !important;
            }

            .panel h1 {
                font-size: 3rem !important;
            }
        }
`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Insert before the closing </style> tag if not already there
        if (!content.includes('/* --- GLOBAL RESPONSIVE FIXES --- */')) {
            const splitTarget = '</style>';
            const splitIdx = content.indexOf(splitTarget);

            if (splitIdx !== -1) {
                content = content.substring(0, splitIdx) + injectCSS + '\n    ' + content.substring(splitIdx);
                fs.writeFileSync(file, content, 'utf8');
                console.log("Injected global responsive CSS into " + file);
            }
        }
    }
}

run();
