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

const javascriptMobileMenu = `
    <script>
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const siteHeaderEl = document.getElementById('siteHeader');
        
        function toggleMenu() {
            if (!menuToggle || !mobileMenu) return;

            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (siteHeaderEl) siteHeaderEl.classList.toggle('menu-open');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }
    </script>`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        if (!content.includes('function toggleMenu')) {
            const bodyEnd = content.lastIndexOf('</body>');
            if (bodyEnd !== -1) {
                content = content.substring(0, bodyEnd) + javascriptMobileMenu + '\n</body>' + content.substring(bodyEnd + 7);
                fs.writeFileSync(file, content, 'utf8');
                console.log("Added JS to " + file);
            }
        } else {
            console.log("JS already present in " + file);
        }
    }
}

run();
