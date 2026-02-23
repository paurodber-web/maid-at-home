const fs = require('fs');

// Read the current file, which might be messed up
let currHtml = fs.readFileSync('suburb_template.html', 'utf8');

// The original scripts & footer.
// Let's grab the head and everything up to <main> from the current file because that part is still intact.
const headerMatch = currHtml.match(/([\s\S]*?)<main>/);
if (!headerMatch) throw new Error("Could not find <main>");

const headerPart = headerMatch[1]; // Everything up to <main>

const newBody = `
<main>
    <div class="panel">
        <div class="panel-content">
            <div class="spacer"></div>

            <div class="body-content">
                <div class="text-left">
                    <div class="reveal reveal-scale" style="display: flex; gap: 8px; color: #A5B4FC; font-size: 0.9rem; font-weight: 600; margin-bottom: 24px; letter-spacing: 0.05em; text-transform: uppercase;">
                        <a href="index.html" style="color: #A5B4FC; text-decoration: none;">Home</a> 
                        <span style="color: rgba(255,255,255,0.4);">/</span> 
                        <span style="color: white;">{{suburb_name}}</span>
                    </div>
                    <h1 class="reveal reveal-up delay-1">Premium house<br>cleaning services<br><span>in {{suburb_name}}.</span>
                    </h1>
                    <p class="description reveal reveal-up delay-2">
                        Professional house cleaning services in {{suburb_name}}. We take care of
                        the chores so you can come home to a clean, relaxing space.
                    </p>

                    <div class="reveal reveal-up delay-3">
                        <div class="trust-chips">
                            <div class="chip">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Police Checked
                            </div>
                            <div class="chip">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Fully Insured
                            </div>
                            <div class="chip">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                Google Rated 5/5
                            </div>
                        </div>

                    </div>
                </div>

                <div class="chat-container reveal reveal-left delay-4">
                    <div class="chat-header">
                        <h2>Quick Quote</h2>
                        <p>Tell us what you need for an instant price</p>
                    </div>
                    <div class="chat-feed" id="chatFeed"></div>
                    <div class="chat-dock" id="chatDock"></div>
                    <div class="res-box" id="resBox">
                        <div
                            style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; color:rgba(255,255,255,0.4); margin-bottom:8px;">
                            Fixed Price</div>
                        <div class="res-price">$<span id="pVal">0</span></div>
                        <div style="color:rgba(255,255,255,0.6); margin-bottom:24px; font-size:1rem;" id="pDesc">
                        </div>
                        <a href="booking.html" class="btn-aurora"
                            style="width:100%; justify-content:center; border:none; cursor:pointer; text-decoration:none;">Secure
                            Booking</a>
                        <div style="margin-top:20px; font-size:0.85rem; color:rgba(255,255,255,0.3); cursor:pointer;"
                            onclick="bootChat()">← Start Over</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- LOCAL SERVICE & CARDS -->
    <section class="local-service-section" style="width: 100%; padding: 120px 48px; display: flex; justify-content: center; background: #ffffff;">
        <div style="max-width: 1100px; width: 100%; text-align: center;">
            <span style="display: inline-block; font-size: 0.85rem; font-weight: 700; color: #4A90E2; background: #EEF2FF; padding: 6px 16px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">Local Service</span>
            
            <p style="font-size: 1.15rem; color: #94A3B8; line-height: 1.8; max-width: 600px; margin: 0 auto 60px;">
                Our local team is dedicated to providing a reliable, thorough clean every time. Enjoy a spotless home and more free time to do what you love in {{suburb_name}}.
            </p>

            <div class="suburb-cards-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: left;">
                <!-- Card 1 -->
                <div style="background: #FAFAFA; border: 1px solid #F1F5F9; border-radius: 20px; padding: 40px; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: #EEF2FF; color: #60A5FA; display: flex; align-items: center; justify-content: center;">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #0F172A; margin-bottom: 12px; font-family: 'Outfit', sans-serif;">Elite local teams</h3>
                        <p style="font-size: 1rem; color: #94A3B8; line-height: 1.6;">Hospitality-trained professionals vetted for {{suburb_name}}. We bring elite standards and local reliability to every home we touch.</p>
                    </div>
                </div>

                <!-- Card 2 -->
                <div style="background: #FAFAFA; border: 1px solid #F1F5F9; border-radius: 20px; padding: 40px; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: #F1F5F9; color: #94A3B8; display: flex; align-items: center; justify-content: center;">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    </div>
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #0F172A; margin-bottom: 12px; font-family: 'Outfit', sans-serif;">White glove precision</h3>
                        <p style="font-size: 1rem; color: #94A3B8; line-height: 1.6;">We cultivate pristine environments in {{suburb_name}}, ensuring every surface is polished and meticulously staged.</p>
                    </div>
                </div>

                <!-- Card 3 -->
                <div style="background: #FAFAFA; border: 1px solid #F1F5F9; border-radius: 20px; padding: 40px; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: #FFF1F2; color: #F43F5E; display: flex; align-items: center; justify-content: center;">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle></svg>
                    </div>
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #0F172A; margin-bottom: 12px; font-family: 'Outfit', sans-serif;">Satisfaction guarantee</h3>
                        <p style="font-size: 1rem; color: #94A3B8; line-height: 1.6;">Not 100% satisfied with your clean in {{suburb_name}}? We will return and redo it for free. That is our satisfaction promise.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- GRAY RATING SECTION -->
    <section class="grey-rating-section" style="width: 100%; padding: 120px 48px; display: flex; justify-content: center; background: #F8FAFC;">
        <div class="suburb-gray-grid" style="max-width: 1100px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
            <!-- Left Side: Text and List -->
            <div>
                <h2 style="font-family: var(--font-main); font-size: 2.2rem; font-weight: 700; color: #0F172A; line-height: 1.2; margin-bottom: 24px; letter-spacing: -0.02em;">The best house cleaning in {{suburb_name}}</h2>
                <p style="font-size: 1.05rem; color: #64748B; line-height: 1.6; margin-bottom: 32px;">
                    At Maid At Home, we believe {{suburb_name}} residents deserve the absolute best. Our professional cleaning specialists go through rigorous screening and training to ensure they meet our elite housekeeping standards.
                </p>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px;">
                    <li style="display: flex; align-items: center; gap: 12px; font-weight: 600; color: #334155; font-size: 0.95rem;">
                        <div style="background: #60A5FA; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                        Standard and detailed cleans
                    </li>
                    <li style="display: flex; align-items: center; gap: 12px; font-weight: 600; color: #334155; font-size: 0.95rem;">
                        <div style="background: #60A5FA; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                        Specialized deep cleaning
                    </li>
                    <li style="display: flex; align-items: center; gap: 12px; font-weight: 600; color: #334155; font-size: 0.95rem;">
                        <div style="background: #60A5FA; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                        Move-In / move-out services
                    </li>
                </ul>
            </div>

            <!-- Right Side: Rating Card -->
            <div style="background: #ffffff; border-radius: 20px; padding: 60px 40px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                <div style="font-size: 4rem; font-weight: 800; color: #60A5FA; line-height: 1; font-family: 'Outfit', sans-serif; margin-bottom: 12px; letter-spacing: -0.02em;">4.9<span style="font-size: 2.5rem; color: #94A3B8;">/5</span></div>
                <div style="font-size: 1rem; font-weight: 600; color: #64748B; margin-bottom: 32px;">Client Satisfaction in {{suburb_name}}</div>
                <a href="booking.html" class="nav-cta" style="display: block; width: 100%; padding: 16px; text-align: center; background: #60A5FA; color: white; border-radius: 12px; font-weight: 700; font-size: 1rem; text-decoration: none; transition: transform 0.2s ease, background 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.background='#3B82F6';" onmouseout="this.style.transform='translateY(0)'; this.style.background='#60A5FA';">Book Your {{suburb_name}} Clean</a>
            </div>
        </div>
    </section>

</main>
`;

// Fetch the clean footer + scripts from header&footer.html
const footerSrc = fs.readFileSync('header&footer.html', 'utf8');
const footerParts = footerSrc.match(/(<footer class="site-footer">[\s\S]*)/);
let footerAndScripts = footerParts ? footerParts[1] : '';

// Also fetch the specific chatbot scripts from our existing current HTML (which are below the corrupted footer, but we can just use the script block from before if we just regex it)
const scriptMatch = currHtml.match(/(<script>[\s\S]*?(?=<\/body>))/);
if (scriptMatch) {
    footerAndScripts = footerAndScripts + '\\n    <!-- SCRIPTS -->\\n    ' + scriptMatch[1];
}

fs.writeFileSync('suburb_template.html', headerPart + newBody + '\\n' + (footerParts ? footerParts[1] : '') + '\\n' + (scriptMatch ? scriptMatch[1] : '') + '\\n</body>\\n</html>\\n');
console.log('Done rebuild');
