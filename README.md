[![Version](https://img.shields.io/github/v/release/Screenly/simple-table-app)](https://github.com/Screenly/simple-table-app/releases/latest)

# Screenly Simple Table App

![Simple Table App Preview](/screenshots/1920x1080.webp)

## Getting Started

```bash
bun install
```

## Deployment

Create and deploy the Edge App:

```bash
screenly edge-app create --name simple-table --in-place
bun run deploy
screenly edge-app instance create
```

### Releasing

Pushes to `main` deploy to stage automatically. To release to production, tag a commit on `main` and push the tag (the workflow refuses tags not on `main`):

```bash
git checkout main && git pull
git tag v26.10.0
git push origin v26.10.0
```

Then publish a GitHub Release whose notes list the pull requests merged since the previous release. Add `--draft` to review the notes before publishing:

```bash
gh release create v26.10.0 --verify-tag --generate-notes --title v26.10.0
```

## Configuration

The app accepts the following settings via `screenly.yml`:

| Setting             | Description                                                                                                                                                   | Type     | Default                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------- |
| `content`           | CSV data to display. The first row is treated as column headers.                                                                                              | required | `Name,Age\nJohn,25\nJane,30` |
| `override_locale`   | Override the default locale with a supported language code                                                                                                    | optional | `en`                         |
| `override_timezone` | Override the default timezone with a supported timezone identifier (e.g., `Europe/London`, `America/New_York`). Defaults to the system timezone if left blank | optional | -                            |
| `title`             | Optional title displayed above the table. Leave empty to hide.                                                                                                | optional | -                            |

## Development

```bash
bun install      # Install dependencies
bun run dev      # Start development server
```

Update `mock-data.yml` with your desired CSV content and settings.

## Testing

```bash
bun run test:unit
```

## Screenshots

Generate screenshots at all supported resolutions:

```bash
bun run screenshots
```

Screenshots are saved to the `screenshots/` directory.
