# GitHub API Quick Notes (Repo Creation)

## Auth Options

- `gh auth login`
- `GITHUB_TOKEN` or `GH_TOKEN` in the current shell
- env file path supplied by the caller, such as `/path/to/.env`

## Endpoints

- `GET /user`
- `GET /repos/{owner}/{repo}`
- `POST /user/repos`
- `POST /orgs/{org}/repos`

## Typical Payload

```json
{
  "name": "my-repo",
  "description": "...",
  "private": false,
  "has_issues": false,
  "has_projects": false,
  "has_wiki": false,
  "auto_init": false
}
```

## Header Shape

- `Authorization: token <GITHUB_TOKEN>`
