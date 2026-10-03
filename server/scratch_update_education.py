import re

filepath = 'src/services/education.service.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

def clean_array(match):
    items = match.group(1).replace('\n', ' ').replace("'", "").replace('",', '. ').replace('"', '').replace('  ', ' ')
    items = re.sub(r'\s+', ' ', items).strip()
    return f'whatToLookFor: "{items}"'

def clean_array_check(match):
    items = match.group(1).replace('\n', ' ').replace("'", "").replace('",', '. ').replace('"', '').replace('  ', ' ')
    items = re.sub(r'\s+', ' ', items).strip()
    return f'whatToCheck: "{items}"'

content = re.sub(r'warningSigns:\s*\[\s*([\s\S]*?)\s*\]', clean_array, content)
content = re.sub(r'whatToCheck:\s*\[\s*([\s\S]*?)\s*\]', clean_array_check, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
