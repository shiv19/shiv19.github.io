#!/bin/bash

# Script to scaffold a new micro post
# Usage: sh write_micro.sh some_post_name

if [ -z "$1" ]; then
    echo "Usage: sh write_micro.sh <post_name>"
    echo "Example: sh write_micro.sh my_first_micro"
    exit 1
fi

# Convert underscores to hyphens and lowercase
POST_SLUG=$(echo "$1" | tr '_' '-' | tr '[:upper:]' '[:lower:]')

# Get current date in YYYY-MM-DD format
DATE=$(date +%Y-%m-%d)

# Get full datetime with timezone for front matter (Pacific/Auckland UTC+13)
# Format timezone with colon (e.g., +13:00 instead of +1300)
RAW_DATETIME=$(TZ="Pacific/Auckland" date +"%Y-%m-%d %H:%M:%S %z")
DATETIME=$(echo "$RAW_DATETIME" | sed 's/\([+-][0-9][0-9]\)\([0-9][0-9]\)$/\1:\2/')

# Create filename
FILENAME="_micros/${DATE}-${POST_SLUG}.md"

# Check if file already exists
if [ -f "$FILENAME" ]; then
    echo "Error: File $FILENAME already exists!"
    exit 1
fi

# Create the file with front matter template
cat > "$FILENAME" << EOF
---
title: ""
date: ${DATETIME}
---

EOF

echo "Created: $FILENAME"
echo "Open the file and start writing your micro post!"