#!/usr/bin/env python3
"""Comprime as imagens novas/pesadas de clipping/images/ (usado no deploy).

Regras (mantêm nome e formato do arquivo, para a planilha continuar valendo):
  - só processa PNG/JPG/JPEG com largura > 1000 px OU tamanho > 600 KB;
  - reduz para no máximo 1000 px de largura;
  - PNG: paleta de 256 cores (+ otimização); JPEG: qualidade 85, progressivo;
  - só grava se o resultado for pelo menos 10% menor (evita recomprimir à toa).
Imagens já otimizadas não são tocadas, então rodar de novo não muda nada.
Uso: python3 compress_clipping_images.py [pasta]   (padrão: clipping/images)
"""
import io
import os
import sys

from PIL import Image, ImageOps

MAX_WIDTH = 1000
MAX_BYTES = 600 * 1024
EXTS = (".png", ".jpg", ".jpeg")


def compress(path):
    original = os.path.getsize(path)
    with Image.open(path) as im:
        im.load()
        width, height = im.size
        if width <= MAX_WIDTH and original <= MAX_BYTES:
            return None
        is_png = path.lower().endswith(".png")
        if not is_png:
            im = ImageOps.exif_transpose(im)
        if width > MAX_WIDTH:
            im = im.resize((MAX_WIDTH, round(height * MAX_WIDTH / width)), Image.LANCZOS)
        buf = io.BytesIO()
        if is_png:
            im.convert("RGBA").quantize(
                256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG
            ).save(buf, "PNG", optimize=True)
        else:
            im.convert("RGB").save(buf, "JPEG", quality=85, optimize=True, progressive=True)
    new = buf.tell()
    if new > original * 0.9:
        return None
    with open(path, "wb") as f:
        f.write(buf.getvalue())
    return original, new


def main():
    folder = sys.argv[1] if len(sys.argv) > 1 else "clipping/images"
    done = 0
    before = after = 0
    for name in sorted(os.listdir(folder)):
        if not name.lower().endswith(EXTS):
            continue
        try:
            result = compress(os.path.join(folder, name))
        except Exception as exc:  # arquivo corrompido não deve derrubar o deploy
            print(f"AVISO: não foi possível comprimir {name}: {exc}")
            continue
        if result:
            done += 1
            before += result[0]
            after += result[1]
            print(f"{name}: {result[0] // 1024} KB -> {result[1] // 1024} KB")
    print(f"{done} imagem(ns) comprimida(s): {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
