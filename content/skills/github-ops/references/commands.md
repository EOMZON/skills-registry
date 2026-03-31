# GitHub Ops — Commands

> 目标：用最少的命令覆盖常见 GitHub 日常操作。默认用 `gh`，必要时 `git`，补齐用 `gh api`。

## 0) Quick Triage

```bash
gh --version
gh auth status
gh config get -h github.com git_protocol
```

```bash
git rev-parse --is-inside-work-tree 2>/dev/null || echo "not a git repo"
git remote -v 2>/dev/null || true
```

## 1) Auth

```bash
gh auth login
gh auth status
gh auth logout --hostname github.com
```

注意：`gh auth token` 会直接输出 token，默认不要用，也不要贴到聊天里。

## 2) Repo

```bash
gh repo create <name> --private --source=. --remote=origin --push
gh repo create <name> --template <OWNER>/<TEMPLATE> --private
gh repo clone <OWNER>/<REPO>
gh repo fork <OWNER>/<REPO> --clone
gh repo view <OWNER>/<REPO> --json name,owner,defaultBranchRef,visibility,url
gh repo set-default <OWNER>/<REPO>
gh repo edit --visibility private
gh repo edit --homepage "https://example.com"
```

## 3) Git Essentials

```bash
git fetch --all --prune
git switch -c feat/<name>
git push -u origin HEAD
git rebase origin/main
git push --force-with-lease
git revert <sha>
git reflog
```

## 4) PR

```bash
gh pr create --fill
gh pr create --base main --head feat/<name> --title "..." --body "..."
gh pr view <number> --json title,state,author,baseRefName,headRefName,url
gh pr checkout <number>
gh pr review <number> --approve
gh pr review <number> --comment -b "..."
gh pr merge <number> --squash --delete-branch
```

## 5) Issue

```bash
gh issue list
gh issue view <number> --web
gh issue create --title "..." --body "..."
gh issue comment <number> -b "..."
gh issue close <number>
```

## 6) Actions

```bash
gh workflow list
gh workflow view <workflow-name>
gh run list
gh run watch <run-id>
gh run download <run-id>
```

## 7) Secrets And Vars

```bash
gh secret list
gh secret set <name>
gh variable list
gh variable set <name> --body "..."
```

## 8) API Gap Fill

```bash
gh api repos/{owner}/{repo}
gh api repos/{owner}/{repo}/branches
gh api -X POST repos/{owner}/{repo}/milestones -f title="v1.0"
```
