# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitOps preview environments repository enabling isolated testing of LLM-written code. Uses Kubernetes manifests, ArgoCD, and GitHub Actions for automated deployment pipelines with per-branch database schema isolation via Supabase.

## Repository Structure

```
├── applications/                         # Application source code
│   └── atomsized/
│       └── markdown-editor/              # Next.js markdown editor
│           ├── src/                      # App source (pages, components, API)
│           ├── scripts/                  # DB migration scripts
│           └── drizzle/                  # Generated migrations
│
├── infrastructure/
│   ├── applications/                     # K8s manifests for production
│   │   └── atomsized.com/
│   │       ├── app-of-apps.yml           # ArgoCD root application
│   │       └── markdown-editor/          # App K8s resources
│   │           ├── deployment.yml
│   │           ├── service.yml
│   │           ├── ingress.yml
│   │           ├── configmap.yml
│   │           └── kustomization.yml
│   ├── preview-environments/             # Generated preview Application manifests
│   └── argocd/
│       └── preview-environments-app.yml  # Watches preview-environments/
│
└── .github/workflows/
    ├── build-and-push.yml                # Reusable image build workflow
    ├── deploy.yml                        # Production deploy on main push
    ├── preview-environment.yml           # Create preview on PR open
    └── cleanup-preview.yml               # Cleanup on PR close
```

## Commands

### Markdown Editor App

```bash
cd applications/atomsized/markdown-editor

npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate DrizzleORM migrations
npm run db:migrate       # Run migrations (requires DATABASE_URL, DATABASE_SCHEMA)
npm run db:studio        # Open Drizzle Studio
```

## Architecture

### Preview Environment Flow

1. PR opened → `preview-environment.yml` triggers
2. Image built and pushed to DigitalOcean CR as `markdown-editor:pr-{number}`
3. Database schema `preview_{branch}` created in Supabase
4. ArgoCD Application manifest generated in `infrastructure/preview-environments/pr-{number}.yaml`
5. ArgoCD syncs and deploys to `https://{branch}.atomsized.com`
6. PR closed → `cleanup-preview.yml` drops schema, deletes Application manifest, removes image

### Database Schema Isolation

Each preview environment uses a separate PostgreSQL schema in Supabase:
- Production: `public` schema
- Preview: `preview_{branch_name}` schema

Schema is configured via `DATABASE_SCHEMA` env var, managed through ConfigMap.

### Key Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `DATABASE_SCHEMA` | Schema name (public or preview_{branch}) |

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `DIGITALOCEAN_ACCESS_TOKEN` | DO API token for registry auth |
| `DO_REGISTRY_NAME` | Name of DO container registry |
| `SUPABASE_DATABASE_URL` | Supabase DB connection string |

## Adding a New Application

1. Create source in `applications/{org}/{app-name}/`
2. Add Dockerfile with `output: standalone` for Next.js
3. Create K8s manifests in `infrastructure/applications/{domain}/{app-name}/`:
   - `deployment.yml`, `service.yml`, `ingress.yml`, `configmap.yml`
   - `kustomization.yml` listing all resources
4. Add path filter in workflow files for change detection
5. Add build job in `preview-environment.yml` and `deploy.yml`
