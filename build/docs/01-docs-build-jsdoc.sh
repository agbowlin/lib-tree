#!/bin/bash
rm -rf docs
node_modules/.bin/jsdoc src --configure lib-tree.jsdoc.json
