set -e
npx webpack --mode=development --target=web
npx webpack --mode=production --target=web --output-filename=dist/[name].min.js --profile --json > dist/stats.json

