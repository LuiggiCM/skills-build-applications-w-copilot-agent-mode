# Octofit Tracker Frontend

## Environment

This React app uses Vite environment variables. Set `VITE_CODESPACE_NAME` in `.env.local` or another `.env` file.

Example:

```env
VITE_CODESPACE_NAME=literate-orbit-74r49qr7p4p2pgr6
```

The application builds API URLs like:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `https://localhost:8000/api`.

## Start

```bash
npm install
npm run dev
```
