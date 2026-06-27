#!/usr/bin/env python3
"""
compress-photos.py — Comprime fotos JPEG de public/ in-place.
Mantiene extensión .jpeg, mismo nombre, sin cambiar rutas.

Uso:
  python compress-photos.py
  python compress-photos.py -q 70
  python compress-photos.py --max-width 1600
"""

import argparse
import sys
import time
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Falta Pillow. Instala con:  pip install Pillow")
    sys.exit(1)

GREEN  = "\033[92m"
YELLOW = "\033[93m"
RED    = "\033[91m"
CYAN   = "\033[96m"
GRAY   = "\033[90m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

def fmt_bytes(b: int) -> str:
    if b < 1024:        return f"{b} B"
    if b < 1_048_576:   return f"{b/1024:.1f} KB"
    return f"{b/1_048_576:.2f} MB"

def savings_label(orig: int, new: int) -> str:
    if orig == 0:
        return ""
    pct = (1 - new / orig) * 100
    if pct > 0:
        return f"{GREEN}-{pct:.0f}%{RESET}"
    elif pct < 0:
        return f"{YELLOW}+{abs(pct):.0f}%{RESET}"
    return "±0%"

def compress_jpeg(src: Path, max_width: int, quality: int, skip_larger: bool) -> dict:
    """Comprime JPEG in-place. Devuelve dict con resultado."""
    try:
        orig_size = src.stat().st_size

        with Image.open(src) as img:
            w, h = img.size

            # Reducir si es más ancho que max_width
            if w > max_width:
                ratio = max_width / w
                new_h = int(h * ratio)
                img = img.resize((max_width, new_h), Image.LANCZOS)

            # Guardar in-place con compresión
            img.save(src, format="JPEG", quality=quality, optimize=True)

        new_size = src.stat().st_size

        if skip_larger and new_size >= orig_size:
            # Restaurar original? No podemos, pero informamos
            return {"ok": True, "orig": orig_size, "new": new_size, "skipped": True}

        return {"ok": True, "orig": orig_size, "new": new_size, "skipped": False}
    except Exception as e:
        return {"ok": False, "error": str(e)}

def main():
    parser = argparse.ArgumentParser(
        description="Comprime fotos JPEG de public/ in-place.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos:
  python compress-photos.py
  python compress-photos.py -q 70
  python compress-photos.py --max-width 1600
  python compress-photos.py --skip-larger
        """
    )
    parser.add_argument("-q", "--quality", type=int, default=80, help="Calidad JPEG 1-100 (defecto: 80)")
    parser.add_argument("--max-width", type=int, default=1200, help="Ancho máximo en px (defecto: 1200)")
    parser.add_argument("--skip-larger", action="store_true", help="No sobreescribir si el resultado es más grande")
    args = parser.parse_args()

    if not 1 <= args.quality <= 100:
        parser.error("La calidad debe estar entre 1 y 100.")

    public_dir = Path("public")
    if not public_dir.exists():
        print(f"{RED}No se encontró la carpeta public/{RESET}")
        sys.exit(1)

    files = sorted(public_dir.glob("*.jpeg"))
    if not files:
        print(f"{YELLOW}No se encontraron archivos .jpeg en public/{RESET}")
        sys.exit(0)

    print(f"\n{BOLD}compress-photos{RESET} — {len(files)} imagen(es) → {CYAN}JPEG{RESET}  calidad={CYAN}{args.quality}{RESET}  max_width={CYAN}{args.max_width}{RESET}px\n")

    total_orig = total_new = ok_count = skip_count = err_count = 0
    t0 = time.perf_counter()

    for src in files:
        result = compress_jpeg(src, args.max_width, args.quality, args.skip_larger)

        if not result["ok"]:
            print(f"  {RED}ERR {RESET}  {src.name}  {RED}{result['error']}{RESET}")
            err_count += 1
            continue

        orig, new = result["orig"], result["new"]

        if result.get("skipped"):
            print(f"  {YELLOW}SKIP{RESET}  {src.name}  {GRAY}(más grande: {fmt_bytes(new)} >= {fmt_bytes(orig)}){RESET}")
            skip_count += 1
            continue

        total_orig += orig
        total_new  += new
        ok_count   += 1

        label = savings_label(orig, new)
        print(f"  {GREEN}OK  {RESET}  {src.name}  {GRAY}{fmt_bytes(orig)} → {RESET}{fmt_bytes(new)}  {label}")

    elapsed = time.perf_counter() - t0

    print(f"\n{'─'*52}")
    print(f"  Comprimidas : {BOLD}{ok_count}{RESET}")
    if skip_count:
        print(f"  Saltadas    : {skip_count}")
    if err_count:
        print(f"  Errores     : {RED}{err_count}{RESET}")
    if ok_count and total_orig:
        pct = (1 - total_new / total_orig) * 100
        color = GREEN if pct > 0 else YELLOW
        print(f"  Total ahorrado: {color}{fmt_bytes(total_orig - total_new)} ({pct:.1f}%){RESET}")
        print(f"  {fmt_bytes(total_orig)} → {fmt_bytes(total_new)}")
    print(f"  Tiempo      : {elapsed:.2f}s")
    print()

if __name__ == "__main__":
    main()
