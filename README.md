# TCK Training

This monorepo contains a shared library, CLI tool, and web application built with TypeScript and Angular.

## Project Structure

- `packages/core` - Shared library containing core functionality
- `packages/cli` - Command-line interface tool
- `apps/web` - Angular web application

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Build all projects:
   ```bash
   pnpm build
   ```

## Development

- Build all projects: `pnpm build`
- Run tests: `pnpm test`
- Lint code: `pnpm lint`

## Publishing

To publish packages to npm:

1. Update version numbers in respective package.json files
2. Run `pnpm publish` in the package directory
