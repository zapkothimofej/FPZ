#!/bin/bash
# Ralph — Autonomous PRD Executor for FPZ LeadFinder
# Usage: bash ralph.sh [max_iterations]
# Default: 45 iterations

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PRD_FILE="$PROJECT_DIR/prd.json"
PROGRESS_FILE="$PROJECT_DIR/progress.txt"
SPECS_DIR="$PROJECT_DIR/specs"
MAX_ITERATIONS="${1:-45}"
BRANCH_NAME=$(cat "$PRD_FILE" | python3 -c "import sys,json; print(json.load(sys.stdin)['branchName'])" 2>/dev/null || echo "ralph/leadfinder")

echo "============================================"
echo "  Ralph — FPZ LeadFinder"
echo "  Max Iterations: $MAX_ITERATIONS"
echo "  Branch: $BRANCH_NAME"
echo "  PRD: $PRD_FILE"
echo "  Specs: $SPECS_DIR"
echo "============================================"
echo ""

# Navigate to project root (FPZ monorepo)
cd "$PROJECT_DIR/.."

# Create branch if not exists
git checkout -B "$BRANCH_NAME" 2>/dev/null || git checkout "$BRANCH_NAME"

cd "$PROJECT_DIR"

for i in $(seq 1 "$MAX_ITERATIONS"); do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Iteration $i / $MAX_ITERATIONS"
    echo "  $(date '+%Y-%m-%d %H:%M:%S')"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Log iteration start
    echo "--- Iteration $i started at $(date '+%H:%M:%S') ---" >> "$PROGRESS_FILE"

    # Find the current story ID
    CURRENT_STORY=$(python3 -c "
import json, sys
try:
    with open(sys.argv[1]) as f:
        data = json.load(f)
    for s in data['userStories']:
        if not s['passes']:
            print(s['id'])
            sys.exit(0)
    print('DONE')
except Exception as e:
    print('UNKNOWN', file=sys.stderr)
    print(str(e), file=sys.stderr)
    print('UNKNOWN')
" "$PRD_FILE" 2>/tmp/ralph-err.log || echo "UNKNOWN")

    if [ "$CURRENT_STORY" = "DONE" ]; then
        echo "All stories already complete!"
        echo "DONE — All stories already complete ($(date))" >> "$PROGRESS_FILE"
        break
    fi

    echo "  Current story: $CURRENT_STORY"

    # Check if spec file exists for this story
    SPEC_CONTENT=""
    SPEC_FILE=$(find "$SPECS_DIR" -name "${CURRENT_STORY}*" -type f 2>/dev/null | head -1)
    if [ -n "$SPEC_FILE" ]; then
        SPEC_CONTENT="

## Detailed Spec File
The following spec file contains EXACT code to write for this story. Follow it precisely.
File: $SPEC_FILE

$(cat "$SPEC_FILE")
"
        echo "  Spec file found: $SPEC_FILE"
    else
        echo "  No spec file found, using acceptance criteria only"
    fi

    # Run Claude Code with the PRD context
    claude --print --dangerously-skip-permissions \
        "You are Ralph, an autonomous developer agent. Your job is to implement user stories from a PRD, one at a time.

## Context
- Working directory: $PROJECT_DIR
- This project is inside the FPZ monorepo at D:/FPZ/fpz-leadfinder/
- PRD file: $PRD_FILE
- Progress file: $PROGRESS_FILE
- Specs directory: $SPECS_DIR (contains detailed implementation specs per story)
- This is iteration $i of $MAX_ITERATIONS
- Current story to implement: $CURRENT_STORY

## Instructions

1. Read prd.json and find story $CURRENT_STORY (the first story where \"passes\": false)
2. Read progress.txt to understand what was done in previous iterations
3. Check if a spec file exists in specs/ for this story (e.g. specs/US-001-*.md). If yes, read it — it contains EXACT code to write.
4. Implement that ONE story completely:
   - Read ALL existing code files before making changes (understand what's already built)
   - Follow the acceptance criteria AND the spec file exactly
   - If the spec file contains exact code, use that code verbatim (copy-paste, don't paraphrase)
   - If there's no spec file, implement based on acceptance criteria using your best judgment
   - Write clean TypeScript: no \`any\` type (use \`unknown\` with type guards), strict mode, no console.log (only console.warn/error)
   - Run typecheck (npx tsc --noEmit) and fix ALL errors before committing
   - Run the dev server (npm run dev) if UI changes to verify they render
5. After implementing, update prd.json: set that story's \"passes\": true and add a short note about what was done in the \"notes\" field
6. Append to progress.txt: the story ID, what files were created/modified, and any issues encountered
7. Git commit: stage only the relevant files (not node_modules, .next, .env), commit message: \"feat(leadfinder): $CURRENT_STORY — [story title from prd.json]\"

## Critical Rules
- ONE story per iteration, no more
- If a story's code depends on code from a previous story that doesn't exist yet (e.g., imports a module not yet created), create a minimal stub/placeholder so typecheck passes, then implement fully in the correct story's iteration
- If you encounter npm install issues, try alternative approaches (different package version, manual install)
- If npx tsc --noEmit shows errors, fix them ALL before committing — do NOT commit with type errors
- If shadcn components are missing, install them: npx shadcn@latest add [component]
- Do NOT modify stories that are already marked as \"passes\": true
- Do NOT skip stories — implement in priority order
- If all stories pass, write \"DONE — All 45 stories completed\" to progress.txt and stop

## Tech Stack (exact versions)
- Next.js 16 (App Router, Server Components, Server Actions)
- React 19
- TypeScript 5 (strict: true, noUncheckedIndexedAccess: true)
- Tailwind CSS v4 (dark mode via class strategy)
- shadcn/ui (zinc base color, CSS variables)
- Prisma ORM with SQLite (no Json type — use String and JSON.parse/stringify)
- Groq SDK (model: llama-3.3-70b-versatile)
- cheerio for HTML parsing
- Recharts for charts
- jsPDF + jspdf-autotable for PDF
- @tanstack/react-table for data tables
- sonner for toast notifications
- lucide-react for icons

## Design System
- Background: bg-zinc-950 (body), bg-zinc-900 (cards/sidebar), bg-zinc-800 (borders/hover)
- Text: text-zinc-50 (primary), text-zinc-300 (secondary), text-zinc-400 (tertiary), text-zinc-500 (muted)
- Accent: blue-500 for primary actions
- Score colors: red-500 (0-40), yellow-500 (41-70), green-500 (71-100)
- Status: NEW=zinc-700, CONTACTED=blue-500/20, OFFER_SENT=yellow-500/20, WON=green-500/20, REJECTED=red-500/20
- Font: Geist (next/font/google)
- Dark mode ONLY (no light mode toggle)
$SPEC_CONTENT
" 2>&1 | tee -a "$PROGRESS_FILE"

    # Check if all stories pass
    ALL_PASS=$(python3 -c "
import json, sys
with open(sys.argv[1]) as f:
    data = json.load(f)
all_pass = all(s['passes'] for s in data['userStories'])
print('true' if all_pass else 'false')
" "$PRD_FILE" 2>/dev/null || echo "false")

    if [ "$ALL_PASS" = "true" ]; then
        echo ""
        echo "============================================"
        echo "  ALL 45 STORIES COMPLETE!"
        echo "  Finished at iteration $i"
        echo "============================================"
        echo "DONE — All 45 stories completed at iteration $i ($(date))" >> "$PROGRESS_FILE"
        break
    fi

    echo ""
    echo "  Iteration $i complete. Continuing..."
    echo ""
done

echo ""
echo "Ralph finished. Check progress.txt for details."
echo "Branch: $BRANCH_NAME"
echo "Run 'git log --oneline' to see commits."
