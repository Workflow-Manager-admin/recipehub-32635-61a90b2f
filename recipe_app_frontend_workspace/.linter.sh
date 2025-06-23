#!/bin/bash
cd /home/kavia/workspace/code-generation/recipehub-32635-61a90b2f/recipe_app_frontend_workspace/recipe_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

