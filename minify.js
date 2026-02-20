const fs = require('fs');
const CleanCSS = require('clean-css');
const terser = require('terser');

async function processFile(filename) {
    if (!fs.existsSync(filename)) return;
    
    let originalHtml = fs.readFileSync(filename, 'utf8');
    let html = originalHtml;
    
    // Minify CSS in <style>
    const styleRegex = /<style>([\s\S]*?)<\/style>/g;
    let styleMatch;
    while ((styleMatch = styleRegex.exec(originalHtml)) !== null) {
        const fullMatch = styleMatch[0];
        const cssContent = styleMatch[1];
        
        try {
            const minifiedCss = new CleanCSS({}).minify(cssContent).styles;
            html = html.replace(fullMatch, `<style>${minifiedCss}</style>`);
        } catch(e) { console.error(`CSS error in ${filename}`); }
    }
    
    // Minify JS in <script> (ignoring external scripts)
    // Avoid double matching by using a new regex on original HTML string
    const scriptRegex = /<script(?![^>]*src=)>([\s\S]*?)<\/script>/g;
    let scriptMatch;
    while ((scriptMatch = scriptRegex.exec(originalHtml)) !== null) {
        const fullMatch = scriptMatch[0];
        const scriptContent = scriptMatch[1];
        
        if (scriptContent.trim().length === 0) continue;
        
        try {
            const minifiedJs = await terser.minify(scriptContent);
            if (minifiedJs.code) {
                html = html.replace(fullMatch, `<script>${minifiedJs.code}</script>`);
            }
        } catch(e) { console.error(`JS error in ${filename}`, e); }
    }
    
    fs.writeFileSync(filename, html);
    console.log(`Minified inline CSS/JS in ${filename}`);
}

async function main() {
    await processFile('index.html');
    await processFile('about.html');
    await processFile('pricing.html');
}

main();
