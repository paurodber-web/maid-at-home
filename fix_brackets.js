const fs = require('fs');

const file = 'pricing.html';

if (!fs.existsSync(file)) {
    console.error("File not found");
    process.exit(1);
}

let content = fs.readFileSync(file, 'utf8');

// 1. Fix the missing closing bracket for the 1100px media query
// The issue is before: /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */
// There's a ".menu-toggle { display: flex; }" inside a broken media query.
const brokenFixes = '.menu-toggle { display: flex; }\\n\\n        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */';
if (content.includes('.menu-toggle { display: flex; }\\n\\n        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */')) {
    content = content.replace('.menu-toggle { display: flex; }\\n\\n        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */', '.menu-toggle { display: flex; }\\n        }\\n\\n        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */');
} else if (content.includes('.menu-toggle { display: flex; }\\n\\n\\n        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */')) {
    content = content.replace('.menu-toggle { display: flex; }\\n\\n\\n        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */', '.menu-toggle { display: flex; }\\n        }\\n\\n        /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */');
} else if (content.includes('.menu-toggle { display: flex; }\\n            /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */')) {
    content = content.replace('.menu-toggle { display: flex; }\\n            /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */', '.menu-toggle { display: flex; }\\n            }\\n            /* --- UNIFIED MOBILE RESPONSIVE FIXES --- */');
} else {
    // Blanket fix if the above strict strings didn't hit
    // Just find "display: flex;" and the UNIFIED tag
    content = content.replace(/display:\s*flex;\s*\}\s*\/\*\s*---\s*UNIFIED MOBILE RESPONSIVE FIXES/g, 'display: flex; } } /* --- UNIFIED MOBILE RESPONSIVE FIXES');
}


// 2. Fix the broken JavaScript tag at the bottom
// Replace the corrupted lines with correct script closure
const corruptedJs = `        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
     
    </script>
</body>`;
const fixedJs = `        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }
    </script>
</body>`;
if (content.includes(corruptedJs)) {
    content = content.replace(corruptedJs, fixedJs);
}

// Write the fixed file
fs.writeFileSync(file, content, 'utf8');
console.log("Fixed syntax errors in pricing.html");
