#!/usr/bin/env bash
# Deploy the Carbon manual as a static site to GitHub Pages.
#
#   REPO=owner/name BASE_PATH=/name ./deploy.sh
#
# Defaults target chasefostermfg/carbon-manual served at /carbon-manual.
# The repo must already exist and Pages should be set to deploy from the
# `gh-pages` branch (root). For docs.carbon.ms (served at the domain root)
# build with BASE_PATH="" instead.
set -euo pipefail

REPO="${REPO:-chasefostermfg/carbon-manual}"
BASE_PATH="${BASE_PATH:-/carbon-manual}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

OWNER="${REPO%%/*}"
NAME="${REPO#*/}"

echo "==> Building static export (base path: '${BASE_PATH:-<root>}')"
rm -rf out .next
BUILD_EXPORT=true NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npm run build

# GitHub Pages runs Jekyll by default, which ignores folders starting with "_"
# (Next puts assets in _next). This disables that.
touch out/.nojekyll

# Land the bare site URL on the User Manual (the framework docs stay reachable
# via the sidebar toggle / their own URLs).
cat > out/index.html <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./manual/" />
    <link rel="canonical" href="./manual/" />
    <title>Carbon Manual</title>
    <style>
      html { font-family: system-ui, -apple-system, sans-serif; background: #0b0d0e; color: #e7e7e7; }
      body { display: grid; place-items: center; height: 100vh; margin: 0; }
      a { color: #3b82f6; }
    </style>
  </head>
  <body><p>Redirecting to the <a href="./manual/">Carbon Manual</a>…</p></body>
</html>
HTML

echo "==> Publishing out/ to gh-pages on ${REPO}"
gh auth setup-git >/dev/null 2>&1 || true
cd out
rm -rf .git
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.email=deploy@carbon.ms -c user.name="carbon-deploy" commit -qm "Deploy Carbon manual"
git push -fq "https://github.com/${REPO}.git" gh-pages
rm -rf .git
cd ..

echo "==> Done. Live at: https://${OWNER}.github.io/${NAME}/"
