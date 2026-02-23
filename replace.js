const fs = require('fs');
let html = fs.readFileSync('suburb_template.html', 'utf8');

const cssAdditions = `
        @media(max-width: 900px) {
            .suburb-cards-grid {
                grid-template-columns: 1fr !important;
            }
            .suburb-gray-grid {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
                text-align: center;
            }
            .suburb-gray-grid ul {
                align-items: center;
            }
        }
`;

if (!html.includes('.suburb-cards-grid')) {
    html = html.replace('</style>', cssAdditions + '\n    </style>');
}

const newSections = `
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
`;

let result = html.replace(/<!-- LOCAL AREA INTRO WITH BENTO GRID -->[\s\S]*?(?=<\/main>)/, newSections + '\n');
fs.writeFileSync('suburb_template.html', result);
console.log('Update Complete');
