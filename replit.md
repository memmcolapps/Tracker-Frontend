# Admin Platform - Device Management System

## Overview

This is a full-stack admin platform for device management, built with React, Express, and PostgreSQL. The system provides a comprehensive interface for managing organizations, devices, SIMs, users, analytics, and reports through a modern web dashboard.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Pattern**: RESTful APIs with JSON responses
- **Development**: Hot module replacement with Vite integration

### Database Schema
The system uses Drizzle ORM with the following main entities:
- **Organizations**: Business entities with contact information and status
- **Devices**: Hardware devices with IMEI, status, and location tracking
- **SIMs**: Cellular connectivity cards with usage tracking and network provider info
- **Users**: System users with roles (super_admin, admin, user) and organization assignments
- **Reports**: Generated reports with various types and statuses

## Key Components

### Data Management
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for database migration)
- **Schema Validation**: Zod schemas for type-safe data validation
- **Migration Support**: Drizzle-kit for database schema migrations

### User Interface
- **Layout System**: Main layout with sidebar navigation and header
- **Dashboard**: Overview cards with statistics and charts
- **Data Tables**: Reusable table component with pagination
- **Charts**: Recharts integration for data visualization
- **Status Management**: Color-coded status badges for various entity states

### Page Structure
- **Dashboard**: System overview with key metrics
- **Organizations**: Management of business entities
- **Devices**: Device inventory and status monitoring
- **SIMs**: Cellular connectivity management
- **Users**: User account and role management
- **Analytics**: Data visualization and trends
- **Reports**: Report generation and management
- **Settings**: System configuration

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Layer**: Express routes handle HTTP requests and validate data
3. **Storage Layer**: Storage interface abstracts database operations
4. **Database**: PostgreSQL stores persistent data via Drizzle ORM
5. **Response**: JSON responses flow back through the same chain

## External Dependencies

### Frontend Dependencies
- **UI Framework**: Radix UI components for accessibility
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Hookform resolvers
- **Date Handling**: date-fns for date manipulation

### Backend Dependencies
- **Database**: Neon Database for PostgreSQL hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **Database**: Environment-based DATABASE_URL configuration
- **Build Process**: Separate client and server builds

### Production Build
- **Client**: Vite builds optimized React bundle to `dist/public`
- **Server**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Session Management**: PostgreSQL-backed sessions

## Changelog

- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.