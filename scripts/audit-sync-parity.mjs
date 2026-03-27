import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const defaultPrivateRoot = process.env.SKILLS_PRIVATE_SOURCE_DIR || "/Users/zon/.codex/skills";
const defaultPublicRoot = path.join(root, "content", "skills");
const defaultOutPath = path.join(root, "reports", "private-public-sync-report.json");

function usage() {
  console.log(
    [
      "Usage:",
      "  node scripts/audit-sync-parity.mjs",
      "    [--private-root /path/to/private/skills]",
      "    [--public-root /path/to/content/skills]",
      "    [--out /path/to/report.json]",
      "    [--strict]",
      "    [--only skill-a,skill-b]"
    ].join("\n")
  );
}

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] || null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function listDirs(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function resolveSkillMd(dirPath) {
  const candidates = ["SKILL.md", "skill.md"];
  for (const name of candidates) {
    const candidate = path.join(dirPath, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function walkMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const stack = [dirPath];
  const files = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const absPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absPath);
        continue;
      }
      if (/\.md$/i.test(entry.name)) {
        files.push(absPath);
      }
    }
  }

  return files.sort();
}

function relPaths(files, rootDir) {
  return files.map((file) => path.relative(rootDir, file).replace(/\\/g, "/"));
}

function normalizeHeading(value) {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[\u2000-\u206F\u2E00-\u2E7F'".,!?():;[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadings(markdownText) {
  const headings = [];
  const seen = new Set();
  for (const rawLine of markdownText.split("\n")) {
    const line = rawLine.trim();
    const match = line.match(/^(#{1,3})\s+(.+?)\s*$/);
    if (!match) continue;
    const normalized = normalizeHeading(match[2]);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    headings.push(normalized);
  }
  return headings;
}

function extractSensitiveFindings(text, fileLabel) {
  const findings = [];
  const checks = [
    {
      id: "absolute-user-path",
      severity: "high",
      regex: /\/Users\/[^\s)`"'<>]+/g
    },
    {
      id: "private-codex-home",
      severity: "high",
      regex: /~\/\.codex\/[^\s)`"'<>]+/g
    },
    {
      id: "auth-state-file",
      severity: "high",
      regex: /\bstorage_state\.json\b/gi
    },
    {
      id: "potential-secret-value",
      severity: "high",
      regex: /\b(?:ghp|gho|ghu|github_pat|sk)_[A-Za-z0-9_]{16,}\b/g
    },
    {
      id: "webhook-url",
      severity: "high",
      regex: /https?:\/\/hooks\.[^\s)"']+/gi
    },
    {
      id: "inline-credential-assignment",
      severity: "high",
      regex: /\b(?:token|secret|api[_ -]?key|pat)\b\s*[:=]\s*["']?[A-Za-z0-9._-]{12,}/gi
    }
  ];

  for (const check of checks) {
    const matches = text.match(check.regex);
    if (!matches || matches.length === 0) continue;
    findings.push({
      severity: check.severity,
      code: check.id,
      detail: `${fileLabel}: matched ${check.id} pattern (${matches.length} hit${matches.length > 1 ? "s" : ""})`
    });
  }

  return findings;
}

function computeSetCoverage(baseList, compareList) {
  if (baseList.length === 0) return 1;
  const compare = new Set(compareList);
  let matched = 0;
  for (const item of baseList) {
    if (compare.has(item)) matched += 1;
  }
  return matched / baseList.length;
}

function evaluateSkill(slug, privateRoot, publicRoot) {
  const privateDir = path.join(privateRoot, slug);
  const publicDir = path.join(publicRoot, slug);
  const issues = [];

  const privateSkillMd = resolveSkillMd(privateDir);
  const publicSkillMd = resolveSkillMd(publicDir);

  if (!publicSkillMd) {
    issues.push({
      severity: "high",
      code: "missing-public-skill-md",
      detail: `content/skills/${slug} has no SKILL.md`
    });
  }

  if (!privateSkillMd) {
    issues.push({
      severity: "low",
      code: "missing-private-source",
      detail: "private source not found for this slug"
    });
    return {
      slug,
      private_present: false,
      public_present: Boolean(publicSkillMd),
      metrics: {},
      issues
    };
  }

  const privateText = readText(privateSkillMd);
  const publicText = publicSkillMd ? readText(publicSkillMd) : "";

  const privateLines = privateText.split(/\r?\n/).length;
  const publicLines = publicText.split(/\r?\n/).length;
  const compressionRatio = privateLines > 0 ? Number((publicLines / privateLines).toFixed(3)) : 1;

  const privateHeadings = extractHeadings(privateText);
  const publicHeadings = extractHeadings(publicText);
  const headingCoverage = Number(computeSetCoverage(privateHeadings, publicHeadings).toFixed(3));

  if (privateLines >= 80 && compressionRatio < 0.45) {
    issues.push({
      severity: "medium",
      code: "method-compression-risk",
      detail: `public SKILL.md is much shorter (ratio ${compressionRatio}, private=${privateLines} lines, public=${publicLines} lines)`
    });
  }

  if (privateHeadings.length >= 6 && headingCoverage < 0.5) {
    issues.push({
      severity: "medium",
      code: "low-heading-coverage",
      detail: `public headings cover ${Math.round(headingCoverage * 100)}% of private headings (${publicHeadings.length}/${privateHeadings.length})`
    });
  }

  const privateRefRoot = path.join(privateDir, "references");
  const publicRefRoot = path.join(publicDir, "references");
  const privateRefFiles = relPaths(walkMarkdownFiles(privateRefRoot), privateRefRoot);
  const publicRefFiles = relPaths(walkMarkdownFiles(publicRefRoot), publicRefRoot);
  const referenceCoverage = Number(computeSetCoverage(privateRefFiles, publicRefFiles).toFixed(3));

  if (privateRefFiles.length > 0 && publicRefFiles.length === 0) {
    issues.push({
      severity: "medium",
      code: "missing-public-reference-pack",
      detail: `private references exist (${privateRefFiles.length} files), but public references/ is empty`
    });
  } else if (privateRefFiles.length > 0 && referenceCoverage < 0.6) {
    issues.push({
      severity: "medium",
      code: "partial-reference-pack-coverage",
      detail: `public references cover ${Math.round(referenceCoverage * 100)}% of private references`
    });
  }

  if (publicSkillMd) {
    issues.push(...extractSensitiveFindings(publicText, `content/skills/${slug}/SKILL.md`));
  }
  for (const rel of publicRefFiles) {
    const abs = path.join(publicRefRoot, rel);
    const text = readText(abs);
    issues.push(...extractSensitiveFindings(text, `content/skills/${slug}/references/${rel}`));
  }

  return {
    slug,
    private_present: true,
    public_present: Boolean(publicSkillMd),
    metrics: {
      private_lines: privateLines,
      public_lines: publicLines,
      compression_ratio: compressionRatio,
      private_heading_count: privateHeadings.length,
      public_heading_count: publicHeadings.length,
      heading_coverage: headingCoverage,
      private_reference_count: privateRefFiles.length,
      public_reference_count: publicRefFiles.length,
      reference_coverage: referenceCoverage
    },
    issues
  };
}

function summarize(skills) {
  const summary = {
    skills_scanned: skills.length,
    skills_with_issues: 0,
    issue_counts: {
      high: 0,
      medium: 0,
      low: 0
    }
  };

  for (const skill of skills) {
    if (!skill.issues || skill.issues.length === 0) continue;
    summary.skills_with_issues += 1;
    for (const issue of skill.issues) {
      summary.issue_counts[issue.severity] = (summary.issue_counts[issue.severity] || 0) + 1;
    }
  }

  return summary;
}

function redactPathForReport(pathValue) {
  return String(pathValue || "")
    .replace(/^\/Users\/[^/]+/i, "/Users/<redacted-user>")
    .replace(/^\/home\/[^/]+/i, "/home/<redacted-user>");
}

function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    usage();
    return;
  }

  const privateRoot = path.resolve(getArg("--private-root") || defaultPrivateRoot);
  const publicRoot = path.resolve(getArg("--public-root") || defaultPublicRoot);
  const outPath = path.resolve(getArg("--out") || defaultOutPath);
  const strict = hasFlag("--strict");
  const onlyArg = getArg("--only");
  const onlySet = onlyArg
    ? new Set(
        onlyArg
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    : null;

  const allPublicSlugs = listDirs(publicRoot);
  const slugs = onlySet ? allPublicSlugs.filter((slug) => onlySet.has(slug)) : allPublicSlugs;

  const skills = slugs.map((slug) => evaluateSkill(slug, privateRoot, publicRoot));
  const summary = summarize(skills);

  const report = {
    generated_at: new Date().toISOString(),
    config: {
      private_root: redactPathForReport(privateRoot),
      public_root: redactPathForReport(publicRoot),
      strict
    },
    summary,
    skills
  };

  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n");

  console.log(`Wrote report: ${path.relative(root, outPath)}`);
  console.log(
    `Scanned ${summary.skills_scanned} skills, ${summary.skills_with_issues} with issues, high=${summary.issue_counts.high}, medium=${summary.issue_counts.medium}, low=${summary.issue_counts.low}.`
  );

  const shouldFail = summary.issue_counts.high > 0 || (strict && summary.issue_counts.medium > 0);
  if (shouldFail) {
    console.error("Sync parity audit failed. Review report details before publishing.");
    process.exitCode = 1;
  }
}

main();
