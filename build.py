#!/usr/bin/env python3
"""Bundle the site into one self-contained file for publishing as an Artifact.

GitHub Pages serves index.html + styles.css + app.js + content.js directly, so it
needs nothing from this script. Artifacts are the opposite: a single file, with a
strict CSP that blocks every external request, and the host supplies its own
<!doctype>/<html>/<head>/<body> wrapper. So the bundle is body content only, with
the CSS and JS inlined.

Standard library only, by design — see CLAUDE.md.

    python build.py
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
OUT = DIST / "bundle.html"


def read(name):
    path = ROOT / name
    if not path.exists():
        sys.exit(f"build failed: {name} not found next to build.py")
    return path.read_text(encoding="utf-8")


def inline_script(js):
    """A literal </script> inside JS would close the tag early. Nothing in this
    project does that today, but the bundle should not silently break if it ever
    does."""
    return js.replace("</script>", "<\\/script>")


def main():
    html = read("index.html")
    css = read("styles.css")

    title_match = re.search(r"<title>(.*?)</title>", html, re.S)
    title = title_match.group(1).strip() if title_match else "Finance to Tech"

    body_match = re.search(r"<body[^>]*>(.*)</body>", html, re.S)
    if not body_match:
        sys.exit("build failed: could not find <body> in index.html")
    body = body_match.group(1)

    # Swap each external script for its contents, in the order index.html loads
    # them — content.js defines CONTENT, app.js consumes it.
    for src in ("content.js", "app.js"):
        tag = f'<script src="{src}"></script>'
        if tag not in body:
            sys.exit(f"build failed: expected {tag} in index.html")
        body = body.replace(tag, f"<script>\n{inline_script(read(src))}\n</script>")

    # The charset declaration has to survive: dropping index.html's <head> drops
    # its <meta charset>, and without it the em dashes decode as Latin-1 mojibake.
    # It must land inside the first 1024 bytes to be honoured, so it goes first.
    bundle = (
        '<meta charset="utf-8">\n'
        f"<title>{title}</title>\n"
        f"<style>\n{css}\n</style>\n"
        f"{body.strip()}\n"
    )

    # The whole point of the bundle is that it makes no external requests.
    # Fail loudly rather than shipping a page that silently loses its styles.
    leftovers = re.findall(r'<link\b[^>]*>|<script\b[^>]*\bsrc=', bundle)
    if leftovers:
        sys.exit(f"build failed: bundle still references external files: {leftovers}")

    DIST.mkdir(exist_ok=True)
    OUT.write_text(bundle, encoding="utf-8")

    print(f"wrote {OUT.relative_to(ROOT)}  ({len(bundle):,} bytes)")
    print(f"  title: {title}")
    print(f"  css:   {len(css):,} bytes inlined")
    print("  external requests: none")


if __name__ == "__main__":
    main()
