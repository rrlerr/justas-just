# MitsuMegami - Premium Industrial Printing Solutions

A cutting-edge, premium eCommerce website for industrial printing solutions featuring unique 3D effects, glass-morphism design, and innovative interactions.

## Features

- **Avant-garde Design**: Geometric patterns with asymmetrical layouts
- **Premium Glass-morphism**: Translucent elements with sophisticated effects
- **3D Transformations**: Card animations with depth layers
- **Custom Color Palette**: Midnight purple, electric blue, platinum silver
- **Interactive Elements**: Magnetic hover effects and animated cursors
- **Responsive Design**: Mobile-first approach with unique breakpoints
- **Premium Animations**: Framer Motion with complex 3D effects
- **Particle System**: Interactive background particles
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS with extensive customization
- Framer Motion for advanced animations
- Vite for development and building
- Lucide React for icons
- TanStack Query for data fetching

### Backend
- Express.js with TypeScript
- In-memory storage for products
- RESTful API design
- Mock data with realistic specifications

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5000`

3. **Build**
   ```bash
   npm run build
   ```

4. **Production**
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product
- `GET /api/cart/:userId` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

## Project Structure

