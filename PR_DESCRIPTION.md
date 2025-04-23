# repo-hygiene-pass-1

This PR implements the repository hygiene tasks to align folder purpose & naming with the blueprint, eliminate duplicate code, add missing documentation, and add architecture guardrails.

## Checklist

### A · Docs & READMEs
- [x] Updated root README.md with Project Layers table, Quick Start, and Design Tokens section
- [x] Created package READMEs:
  - [x] packages/blocks/kit
  - [x] packages/block-kit
  - [x] packages/ui
  - [x] packages/playground/docs
- [x] Created tokens/README.md with Style-Dictionary workflow

### B · Code Cleanup
- [x] Fixed duplicate Button implementation
  - [x] Kept the primitive in packages/blocks/kit
  - [x] Updated packages/block-kit to export from @block-kit/blocks
  - [x] Updated imports and stories

### C · Build / Publish Guard-Rails
- [x] Added proper "files" field to all package.json files
- [x] Added CI step to check package size and ensure correct files are published

### D · Architecture Boundaries
- [x] Added eslint-plugin-boundaries config
  - [x] Enforced rules to prevent packages/blocks/kit from importing higher-level packages
  - [x] Set up rules for packages/block-kit to only import from blocks/kit
- [x] Added unit test to verify architecture boundaries

### E · Storybook Composition
- [x] Configured root Storybook to compose stories from each package
- [x] Cleaned up redundant story files

### F · CI Badges
- [x] Added build-status & size-limit badges to Root README

## Changes

- All code passes `turbo run lint test typecheck`
- Used conventional commits format
- Did not bump package versions (as requested) 