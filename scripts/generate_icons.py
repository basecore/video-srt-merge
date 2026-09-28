from pathlib import Path
from PIL import Image, ImageDraw
root = Path(__file__).resolve().parents[1]
out = root / 'icons'
out.mkdir(exist_ok=True)
for size, name, maskable in [(192, 'icon-192.png', False), (512, 'icon-512.png', False), (512, 'icon-maskable-512.png', True)]:
    im = Image.new('RGB', (size, size), '#10243c')
    d = ImageDraw.Draw(im)
    def box(coords, radius, fill, outline=None, width=1):
        p = [int(x * size / 512) for x in coords]
        d.rounded_rectangle(p, radius=int(radius * size / 512), fill=fill, outline=outline, width=max(1, int(width * size / 512)))
    if not maskable:
        box((8, 8, 504, 504), 105, '#224d82')
    box((88, 120, 424, 342), 32, '#091827', '#72d4ff', 15)
    d.polygon([(int(x*size/512), int(y*size/512)) for x,y in [(220,176),(220,288),(316,232)]], fill='#9ce6b9')
    box((130, 312, 382, 403), 28, '#72d4ff')
    for x in (181, 228, 283):
        X = lambda a: int(a * size / 512)
        d.arc((X(x-17), X(346), X(x+17), X(371)), 80, 280, fill='#0b263e', width=max(3, X(10)))
    im.save(out / name, format='PNG', optimize=True)
