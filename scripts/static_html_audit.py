#!/usr/bin/env python3
from __future__ import annotations

from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


MARKER = "<!-- GENERATED FILE - Edit source in src/pages/ instead -->"


def main() -> int:
    root_dir = Path(__file__).resolve().parents[1]
    public_dir = root_dir / "public"
    meta_dir = root_dir / "meta"
    report_path = meta_dir / "static_html_report.md"
    static_source_dir = root_dir / "src" / "static"

    if not public_dir.exists():
        print(f"Missing public directory at {public_dir}")
        return 1

    html_files = sorted(public_dir.rglob("*.html"))
    total = len(html_files)
    static_files = []

    for path in html_files:
        try:
            content = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        if MARKER not in content:
            static_files.append(path)

    static_count = len(static_files)
    generated_count = total - static_count
    percent_static = (static_count / total * 100) if total else 0.0

    top_level = Counter()
    missing_sources = []
    for path in static_files:
        rel_public = path.relative_to(public_dir)
        rel_root = path.relative_to(root_dir)
        parts = rel_root.parts
        group = parts[1] if len(parts) > 2 else "(root)"
        top_level[group] += 1
        source_path = static_source_dir / rel_public
        if not source_path.exists():
            missing_sources.append(rel_public.as_posix())

    source_html = []
    if static_source_dir.exists():
        source_html = sorted(static_source_dir.rglob("*.html"))
    source_only = []
    for path in source_html:
        rel = path.relative_to(static_source_dir)
        if not (public_dir / rel).exists():
            source_only.append(rel.as_posix())

    lines = []
    lines.append("# Static HTML Audit")
    lines.append("")
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%SZ")
    lines.append(f"Generated: {timestamp}")
    lines.append("")
    lines.append("## Summary")
    lines.append(f"- Total HTML files: {total}")
    lines.append(f"- Generated (marker present): {generated_count}")
    lines.append(f"- Static/unmarked: {static_count} ({percent_static:.1f}%)")
    lines.append(f"- Static sources in `src/static`: {len(source_html)}")
    lines.append(f"- Static files missing source: {len(missing_sources)}")
    lines.append(f"- Static sources missing build output: {len(source_only)}")
    lines.append("")
    lines.append("## Static HTML by Top-Level Path")
    for key in sorted(top_level):
        lines.append(f"- {key}: {top_level[key]}")
    lines.append("")
    lines.append("## Static HTML Files")
    if static_files:
        for path in static_files:
            rel = path.relative_to(root_dir)
            lines.append(f"- {rel.as_posix()}")
    else:
        lines.append("- None")

    lines.append("")
    lines.append("## Static HTML Missing Source (`src/static`)")
    if missing_sources:
        for rel in sorted(missing_sources):
            lines.append(f"- public/{rel}")
    else:
        lines.append("- None")

    lines.append("")
    lines.append("## Static HTML Sources Missing Build Output")
    if source_only:
        for rel in sorted(source_only):
            lines.append(f"- src/static/{rel}")
    else:
        lines.append("- None")

    meta_dir.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote report to {report_path.relative_to(root_dir)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
