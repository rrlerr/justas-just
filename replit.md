# MitsuMegami - Premium Industrial Printing Solutions

## Overview

MitsuMegami is a cutting-edge eCommerce platform specializing in premium industrial printing solutions. The application features a modern, avant-garde design with glass-morphism effects, 3D transformations, and interactive animations. Built as a full-stack TypeScript application, it combines a React frontend with an Express backend to deliver a premium shopping experience for industrial printing equipment.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with extensive customization for premium design
- **Animation**: Framer Motion for complex 3D effects and smooth transitions
- **State Management**: TanStack Query for server state management with local state via React hooks
- **UI Components**: Radix UI primitives with custom theming via shadcn/ui
- **Icons**: Lucide React for consistent iconography

### Backend Architecture
- **Framework**: Express.js with TypeScript for robust API development
- **Storage**: In-memory storage with interfaces designed for future database integration
- **API Design**: RESTful endpoints for product management and cart operations
- **Development**: Hot module replacement via Vite middleware integration

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL (ready for future database integration)
- **Tables**: Users, Products, and CartItems with proper relationships
- **Validation**: Zod schemas for runtime type validation
- **Migration**: Drizzle Kit for schema management

## Key Components

### Core Pages
- **Home Page**: Hero section, product showcase, trust indicators, and footer
- **404 Page**: User-friendly error handling

### UI Components
- **ProductCard**: Interactive cards with hover effects and modal integration
- **ProductDetailsModal**: Full-screen product viewer with specifications
- **CustomCursor**: Interactive cursor that responds to hover states
- **ParticleBackground**: Animated background particles for visual appeal
- **NavBar**: Sticky navigation with glass morphism effects
- **HeroSection**: Premium landing section with 3D floating elements

### Design System
- **Glass Morphism**: Translucent elements with backdrop blur effects
- **3D Transformations**: Card animations with depth and perspective
- **Color Palette**: Midnight purple, electric blue, and platinum silver
- **Typography**: Inter and Poppins fonts for modern aesthetics
- **Animations**: AOS (Animate On Scroll) and Framer Motion integration

## Data Flow

### Product Management
1. Products are stored in memory with mock data seeded on startup
2. API endpoints provide CRUD operations for products
3. Frontend components fetch data using TanStack Query
4. Product cards display information with interactive modals

### User Interactions
1. Users browse products on the homepage
2. Product cards trigger modals for detailed views
3. Smooth scrolling navigation between sections
4. Responsive design adapts to all screen sizes

### Animation Pipeline
1. AOS initializes on page load for scroll-triggered animations
2. Framer Motion handles complex 3D transformations
3. Custom cursor responds to interactive elements
4. Particle system provides ambient background animation

## External Dependencies

### Production Dependencies
- **@radix-ui/react-***: Comprehensive UI primitive library
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library (implied from design requirements)
- **drizzle-orm**: Database ORM with PostgreSQL support
- **@neondatabase/serverless**: Database connection for production

### Development Dependencies
- **vite**: Build tool and development server
- **tailwindcss**: Utility-first CSS framework
- **typescript**: Type checking and development experience
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Express server running on port 5000
- In-memory storage for rapid prototyping
- Replit-specific plugins for cloud development

### Production Build
- Vite builds optimized static assets
- esbuild compiles server code to ES modules
- Static assets served from dist/public directory
- Express server handles API routes and serves frontend

### Database Migration
- Drizzle configuration ready for PostgreSQL connection
- Schema defined in shared/schema.ts for consistency
- Migration scripts available via drizzle-kit

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```