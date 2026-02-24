const fs = require('fs');

const targetFiles = [
    'about.html',
    'booking.html',
    'contact.html',
    'faqs.html',
    'header&footer.html',
    'pricing.html',
    'privacy-policy.html',
    'suburb_template.html',
    'terms&conditions.html'
];

const newDesktop = `        .site-header {
            position: absolute;
            top: 40px;
            left: 40px;
            right: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.05);
            /* Overlay muy sutil */
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 14px 32px;
            z-index: 2500;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .site-header.is-sticky {
            position: fixed;
            top: 16px;
            left: 16px;
            right: 16px;
            background: white;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .site-header.is-sticky .brand {
            color: #0F172A;
        }

        .site-header.is-sticky .photo-nav a {
            color: #4B5563;
        }

        .site-header.is-sticky .photo-nav a:not(.nav-cta):hover {
            background: rgba(0, 0, 0, 0.05);
            color: var(--primary);
        }

        .site-header.is-sticky .nav-cta {
            background: var(--primary) !important;
            color: white !important;
        }

        .site-header.hidden {
            transform: translateY(-100%) translateY(-40px);
            opacity: 0;
        }`;

const brokenSyntaxRegex = /\.site-header\s*\{[\s\S]*?\.site-header\.is-sticky\s*\{[\s\S]*?box-shadow:[^}]*\}\s*\.site-header\.is-sticky\s*\.?\s*brand/g;

const oldDesktopRegex = /\.site-header\s*\{[\s\S]*?\.site-header\.is-sticky\s*\{[\s\S]*?box-shadow:[^}]*\}\s*/g;

const perfectMobileHeader = `        @media(max-width:1100px) {
            .site-header {
                position: fixed !important;
                top: 16px !important;
                left: 16px !important;
                right: 16px !important;
                height: 64px !important;
                /* Fixed height to reserve space */
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                border-radius: 16px !important;
                padding: 0 24px !important;
                width: calc(100% - 32px) !important;
                margin: 0 !important;
                background: rgba(255, 255, 255, 0.05) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }

            .site-header.is-sticky {
                background: white !important;
                border: 1px solid rgba(0, 0, 0, 0.05) !important;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1) !important;
            }

            .site-header.is-sticky .brand {
                color: #0F172A !important;
            }

            .site-header.is-sticky .menu-toggle span {
                background: #0F172A !important;
            }

            .photo-nav {
                display: none
            }

            .menu-toggle {
                display: flex
            }`;


const perfectPanelBefore = `.panel::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(60, 60, 60, 0.4);
            z-index: 1;
        }`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Fix Desktop Overlay completely. We will find .site-header { ... until just before .brand { if there's no sticky, or we will just use a global replace for the generic pattern.

        // Let's find first occurence of ".site-header {" and replace everything up to ".brand {"
        const siteHeaderIdx = content.indexOf('.site-header {');
        let brandIdx = content.indexOf('        .brand {', siteHeaderIdx);
        if (brandIdx === -1) brandIdx = content.indexOf('\n        .brand', siteHeaderIdx);

        if (siteHeaderIdx !== -1 && brandIdx !== -1) {
            content = content.substring(0, siteHeaderIdx) + newDesktop + '\n\n' + content.substring(brandIdx);
        }

        // Replace Mobile Query if exists, if not, append before </style>
        const mediaQueryStart = content.indexOf('@media(max-width:1100px) {\n            .site-header {');
        if (mediaQueryStart !== -1) {
            // It has it. Need to replace it? 
            // It's probably easier to just find the end of the mobile block (where .menu-toggle ends)
            const menuToggleEnd = content.indexOf('display: flex\n            }', mediaQueryStart);
            if (menuToggleEnd !== -1) {
                content = content.substring(0, mediaQueryStart) + perfectMobileHeader + content.substring(menuToggleEnd + 28);
            }
        } else {
            // Append it! Wait, we should append it *inside* the style tag, near the end.
            const styleEnd = content.lastIndexOf('</style>');
            if (styleEnd !== -1) {
                content = content.substring(0, styleEnd) + '\\n' + perfectMobileHeader + '\n        }\n    ' + content.substring(styleEnd);
            }
        }

        // Replace panel before
        content = content.replace(/\.panel::before\s*\{[\s\S]*?z-index:\s*1;\s*\}/g, perfectPanelBefore);

        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed " + file);
    }
}

run();
