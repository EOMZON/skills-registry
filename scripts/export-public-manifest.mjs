import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const outputSkillsDir = path.join(root, "drafts", "skills");
const publicRepoUrl = (process.env.SKILLS_REGISTRY_PUBLIC_REPO_URL || "https://github.com/EOMZON/skills-registry")
  .replace(/\.git$/, "")
  .replace(/\/+$/, "");

function usage() {
  console.log("Usage: node scripts/export-public-manifest.mjs --src /absolute/path/to/private-skill [--dest slug]");
}

function getArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readSkillMd(srcDir) {
  const candidates = ["SKILL.md", "skill.md"];
  for (const name of candidates) {
    const file = path.join(srcDir, name);
    if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  }
  throw new Error(`No SKILL.md found in ${srcDir}`);
}

function extractFrontmatterValue(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  if (!match) return null;
  return match[1].trim().replace(/^['"]|['"]$/g, "");
}

function extractInvoke(text, fallbackSlug) {
  const explicit = text.match(/\$[a-z0-9-]+/i);
  if (explicit) return explicit[0];
  return `$${fallbackSlug}`;
}

function detectDependencies(text) {
  const lower = text.toLowerCase();
  const bins = [];
  const services = [];
  const reviewFlags = [];

  if (lower.includes("vercel")) services.push("vercel");
  if (lower.includes("github")) services.push("github");
  if (lower.includes("playwright")) bins.push("playwright");
  if (lower.includes("node")) bins.push("node");
  if (lower.includes("python")) bins.push("python3");

  const stateful =
    /storage_state|cookie|session|login state|\.env|token|webhook|pat|secret/i.test(text);

  if (/\/Users\/|~\/\.codex|\.env|storage_state\.json/i.test(text)) {
    reviewFlags.push("contains-local-path-or-state");
  }
  if (/token|secret|webhook|pat|gh_token|github_token|openai_api_key/i.test(text)) {
    reviewFlags.push("contains-secret-reference");
  }

  return {
    dependencies: {
      bins: [...new Set(bins)],
      services: [...new Set(services)],
      stateful
    },
    reviewFlags: [...new Set(reviewFlags)]
  };
}

function sanitizeMarkdown(text) {
  return text
    .replace(/\/Users\/[^\s)`"'<>]+/g, "/absolute/path/to/source")
    .replace(/~\/\.codex\/[^\s)`"'<>]+/g, "/absolute/path/to/source")
    .replace(/\b[A-Z0-9_]*(TOKEN|SECRET|WEBHOOK|API_KEY|PAT)\b/g, "REDACTED_CREDENTIAL_NAME")
    .replace(/storage_state\.json/gi, "AUTH_STATE_FILE")
    .replace(/\bskills\.zondev\.top\b/gi, "your-skills-domain.example")
    .replace(/\bmusic\.zondev\.top\b/gi, "your-site-domain.example");
}

function firstParagraph(text) {
  const body = text.replace(/^---[\s\S]*?---\n?/, "").trim();
  const parts = body.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  return parts.find((part) => !part.startsWith("#")) || "";
}

function buildManifest({ slug, skillText }) {
  const title = extractFrontmatterValue(skillText, "name") || slug;
  const summary =
    extractFrontmatterValue(skillText, "description") ||
    firstParagraph(skillText) ||
    `${title} public skill`;
  const invoke = extractInvoke(skillText, slug);
  const { dependencies, reviewFlags } = detectDependencies(skillText);

  return {
    schema_version: "1.0.0",
    id: slug,
    title,
    summary,
    scene: "",
    keywords: [],
    invoke,
    use_when: [],
    avoid_when: [],
    inputs: [],
    returns: [],
    dependencies,
    stability: "experimental",
    visibility: dependencies.stateful ? "sanitized" : "public",
    source_repo: publicRepoUrl,
    updated_at: new Date().toISOString().slice(0, 10),
    review_flags: [...new Set(["scene-needs-review", ...reviewFlags])]
  };
}

function main() {
  const src = getArg("--src");
  const dest = getArg("--dest");
  if (!src) {
    usage();
    process.exit(1);
  }

  const srcDir = path.resolve(src);
  const slug = dest || path.basename(srcDir);
  const skillText = readSkillMd(srcDir);
  const manifest = buildManifest({ slug, skillText });
  const publicSkillMd = sanitizeMarkdown(skillText);

  const targetDir = path.join(outputSkillsDir, slug);
  ensureDir(targetDir);
  fs.writeFileSync(path.join(targetDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  fs.writeFileSync(path.join(targetDir, "SKILL.md"), publicSkillMd);

  console.log(`Exported public candidate for "${slug}" to ${targetDir}`);
  console.log("Draft only: manual review still required before promoting into content/skills.");
  console.log("You must still set scene, keywords, use_when, avoid_when, inputs, returns, and review redaction quality.");
}

main();
