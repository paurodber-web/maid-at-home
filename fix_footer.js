const fs = require('fs');

const targetFiles = [
    'about.html',
    'booking.html',
    'contact.html',
    'faqs.html',
    'pricing.html',
    'privacy-policy.html',
    'suburb_template.html',
    'terms&conditions.html'
];

const mediaQueries = `
        @media(max-width:1024px) {
            .footer-top {
                grid-template-columns: 1fr 1fr;
                gap: 40px
            }
        }

        @media(max-width:768px) {
            .site-footer {
                padding: 76px 24px 48px;
            }

            .footer-top {
                grid-template-columns: 1fr;
                text-align: left;
                gap: 40px
            }

            .footer-brand p,
            .newsletter-form {
                margin-left: 0;
                margin-right: 0
            }

            .social-links,
            .hours-list,
            .hour-row {
                justify-content: flex-start;
                margin-left: 0;
                margin-right: 0
            }

            .footer-bottom {
                flex-direction: column;
                gap: 16px;
                text-align: left
            }
        }
`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Only insert if it's not already there
        if (!content.includes('padding: 76px 24px 48px;')) {
            const splitTarget = '.menu-toggle {';
            const splitIdx = content.lastIndexOf(splitTarget);

            if (splitIdx !== -1) {
                content = content.substring(0, splitIdx) + mediaQueries + '\n        ' + content.substring(splitIdx);
                fs.writeFileSync(file, content, 'utf8');
                console.log("Injected media queries into " + file);
            }
        }
    }
}

run();
