"""Gera as variantes da foto do hero (AVIF e WebP, 400 e 720 px) a partir do JPG original.

Uso, na raiz do projeto (precisa do Pillow 11+, que já lê e escreve AVIF):
    python scripts/hero-images.py
"""
from pathlib import Path

from PIL import Image

SOURCE = Path('scripts/source/foto_profissional.jpg')
OUT_DIR = Path('public/assets/images')

SIZES = (400, 720)
QUALITY = {'AVIF': 55, 'WEBP': 80}

image = Image.open(SOURCE).convert('RGB')

for size in SIZES:
    resized = image.resize((size, size), Image.LANCZOS)
    for fmt, ext in (('AVIF', 'avif'), ('WEBP', 'webp')):
        out = OUT_DIR / f'foto_profissional-{size}.{ext}'
        resized.save(out, fmt, quality=QUALITY[fmt])
        print(f'{out}  {out.stat().st_size // 1024} KB')
