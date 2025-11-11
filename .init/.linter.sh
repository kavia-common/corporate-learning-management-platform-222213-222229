#!/bin/bash
cd /home/kavia/workspace/code-generation/corporate-learning-management-platform-222213-222229/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

