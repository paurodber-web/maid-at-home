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

const unifiedCSS = `
        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */
        html, body {
            overflow-x: hidden !important;
            width: 100%;
        }

        @media (max-width: 1100px) {
            section, .history-section, .social-proof-section, .principles-section, 
            .final-cta-section, .t-section, .how-section, .guarantee-section, 
            .contact-section, .faq-section, .comparison-section, .pricing-hub, 
            .discount-showcase, .scope-section, .panel {
                padding-left: 24px !important;
                padding-right: 24px !important;
                max-width: 100vw;
                box-sizing: border-box;
            }

            .history-grid, .mirrored-grid-layout, .principles-grid, .proof-grid, 
            .cards-grid, .contact-grid, .principles-cards-grid, .bento-grid, 
            .value-grid, .scope-grid, .pricing-grid, .info-grid, .comparison-container,
            .discount-content, .scope-header-hub, .extras-grid, .footer-top {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
            }

            img, .history-image img, .service-image img, .bento-card img {
                max-width: 100% !important;
                height: auto !important;
            }

            /* Container Centering */
            .history-content, .content-side, .header-col-right, .why-header-left,
            .t-header, .proof-header, .comparison-header, .block-header, 
            .contact-info, .discount-main, .scope-header-left, .faq-header,
            .panel-content, .t-header > div, .why-header {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
                width: 100% !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }

            /* Badge/Pill Centering */
            .s-pill, .section-tag, .discount-badge {
                margin: 0 auto 20px auto !important;
                display: inline-flex !important;
                justify-content: center !important;
            }

            /* Paragraph Centering */
            .history-content p, .content-side p:not(.s-pill), .header-col-right p,
            .why-header-left p, .t-header p, .proof-header p, .comparison-header p, 
            .block-header p, .contact-info p.contact-description, .discount-main p, .scope-header-left p, 
            .t-section-sub, .description, .why-header-right {
                text-align: center !important;
                margin-left: auto !important;
                margin-right: auto !important;
                max-width: 100% !important;
            }

            /* Title Font Size Unification */
            h1 { 
                font-size: 3.2rem !important; 
                line-height: 1.1 !important; 
                text-align: center !important; 
            }
            h2 { 
                font-size: 2.8rem !important; 
                line-height: 1.2 !important; 
                text-align: center !important; 
            }

            /* CTA Cards Overflow Protection */
            .cta-card, .cta-box {
                padding: 60px 24px !important;
                border-radius: 32px !important;
                width: 100% !important;
                box-sizing: border-box;
            }

            /* Avoid centering actual cards data */
            .info-card, .info-text, .task-item {
                text-align: left !important;
                align-items: flex-start !important;
            }
            .info-text h4, .info-text p {
                text-align: left !important;
                margin: 0 !important;
            }
            
            /* Calculators and Dropdowns Overflow Protection */
            .option-calculator, .discount-card {
                padding: 24px 20px !important;
                box-sizing: border-box;
                width: 100%;
            }
        }
`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Target any variations of my previous responsive fixes and wipe them out cleanly.
        let idx1 = content.indexOf('/* --- GLOBAL RESPONSIVE FIXES --- */');
        if (idx1 !== -1) {
            let endIdx1 = content.indexOf('</style>', idx1);
            if (endIdx1 !== -1) {
                content = content.substring(0, idx1) + content.substring(endIdx1);
            }
        }

        let idx2 = content.indexOf('/* --- GLOBAL MOBILE ALIGNMENT FIXES --- */');
        if (idx2 !== -1) {
            let endIdx2 = content.indexOf('</style>', idx2);
            if (endIdx2 !== -1) {
                content = content.substring(0, idx2) + content.substring(endIdx2);
            }
        }

        let idx3 = content.indexOf('/* --- MOBILE PRICING SPECIFIC FIXES --- */');
        if (idx3 !== -1) {
            let endIdx3 = content.indexOf('</style>', idx3);
            if (endIdx3 !== -1) {
                content = content.substring(0, idx3) + content.substring(endIdx3);
            }
        }

        // Apply unified block
        if (!content.includes('/* --- UNIFIED MOBILE RESPONSIVE FIXES --- */')) {
            const styleEnd = content.lastIndexOf('</style>');
            if (styleEnd !== -1) {
                content = content.substring(0, styleEnd) + unifiedCSS + '\\n    ' + content.substring(styleEnd);
                fs.writeFileSync(file, content, 'utf8');
                console.log("Applied UNIFIED fixes to " + file);
            }
        }
    }
}

run();
