#!/usr/bin/env python3
from __future__ import annotations

from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
import re


FUNCTION_RE = re.compile(r"\bfunction\s+([A-Za-z0-9_]+)\b")
TYPE_RE = re.compile(r"type:\s*'([A-Za-z0-9_]+)'")


def analyze(files: list[Path]) -> dict:
    function_files: dict[str, set[str]] = defaultdict(set)
    function_counts = Counter()
    type_counts = Counter()
    type_files: dict[str, set[str]] = defaultdict(set)
    missing_meta = []

    for path in files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        functions = FUNCTION_RE.findall(text)
        function_counts.update(functions)
        for name in set(functions):
            function_files[name].add(path.name)

        types = TYPE_RE.findall(text)
        type_counts.update(types)
        for t in set(types):
            type_files[t].add(path.name)

        if "questionMeta" not in text:
            missing_meta.append(path.name)

    return {
        "files": files,
        "function_counts": function_counts,
        "function_files": function_files,
        "type_counts": type_counts,
        "type_files": type_files,
        "missing_meta": missing_meta,
    }


def format_section(title: str, data: dict) -> list[str]:
    lines = [f"## {title}"]
    files = data["files"]
    lines.append(f"- File count: {len(files)}")
    lines.append(f"- Unique function names: {len(data['function_files'])}")
    lines.append(f"- QuestionMeta missing: {len(data['missing_meta'])}")
    lines.append("")

    lines.append("### Most Common Functions (by file)")
    if data["function_files"]:
        for name, file_set in sorted(
            data["function_files"].items(), key=lambda item: (-len(item[1]), item[0])
        )[:15]:
            lines.append(f"- {name}: {len(file_set)} files")
    else:
        lines.append("- None")
    lines.append("")

    lines.append("### Question Types (by file)")
    if data["type_files"]:
        for t, file_set in sorted(
            data["type_files"].items(), key=lambda item: (-len(item[1]), item[0])
        ):
            lines.append(f"- {t}: {len(file_set)} files")
    else:
        lines.append("- None")
    lines.append("")

    lines.append("### Question Types (total occurrences)")
    if data["type_counts"]:
        for t, count in data["type_counts"].most_common():
            lines.append(f"- {t}: {count}")
    else:
        lines.append("- None")
    lines.append("")

    if data["missing_meta"]:
        lines.append("### Files Missing questionMeta")
        for name in sorted(data["missing_meta"]):
            lines.append(f"- {name}")
        lines.append("")

    return lines


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    js_dir = root / "src" / "static" / "js"
    report_path = root / "meta" / "assessment_audit.md"

    if not js_dir.exists():
        print(f"Missing js directory at {js_dir}")
        return 1

    assessment_files = sorted(js_dir.glob("assessment-igcse-topic*.js"))
    end_test_files = sorted(js_dir.glob("end-of-unit-test-igcse-topic*.js"))

    report_lines = ["# Assessment JS Audit", ""]
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%SZ")
    report_lines.append(f"Generated: {timestamp}")
    report_lines.append("")

    report_lines.extend(format_section("Assessments", analyze(assessment_files)))
    report_lines.extend(format_section("End-of-Unit Tests", analyze(end_test_files)))

    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(report_lines) + "\n", encoding="utf-8")
    print(f"Wrote report to {report_path.relative_to(root)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
