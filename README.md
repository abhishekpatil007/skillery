# 🎯 Skillery - Premium Learning Platform

A modern, full-featured learning platform built with Next.js 15, React 19, and TypeScript. Features a beautiful UI, comprehensive course management, video player, and shopping experience.

![Skillery Platform](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop&crop=center)

## ✨ Features

### 🏠 **Landing Page**
- **Hero Parallax**: Stunning 3D parallax effect with course animations
- **Premium Design**: Modern glassmorphism and gradient effects
- **Animated Testimonials**: Infinite scrolling testimonials columns
- **Trust Indicators**: Social proof and conversion optimization

### 📚 **Course Catalog**
- **60+ Realistic Courses**: Comprehensive course database
- **Advanced Filtering**: Category, level, price, rating, duration filters
- **Search & Sort**: Full-text search with multiple sorting options
- **Pagination**: Optimized for large course catalogs

### 🎥 **Video Player**
- **Full-Featured Player**: Custom controls with keyboard shortcuts
- **Language Support**: 10 languages with subtitle toggle
- **Progress Tracking**: Automatic progress saving and resume
- **Picture-in-Picture**: Advanced viewing modes

### 🛒 **E-Commerce**
- **Shopping Cart**: Add/remove courses with price calculations
- **Wishlist**: Save courses for later
- **Checkout Process**: Complete billing and payment flow
- **Coupon System**: Discount code application

### 👨‍🎓 **Learning Experience**
- **Student Dashboard**: Progress tracking and course recommendations
- **Instructor Dashboard**: Course management and analytics
- **Course Creation**: Full course wizard with drag-and-drop
- **Certificates**: Achievement tracking and certification

### 🔐 **Authentication**
- **Premium Auth Pages**: Beautiful sign-in/signup with testimonials
- **Form Validation**: react-hook-form + Zod validation
- **OAuth Ready**: Google/Apple sign-in integration ready
- **User Management**: Complete profile and settings

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion + Motion
- **State**: Zustand with persistence
- **Forms**: react-hook-form + Zod
- **Icons**: Lucide React
- **Video**: HTML5 + HLS.js ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/skillery-frontend.git
cd skillery-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_USE_MOCK=1  # Set to 0 for real API
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            
│   ├── ui/                # Reusable UI components
│   ├── site/              # Site-wide components
│   ├── auth/              # Authentication components
│   ├── cart/              # Shopping cart components
│   └── player/            # Video player components
├── lib/
│   ├── api/               # API integration layer
│   └── validations/       # Zod schemas
├── store/                 # Zustand state management
├── types/                 # TypeScript type definitions
└── data/                  # Mock data for development
```

## 🔌 Backend Integration

The frontend is designed for easy backend integration:

### API Layer
- **Centralized**: All API calls in `/src/lib/api/`
- **Mock Toggle**: Switch between mock and real data
- **Error Handling**: Comprehensive error boundaries
- **Type Safety**: Full TypeScript coverage

### Required Endpoints
- Authentication: `/auth/login`, `/auth/signup`
- Courses: `/courses`, `/courses/:slug`
- User Data: `/me/enrollments`, `/me/progress`
- Shopping: `/cart`, `/checkout`
- Player: `/player-state`, `/notes`

See `/src/lib/api/routes.ts` for complete endpoint list.

## 🎨 Design System

### Components
- **Premium Buttons**: Multiple variants with animations
- **Course Cards**: Flexible grid/list layouts
- **Form Components**: Validated inputs with error states
- **Navigation**: Responsive header with mobile menu

### Animations
- **Parallax Effects**: Smooth scroll-based animations
- **Micro-interactions**: Hover states and transitions
- **Loading States**: Skeleton loaders and spinners

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Progressive Enhancement**: Works without JavaScript

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Features for Development
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type safety
- **Linting**: ESLint + Prettier configuration
- **Component Library**: shadcn/ui components

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```bash
# Build Docker image
docker build -t skillery-frontend .

# Run container
docker run -p 3000:3000 skillery-frontend
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for the learning community**