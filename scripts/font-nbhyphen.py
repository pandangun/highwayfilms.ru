"""Неразрывный дефис (U+2011) рисуется тем же знаком, что и обычный.
В Unbounded и Onest своего U+2011 нет, и браузер брал его из системного
шрифта. Добавляем в cmap ссылку на глиф дефиса."""
import sys
from fontTools.ttLib import TTFont

for path in sys.argv[1:]:
    font = TTFont(path)
    for table in font["cmap"].tables:
        if table.isUnicode() and 0x2011 not in table.cmap:
            glyph = table.cmap.get(0x2010) or table.cmap.get(0x002D)
            if glyph:
                table.cmap[0x2011] = glyph
    font.flavor = "woff2"
    font.save(path)
    print(path, "U+2011 ->", font.getBestCmap().get(0x2011))
