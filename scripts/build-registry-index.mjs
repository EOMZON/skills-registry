import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content");
const scenesPath = path.join(contentDir, "scenes.json");
const registryPath = path.join(contentDir, "registry.json");
const skillsDir = path.join(contentDir, "skills");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function listSkillDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function addCount(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

function addNestedCount(map, groupKey, valueKey) {
  const current = { ...(map.get(groupKey) || {}) };
  current[valueKey] = (current[valueKey] || 0) + 1;
  map.set(groupKey, current);
}

function build() {
  const scenesDoc = readJson(scenesPath);
  const sceneMap = new Map(scenesDoc.scenes.map((scene) => [scene.id, scene]));
  const manifests = listSkillDirs(skillsDir).map((slug) => {
    const manifestPath = path.join(skillsDir, slug, "manifest.json");
    const manifest = readJson(manifestPath);
    return { slug, manifest };
  });

  const sceneCounts = new Map();
  const sceneVisibilityCounts = new Map();
  const visibilityCounts = new Map();
  for (const { manifest } of manifests) {
    const visibility = manifest.visibility || "public";
    addCount(sceneCounts, manifest.scene);
    addCount(visibilityCounts, visibility);
    addNestedCount(sceneVisibilityCounts, manifest.scene, visibility);
  }

  const scenes = scenesDoc.scenes
    .map((scene) => ({
      id: scene.id,
      title: scene.title,
      count: sceneCounts.get(scene.id) || 0,
      visibility_counts: sceneVisibilityCounts.get(scene.id) || {}
    }))
    .sort((a, b) => {
      const ao = sceneMap.get(a.id)?.order || Number.MAX_SAFE_INTEGER;
      const bo = sceneMap.get(b.id)?.order || Number.MAX_SAFE_INTEGER;
      return ao - bo;
    });

  const skills = manifests.map(({ slug, manifest }) => ({
    id: manifest.id,
    title: manifest.title,
    summary: manifest.summary,
    scene: manifest.scene,
    keywords: manifest.keywords,
    invoke: manifest.invoke,
    visibility: manifest.visibility || "public",
    stability: manifest.stability || "stable",
    updated_at: manifest.updated_at,
    manifest_path: `content/skills/${slug}/manifest.json`,
    skill_md_path: `content/skills/${slug}/SKILL.md`
  }));

  const registry = {
    schema_version: "1.0.0",
    generated_at: new Date().toISOString(),
    total_skills: skills.length,
    visibility_counts: Object.fromEntries(visibilityCounts),
    scenes,
    skills
  };

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
  console.log(`Wrote ${path.relative(root, registryPath)} with ${skills.length} skills.`);
}

build();
