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

const newScrollLogic = `                    if (window.innerWidth <= 1100) {
                        if (currentScrollY > 50) {
                            siteHeader.classList.add('is-sticky');
                        } else {
                            siteHeader.classList.remove('is-sticky');
                        }
                        siteHeader.classList.remove('hidden');
                    } else {
                        if (currentScrollY <= 24) {
                            siteHeader.classList.remove('is-sticky', 'hidden');
                            accumulatedScroll = 0;
                        } else {
                            if ((scrollDiff > 0 && accumulatedScroll < 0) || (scrollDiff < 0 && accumulatedScroll > 0)) {
                                accumulatedScroll = 0;
                            }

                            accumulatedScroll += scrollDiff;

                            if (accumulatedScroll > showTolerance) {
                                if (!siteHeader.classList.contains('is-sticky')) {
                                    siteHeader.classList.add('is-sticky', 'hidden');
                                    siteHeader.offsetHeight;
                                }
                                siteHeader.classList.remove('hidden');
                                accumulatedScroll = 0;
                            } else if (accumulatedScroll < -hideTolerance) {
                                if (siteHeader.classList.contains('is-sticky')) {
                                    siteHeader.classList.add('hidden');
                                }
                                accumulatedScroll = 0;
                            }
                        }
                    }`;

function run() {
    for (const file of targetFiles) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');

        // Regex approach might be tricky if formatting varies, let's use a substring replacement spanning from
        // `if (window.innerWidth <= 1100) return;` up to the closing `}` before `lastScrollY = currentScrollY;`

        const startMarker = 'if (window.innerWidth <= 1100) return;';
        const startIdx = content.indexOf(startMarker);

        if (startIdx !== -1) {
            // Find `lastScrollY = currentScrollY;` and replace up to just before it
            const endMarker = 'lastScrollY = currentScrollY;';
            const endIdx = content.indexOf(endMarker, startIdx);

            if (endIdx !== -1) {
                // We want to replace everything from startIdx up to endIdx
                // Wait, in the existing code, after `if (window.innerWidth <= 1100) return;` there is `if (currentScrollY <= 24) ...` 
                // The block extends till the end of the `else` or `if` structure.

                content = content.substring(0, startIdx) + newScrollLogic + '\n\n                    ' + content.substring(endIdx);
                fs.writeFileSync(file, content, 'utf8');
                console.log("Updated scroll logic in " + file);
            } else {
                console.log("Could not find endMarker in " + file);
            }
        } else {
            console.log("Already updated or no start marker in " + file);
        }
    }
}

run();
