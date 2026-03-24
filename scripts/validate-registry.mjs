import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content");
const scenesPath = path.join(contentDir, "scenes.json");
const sceneGuidesPath = path.join(contentDir, "scene-guides.json");
const registryPath = path.join(contentDir, "registry.json");
const skillsDir = path.join(contentDir, "skills");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exitCode = 1;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateManifest(slug, manifest, sceneIds) {
  const required = [
    "schema_version",
    "id",
    "title",
    "summary",
    "scene",
    "keywords",
    "invoke",
    "use_when",
    "avoid_when",
    "inputs",
    "returns",
    "updated_at"
  ];

  for (const key of required) {
    if (!(key in manifest)) {
      fail(`${slug}: missing required field "${key}"`);
    }
  }

  if (manifest.id !== slug) fail(`${slug}: manifest.id must match folder name`);
  if (!isNonEmptyString(manifest.title)) fail(`${slug}: title must be non-empty`);
  if (!isNonEmptyString(manifest.summary)) fail(`${slug}: summary must be non-empty`);
  if (!sceneIds.has(manifest.scene)) fail(`${slug}: unknown scene "${manifest.scene}"`);
  if (!isStringArray(manifest.keywords)) fail(`${slug}: keywords must be string[]`);
  if (!isStringArray(manifest.use_when)) fail(`${slug}: use_when must be string[]`);
  if (!isStringArray(manifest.avoid_when)) fail(`${slug}: avoid_when must be string[]`);
  if (!isStringArray(manifest.returns)) fail(`${slug}: returns must be string[]`);
  if (!Array.isArray(manifest.inputs)) fail(`${slug}: inputs must be array`);

  for (const input of manifest.inputs || []) {
    if (!isNonEmptyString(input.name)) fail(`${slug}: each input needs a non-empty name`);
    if (typeof input.required !== "boolean") fail(`${slug}: each input.required must be boolean`);
    if (!isNonEmptyString(input.description)) fail(`${slug}: each input needs description`);
  }
}

function validateRegistry(registry, manifestsById, sceneIds) {
  if (!Array.isArray(registry.skills)) fail("registry.skills must be an array");
  if (!Array.isArray(registry.scenes)) fail("registry.scenes must be an array");
  if (registry.total_skills !== registry.skills.length) fail("registry.total_skills must equal registry.skills.length");

  for (const entry of registry.skills || []) {
    if (!manifestsById.has(entry.id)) fail(`registry references missing skill "${entry.id}"`);
    if (!sceneIds.has(entry.scene)) fail(`registry entry "${entry.id}" uses unknown scene "${entry.scene}"`);
  }
}

function validateSceneGuides(sceneGuides, manifestsById, sceneIds) {
  if (!sceneGuides) return;
  if (!Array.isArray(sceneGuides.scenes)) {
    fail("scene-guides.json: scenes must be an array");
    return;
  }

  const allowedStatuses = new Set(["live", "coming-next", "sanitized-later", "private-only"]);

  for (const guide of sceneGuides.scenes) {
    if (!isNonEmptyString(guide.id)) fail("scene-guides.json: each guide needs a non-empty id");
    if (!sceneIds.has(guide.id)) fail(`scene-guides.json: unknown scene "${guide.id}"`);
    if (!allowedStatuses.has(guide.status)) {
      fail(`scene-guides.json: invalid status "${guide.status}" for scene "${guide.id}"`);
    }
    if (!isStringArray(guide.core_tasks)) {
      fail(`scene-guides.json: core_tasks must be string[] for scene "${guide.id}"`);
    }
    if (!isStringArray(guide.starter_ids || [])) {
      fail(`scene-guides.json: starter_ids must be string[] for scene "${guide.id}"`);
    }
    for (const id of guide.starter_ids || []) {
      if (!manifestsById.has(id)) fail(`scene-guides.json: unknown starter skill "${id}" in scene "${guide.id}"`);
    }
    if (!Array.isArray(guide.chains)) {
      fail(`scene-guides.json: chains must be an array for scene "${guide.id}"`);
      continue;
    }
    for (const chain of guide.chains) {
      if (!Array.isArray(chain) || !chain.every((item) => typeof item === "string")) {
        fail(`scene-guides.json: each chain must be string[] for scene "${guide.id}"`);
        continue;
      }
      for (const id of chain) {
        if (!manifestsById.has(id)) fail(`scene-guides.json: unknown chain skill "${id}" in scene "${guide.id}"`);
      }
    }
  }
}

function main() {
  const scenesDoc = readJson(scenesPath);
  const sceneGuides = fs.existsSync(sceneGuidesPath) ? readJson(sceneGuidesPath) : null;
  const registry = readJson(registryPath);
  const sceneIds = new Set((scenesDoc.scenes || []).map((scene) => scene.id));

  const manifestsById = new Map();
  const skillDirs = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const slug of skillDirs) {
    const manifestPath = path.join(skillsDir, slug, "manifest.json");
    const skillMdPath = path.join(skillsDir, slug, "SKILL.md");
    if (!fs.existsSync(manifestPath)) fail(`${slug}: missing manifest.json`);
    if (!fs.existsSync(skillMdPath)) fail(`${slug}: missing SKILL.md`);
    const manifest = readJson(manifestPath);
    validateManifest(slug, manifest, sceneIds);
    manifestsById.set(manifest.id, manifest);
  }

  validateRegistry(registry, manifestsById, sceneIds);
  validateSceneGuides(sceneGuides, manifestsById, sceneIds);

  if (process.exitCode) return;
  console.log(`Validated ${skillDirs.length} skills and registry index successfully.`);
}

main();
