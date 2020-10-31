#!env bash

npm run build && rm -rf docs/static && rm docs/precache-manifest.* && cp -r build/* docs && git add docs
