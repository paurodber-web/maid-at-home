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

const mobileHTML = `    <header class="site-header" id="siteHeader">
        <a href="index.html" class="brand">Maid <span>At Home</span></a>
        <nav class="photo-nav">
            <a href="about.html">About Us</a>
            <a href="pricing.html">Pricing</a>
            <a href="contact.html">Contact</a>
            <a href="faqs.html">FAQs</a>
            <a href="booking.html" class="nav-cta">Book Now</a>
        </nav>
        <div class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobileMenu">
        <a href="about.html" onclick="toggleMenu()">About Us</a>
        <a href="pricing.html" onclick="toggleMenu()">Pricing</a>
        <a href="contact.html" onclick="toggleMenu()">Contact</a>
        <a href="faqs.html" onclick="toggleMenu()">FAQs</a>
        <a href="booking.html" class="nav-cta" onclick="toggleMenu()">Book Now</a>
    </div>`;

const mobileMenuCSS = `
        .menu-toggle {
            display: none;
            flex-direction: column;
            gap: 6px;
            cursor: pointer;
            z-index: 3000
        }

        .menu-toggle span {
            width: 30px;
            height: 2px;
            background: white;
            transition: var(--transition)
        }

        .site-header.menu-open .menu-toggle span:nth-child(1) {
            transform: translateY(8px) rotate(45deg)
        }

        .site-header.menu-open .menu-toggle span:nth-child(2) {
            opacity: 0
        }

        .site-header.menu-open .menu-toggle span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg)
        }

        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: white;
            z-index: 2000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(-20px)
        }

        .mobile-menu.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0)
        }

        .mobile-menu a {
            font-size: 1.75rem;
            font-weight: 700;
            color: #0F172A;
            text-decoration: none;
            transition: var(--transition);
            opacity: 0;
            transform: translateY(20px)
        }

        .mobile-menu.active a {
            opacity: 1;
            transform: translateY(0)
        }

        .mobile-menu a:nth-child(1) {
            transition-delay: 0.1s
        }

        .mobile-menu a:nth-child(2) {
            transition-delay: 0.2s
        }

        .mobile-menu a:nth-child(3) {
            transition-delay: 0.3s
        }

        .mobile-menu a:nth-child(4) {
            transition-delay: 0.4s
        }

        .mobile-menu a:hover {
            color: var(--primary);
            transform: scale(1.1)
        }

        .mobile-menu .nav-cta {
            background: var(--primary) !important;
            color: white !important;
            padding: 16px 48px !important;
            border-radius: 100px !important;
            margin-top: 10px;
            font-size: 1.2rem
        }

        .site-header.menu-open {
            background: white !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
            border: none !important;
            box-shadow: none !important
        }

        .site-header.menu-open .brand {
            color: #0F172A !important;
        }

        .site-header.menu-open .menu-toggle span {
            background: #0F172A !important;
        }

        @media(max-width:1100px) {
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
            }
        }`;


const javascriptMobileMenu = `
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const siteHeaderEl = document.getElementById('siteHeader'); // Change name to distinguish from variable
        function toggleMenu() {
            if (!menuToggle || !mobileMenu) return; // Prevent errors if not present

            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            siteHeaderEl.classList.toggle('menu-open');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // 1. Add CSS for mobile menu. We'll find `@media(max-width:1100px)`
        // Oh wait, some files don't have the `.mobile-menu` in CSS.
        // And they don't have `.menu-toggle` CSS.
        // Let's replace whatever is the media query for max-width:1100px.
        const mediaStart = content.indexOf('@media(max-width:1100px) {');
        if (mediaStart !== -1) {
            // let's just append the missing menu-toggle before it, and replace the hole media query. 
            // Better yet, just replace all `.site-header.hidden { ... }` up to the `<style>` with our stuff.
            // That might be too complex.
            // Let's do it safely:
        }

        // Just blindly replace any old <header class="site-header"> block
        let headerStart = content.indexOf('<header class="site-header"');
        let headerEnd = content.indexOf('</header>');
        if (headerStart !== -1 && headerEnd !== -1) {
            content = content.substring(0, headerStart) + mobileHTML + content.substring(headerEnd + 9);
        }

        // Add CSS if missing `.menu-toggle {`
        if (content.indexOf('.menu-toggle {') === -1) {
            const styleEnd = content.lastIndexOf('</style>');
            if (styleEnd !== -1) {
                content = content.substring(0, styleEnd) + mobileMenuCSS + '\n    </style>' + content.substring(styleEnd + 8);
            }
        } else {
            // Let's replace existing media query with the correct one if it exists
            // Our previous script `fix_styles_2.js/fix_styles_3.js` already added the pure header styles inside 1100px. 
            // We just didn't add the `.menu-toggle` CSS and the mobile menu CSS `.mobile-menu`.
            // We can regex replace the @media(max-width:1100px) { ... } with our mobileMenuCSS.
            let existingMediaStart = content.indexOf('@media(max-width:1100px) {');
            if (existingMediaStart !== -1) {
                // Try to guess where it ends (after .menu-toggle { display: flex } )
                let existingMediaEnd = content.indexOf('display: flex\n            }', existingMediaStart);
                if (existingMediaEnd !== -1) {
                    content = content.substring(0, existingMediaStart) + mobileMenuCSS + content.substring(existingMediaEnd + 28);
                } else { // fallback if previous script messed up
                    content = content.substring(0, existingMediaStart) + mobileMenuCSS;
                }
            }
        }

        // Add JS if missing
        if (content.indexOf('toggleMenu()') === -1 && content.indexOf('</script>') !== -1) {
            const scriptEnd = content.lastIndexOf('</script>');
            content = content.substring(0, scriptEnd) + javascriptMobileMenu + '\n    </script>' + content.substring(scriptEnd + 9);
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated HTML/MobileMenu " + file);
    }
}

run();
