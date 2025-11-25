# Greeny - Sustainable Solutions Platform

## Overview

Greeny is a full-stack web application for a sustainable investment advisory firm. The platform showcases the company's services, team, transactions, insights, and career opportunities while providing an administrative dashboard for content management. Built with React on the frontend and Express.js on the backend, it uses PostgreSQL for data persistence and follows a modern, component-based architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript for type safety
- Wouter for lightweight client-side routing
- Vite as the build tool and development server

**UI Component System**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS v4 for styling with custom green/sustainability theme
- Component variants managed through class-variance-authority
- Responsive design with mobile-first approach

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React Hook Form for form state and validation
- No global state library - relies on server state and local component state

**Design System**
- Custom Greeny brand colors (forest green primary, light mint secondary)
- Montserrat for headings, Inter for body text
- Consistent spacing, shadows, and border radius through design tokens
- Dark mode support built into the component system

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Separate development and production entry points (index-dev.ts, index-prod.ts)
- Development mode uses Vite middleware for HMR
- Production mode serves static built files

**API Structure**
- RESTful API endpoints under `/api` prefix
- CRUD operations for: articles, team members, transactions, vacancies
- Request validation using Zod schemas
- JSON request/response format

**Development vs Production**
- Development: Vite dev server integrated as Express middleware for hot module replacement
- Production: Pre-built static assets served from `dist/public`
- Conditional plugin loading based on environment (Replit-specific tools only in dev)

### Data Layer

**Database**
- PostgreSQL via Neon serverless
- Drizzle ORM for type-safe database queries
- WebSocket support for serverless connection pooling
- Schema defined in `shared/schema.ts` for type sharing between frontend and backend

**Schema Design**
- Users: Basic authentication table with username/password
- Articles: Content pieces with type (articles/publications/news), title, summary, content, date
- Team Members: Staff profiles with name, position, bio, image, display order
- Transactions: Financial deals with project details, sector, role, value, status
- Vacancies: Job postings with title, department, location, type, description, requirements

**Data Validation**
- Zod schemas generated from Drizzle tables using drizzle-zod
- Shared validation between client and server
- Runtime type checking on API boundaries

### Code Organization

**Monorepo Structure**
- `/client` - React frontend application
- `/server` - Express backend application  
- `/shared` - Shared types and schemas
- Path aliases configured: `@/` for client, `@shared/` for shared code

**Component Structure**
- `/client/src/components/ui` - Reusable UI components from shadcn/ui
- `/client/src/components` - Application-specific components
- `/client/src/pages` - Route components (home, about, capabilities, etc.)
- `/client/src/hooks` - Custom React hooks

### Build Process

**Development**
- Client: Vite dev server on port 5000 with HMR
- Server: tsx for TypeScript execution with nodemon-style watching
- Integrated dev experience with Vite middleware in Express

**Production**
- Client: Vite builds to `dist/public`
- Server: esbuild bundles to `dist/index.js` as ESM
- Single Node.js process serves both API and static files

## External Dependencies

**Database**
- Neon Serverless PostgreSQL (via `@neondatabase/serverless`)
- Connection string required in `DATABASE_URL` environment variable
- WebSocket support for connection pooling

**UI Libraries**
- Radix UI primitives for accessible component foundation
- Lucide React for icons
- Tailwind CSS for utility-first styling
- Embla Carousel for carousel components

**Development Tools**
- Replit-specific plugins (cartographer, dev-banner, runtime-error-modal) for enhanced DX
- Custom Vite plugin for meta image URL updates based on deployment domain

**Form Handling**
- React Hook Form for form state management
- Hookform Resolvers for Zod schema integration

**Data Fetching**
- TanStack Query for async state management
- Custom query client configuration with authentication handling

**Build Tools**
- Vite for frontend bundling
- esbuild for backend bundling
- Drizzle Kit for database migrations
- TypeScript compiler for type checking