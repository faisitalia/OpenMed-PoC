#!/bin/bash
set -e
cd app
npm install --legacy-peer-deps
npm run build
cd ../client
npm install
npm run build
cd ../server
npm install
npm setup
