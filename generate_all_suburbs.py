import os
import re

info_file = r'c:\Users\Pau Rodriguez\Antigravity\Trading\Maid At Home (Chat)\suburbs\suburbs_text'
template_file = r'c:\Users\Pau Rodriguez\Antigravity\Trading\Maid At Home (Chat)\suburb_template.html'
output_dir = r'c:\Users\Pau Rodriguez\Antigravity\Trading\Maid At Home (Chat)\suburbs'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with open(template_file, 'r', encoding='utf-8') as f:
    template = f.read()

with open(info_file, 'r', encoding='utf-8') as f:
    raw_data = f.read()

sections = raw_data.split('==================================================== SUBURB: ')[1:]

tags_mapping = {
    '{meta_title}': '{{META_TITLE}}', # We should check if the template has these
    '{meta_description}': '{{META_DESCRIPTION}}',
    '{h1}': '{{H1}}',
    '{hero_title}': '{{HERO_TITLE}}',
    '{hero_description}': '{{HERO_DESCRIPTION}}',
    '{standard_clean_description}': '{{STANDARD_DESCRIPTION}}',
    '{deep_clean_description}': '{{DEEP_DESCRIPTION}}',
    '{move_clean_description}': '{{MOVE_DESCRIPTION}}',
    '{steam_clean_description}': '{{STEAM_DESCRIPTION}}',
    '{trust_section_subtitle}': '{{REDEFINING_SUBTITLE}}',
    '{trust_section_title}': '{{REDEFINING_SUBTITLE}}',
    '{testimonial_intro}': '{{TESTIMONIAL_INTRO}}',
    '{process_section_title}': '{{HOW_DESC}}',
    '{guarantee_text}': '{{GUARANTEE_TEXT}}'
}

highlight_color = 'rgb(165, 180, 252)'

for section in sections:
    lines = [line for line in section.split('\n') if line.strip() != '']
    suburb_name = lines[0].split(' =')[0].strip()
    
    print(f"Generating page for: {suburb_name}...")
    
    page_html = template
    
    # Update paths
    page_html = re.sub(r'(href|src)="(\./)?assets/', r'\1="../assets/', page_html)
    def repl_url(match):
        return f'url({match.group(1)}../assets/{match.group(3)}'
    page_html = re.sub(r'url\(([\'"]?)(\./)?assets/([^)]+)', repl_url, page_html)

    root_links = ['index.html', 'about.html', 'pricing.html', 'contact.html', 'faqs.html', 'booking.html', 'terms&conditions.html']
    for link in root_links:
        page_html = re.sub(rf'href="(\./)?{link}"', f'href="../{link}"', page_html)
        
    placeholders = {
        '{{suburb_name}}': f'<span style="color: {highlight_color};">{suburb_name}</span>',
        '{{SUBURB_NAME}}': suburb_name
    }
    
    # Parse tags manually to avoid regex backtrack
    current_tag = None
    current_content = []
    
    parsed_tags = {}
    
    for line in lines[1:]:
        if line.startswith('{') and line.endswith('}'):
            if current_tag:
                parsed_tags[current_tag] = " ".join(current_content).strip()
            current_tag = line.strip()
            current_content = []
        elif line.startswith('TESTIMONIAL CARDS') or line.startswith('-------------------'):
            if current_tag:
                parsed_tags[current_tag] = " ".join(current_content).strip()
                current_tag = None
            continue
        elif line.startswith('Testimonial ') and 'Text:' in line:
            # handle testimonial start
            current_tag = 'testimonial_card'
            current_content = [line]
        elif current_tag == 'testimonial_card' and (line.startswith('Name:') or line.startswith('Suburb:') or line.startswith('Rating:')):
            current_content.append(line)
        elif current_tag == 'testimonial_card' and line.strip() == '':
            pass
        elif current_tag == 'testimonial_card':
            current_content[-1] += f" {line.strip()}"
        elif current_tag:
            current_content.append(line.strip())
            
    if current_tag and current_tag != 'testimonial_card':
        parsed_tags[current_tag] = " ".join(current_content).strip()

    # Process generic tags
    for tag_key, placeholder in tags_mapping.items():
        if tag_key in parsed_tags:
            content = parsed_tags[tag_key]
            # Wrap suburb name in blue span, only in titles
            if tag_key in ['{h1}', '{hero_title}']:
                content = re.sub(rf'(\b\w+\s+{re.escape(suburb_name)}|{re.escape(suburb_name)})', f'<span style="color: {highlight_color};">\\1</span>', content, flags=re.IGNORECASE)
            placeholders[placeholder] = content

    # Testimonials are trickier - Parse from the overall section
    t_matches = re.finditer(r'Testimonial (\d+) Text:\s*(.*?)\s*Name:\s*(.*?)\s*Suburb:\s*(.*?)\s*Rating:\s*(\d+)', section)
    for t_match in t_matches:
        t_num = t_match.group(1)
        quote = t_match.group(2).strip()
        name = t_match.group(3).strip()
        suburb = t_match.group(4).strip()
        
        quote = re.sub(r'[\n\r]+', ' ', quote)
        if not quote.startswith('"') and not quote.startswith('“'): quote = f'"{quote}'
        if not quote.endswith('"') and not quote.endswith('”'): quote = f'{quote}"'
        
        placeholders[f'{{{{T_CARD_{t_num}_QUOTE}}}}'] = quote
        placeholders[f'{{{{T_CARD_{t_num}_NAME}}}}'] = name
        
        placeholders[f'{{{{T_CARD_{t_num}_SUBURB}}}}'] = suburb

    # Replace all placeholders in HTML
    for key, value in placeholders.items():
        page_html = page_html.replace(key, value)
        
    # Write output
    filename = suburb_name.lower().replace(' ', '-') + '.html'
    out_path = os.path.join(output_dir, filename)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(page_html)

print("All suburb pages generated successfully!")
