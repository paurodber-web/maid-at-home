const fs = require('fs');

try {
    const hf = fs.readFileSync('header&footer.html', 'utf8');
    const idx = fs.readFileSync('index.html', 'utf8');

    // Extract the hero panel from index.html (the text-left + chat-container)
    const panelStart = idx.indexOf('<div class="panel">');
    // Find the end of panel
    const panelEnd = idx.indexOf('<!-- DETAILED SERVICES SECTION -->');
    let hero = idx.substring(panelStart, panelEnd);

    // Replace text for suburb
    hero = hero.replace(/Melbourne homes,<br><span>happy again.<\/span>/g, '{{suburb_name}} homes,<br><span>made impeccable.</span>');
    hero = hero.replace(/We started Maid At Home because we believe the standard of home cleaning should be higher./g, 'We bring a refined, higher standard of cleaning directly to {{suburb_name}} residents.');

    // Build the main tag with NEW sections (different layout)
    const mainHtml = `
<main>
${hero}

<!-- LOCAL AREA INTRO WITH BENTO GRID -->
<section style="width: 100%; padding: 40px 48px 120px; display: flex; justify-content: center; background: #ffffff;">
    <div style="max-width: 1320px; width: 100%;">
        <div style="text-align: center; margin-bottom: 60px;">
            <p style="display: inline-flex; align-items: center; gap: 8px; background: #EEF2FF; color: var(--primary); padding: 6px 14px; border-radius: 100px; font-size: 0.9rem; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.01em;">
                <span style="width: 6px; height: 6px; background: currentColor; border-radius: 50%;"></span>
                Local Excellence
            </p>
            <h2 style="font-family: var(--font-main); font-size: 3rem; font-weight: 700; color: var(--text-dark); letter-spacing: -0.02em; line-height: 1.1;">
                Your Personal Home<br><span style="color: var(--primary);">Curators in {{suburb_name}}.</span>
            </h2>
            <p style="font-size: 1.15rem; color: var(--text-sub); margin-top: 24px; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.65;">
                We understand that {{suburb_name}} residents value both their time and the sanctity of their homes. Our service is designed to seamlessly integrate into your busy lifestyle.
            </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- Area 1 -->
            <div style="background: #F5F7FF; border-radius: 32px; padding: 48px; border: 1px solid #E0E7FF; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h3 style="font-size: 1.8rem; font-weight: 700; color: var(--text-dark); margin-bottom: 16px; letter-spacing: -0.02em;">We Know {{suburb_name}}</h3>
                    <p style="font-size: 1.1rem; color: var(--text-sub); line-height: 1.6;">Our dedicated local teams mean consistent schedules, familiar faces, and a cleaning protocol adapted to the specific architectural nuances of homes in the area.</p>
                </div>
                <div style="margin-top: 40px;">
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 16px;">
                        <li style="display: flex; align-items: center; gap: 12px; font-weight: 600; color: var(--text-dark); font-size: 1.05rem;">
                            <svg style="width: 24px; height: 24px; color: var(--primary);" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            Same-Day Availability
                        </li>
                        <li style="display: flex; align-items: center; gap: 12px; font-weight: 600; color: var(--text-dark); font-size: 1.05rem;">
                            <svg style="width: 24px; height: 24px; color: var(--primary);" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            Dedicated Local Staff
                        </li>
                        <li style="display: flex; align-items: center; gap: 12px; font-weight: 600; color: var(--text-dark); font-size: 1.05rem;">
                            <svg style="width: 24px; height: 24px; color: var(--primary);" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                            Flexible Key Access
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Area 2 -->
            <div style="position: relative; border-radius: 32px; overflow: hidden; min-height: 480px;">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" alt="{{suburb_name}} Home" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 100%);"></div>
                <div style="position: absolute; bottom: 40px; left: 40px; right: 40px; color: white;">
                    <div style="font-size: 3rem; font-weight: 800; line-height: 1; margin-bottom: 8px;">100+</div>
                    <div style="font-size: 1.1rem; color: rgba(255, 255, 255, 0.8);">Homes successfully managed in the {{suburb_name}} area over the last year.</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SUBURB EXCLUSIVE SERVICES LAYOUT -->
<section style="width: 100%; padding: 120px 48px; display: flex; justify-content: center; background: #0F172A; color: white;">
    <div style="max-width: 1320px; width: 100%;">
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 60px; flex-wrap: wrap; gap: 40px;">
            <div>
                <h2 style="font-family: var(--font-main); font-size: 2.8rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1;">Curated services for<br><span style="color: #A5B4FC;">our {{suburb_name}} clients.</span></h2>
            </div>
            <div style="max-width: 480px; font-size: 1.1rem; color: #94A3B8; line-height: 1.6;">
                More than just wiping surfaces. We offer a holistic approach to home maintenance, tailored to the demands of modern living.
            </div>
        </div>

        <!-- Horizontal Services List -->
        <div style="display: flex; flex-direction: column; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 40px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); flex-wrap: wrap; gap: 32px; transition: all 0.3s; cursor: default;">
                <div style="flex: 1; min-width: 300px;">
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.01em;">The Standard Routine</h3>
                    <p style="color: #94A3B8; font-size: 1.05rem; line-height: 1.6;">Our signature recurring service to keep your baseline impeccable. Dusting, polishing, sanitization, and organization on a schedule that suits you.</p>
                </div>
                <div style="flex: 1; min-width: 300px; display: flex; flex-wrap: wrap; gap: 12px;">
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">Weekly</span>
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">Fortnightly</span>
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">Monthly</span>
                </div>
                <div>
                    <a href="booking.html" class="nav-cta" style="padding: 14px 32px; display: inline-block; border-radius: 12px; text-decoration: none;">Book standard</a>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 40px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); flex-wrap: wrap; gap: 32px; transition: all 0.3s; cursor: default;">
                <div style="flex: 1; min-width: 300px;">
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.01em;">The Deep Clean</h3>
                    <p style="color: #94A3B8; font-size: 1.05rem; line-height: 1.6;">An intensive, detailed session reaching every hidden corner. Ideal for seasonal refreshes or homes that haven't been professionally serviced recently.</p>
                </div>
                <div style="flex: 1; min-width: 300px; display: flex; flex-wrap: wrap; gap: 12px;">
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">Inside Ovens</span>
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">Baseboards</span>
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">Windows</span>
                </div>
                <div>
                    <a href="booking.html" class="nav-cta" style="padding: 14px 32px; display: inline-block; border-radius: 12px; text-decoration: none;">Book deep clean</a>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 40px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); flex-wrap: wrap; gap: 32px; transition: all 0.3s; cursor: default;">
                <div style="flex: 1; min-width: 300px;">
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.01em;">Move In / Move Out</h3>
                    <p style="color: #94A3B8; font-size: 1.05rem; line-height: 1.6;">A meticulous service designed to guarantee your bond return or welcome you into a pristine new sanctuary.</p>
                </div>
                <div style="flex: 1; min-width: 300px; display: flex; flex-wrap: wrap; gap: 12px;">
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">End of Lease</span>
                    <span style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 100px; font-size: 0.9rem;">Pre-Sale Prep</span>
                </div>
                <div>
                    <a href="booking.html" class="nav-cta" style="padding: 14px 32px; display: inline-block; border-radius: 12px; text-decoration: none;">Book handover</a>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- LOCAL FAQ SECTION -->
<section style="width: 100%; padding: 120px 48px; display: flex; justify-content: center; background: #FAFAFA;">
    <div style="max-width: 900px; width: 100%;">
        <div style="text-align: center; margin-bottom: 60px;">
            <h2 style="font-family: var(--font-main); font-size: 2.8rem; font-weight: 700; color: var(--text-dark); letter-spacing: -0.02em;">Common questions<br>for {{suburb_name}}</h2>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px;">
            <!-- FAQ 1 -->
            <div style="background: white; border: 1px solid #E0E7FF; padding: 32px; border-radius: 20px;">
                <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; color: var(--text-dark);">How quickly can I get a cleaner in {{suburb_name}}?</h4>
                <p style="color: var(--text-sub); font-size: 1.05rem; line-height: 1.6;">Because we have a dedicated team serving the {{suburb_name}} area, we can often accommodate next-day or even same-day requests, depending on the time of booking.</p>
            </div>
            <!-- FAQ 2 -->
            <div style="background: white; border: 1px solid #E0E7FF; padding: 32px; border-radius: 20px;">
                <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; color: var(--text-dark);">Do I need to provide parking?</h4>
                <p style="color: var(--text-sub); font-size: 1.05rem; line-height: 1.6;">Our cleaners carry professional equipment and supplies. While off-street parking is appreciated, our {{suburb_name}} team is familiar with local street parking regulations and can easily adapt if you provide a permit or guidance.</p>
            </div>
            <!-- FAQ 3 -->
            <div style="background: white; border: 1px solid #E0E7FF; padding: 32px; border-radius: 20px;">
                <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; color: var(--text-dark);">Will I get the same cleaner every time?</h4>
                <p style="color: var(--text-sub); font-size: 1.05rem; line-height: 1.6;">Yes. Our priority is consistency. By locking in a weekly or fortnightly schedule, you'll have the same local {{suburb_name}} professional assigned to your sanctuary.</p>
            </div>
        </div>
    </div>
</section>

</main>
`;

    const insertPoint = hf.indexOf('<footer class="site-footer">');
    let combined = hf.substring(0, insertPoint) + mainHtml + '\n    ' + hf.substring(insertPoint);

    // Write back to file
    fs.writeFileSync('suburb_template.html', combined);
    console.log('Template created with bespoke layouts for the suburb.');
} catch (e) {
    console.error(e);
}
