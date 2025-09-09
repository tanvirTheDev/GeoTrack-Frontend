# GeoTrack Frontend

A modern, responsive frontend application for the GeoTrack Real-time Delivery Tracking System built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux Toolkit with RTK Query
- **Role-Based Access**: Super Admin, Organization Admin, and Delivery User roles
- **Real-time Tracking**: Socket.io integration for live location updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: JWT-based authentication with refresh tokens
- **Maps Integration**: Google Maps API ready for location tracking

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Redux Toolkit, RTK Query
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Maps**: Google Maps React, Leaflet.js
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, etc.)
│   ├── forms/          # Form components
│   ├── maps/           # Map-related components
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── admin/          # Organization Admin pages
│   ├── superAdmin/     # Super Admin pages
│   └── shared/         # Shared pages (Profile, Settings)
├── store/              # Redux store and slices
│   └── slices/         # Feature-based slices
├── services/           # API service functions
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── config/             # Configuration files
└── styles/             # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎨 UI Components

The project uses shadcn/ui components with Tailwind CSS for styling:

- **Button**: Various variants and sizes
- **Input**: Form inputs with validation
- **Card**: Content containers
- **Table**: Data tables
- **Dialog**: Modals and overlays
- **Badge**: Status indicators
- **Switch**: Toggle controls
- **Separator**: Visual dividers

## 🔐 Authentication

The app supports three user roles:

- **Super Admin**: Full system access
- **Organization Admin**: Organization-specific access
- **Delivery User**: Basic tracking features

Authentication is handled via JWT tokens with automatic refresh.

## 🗺️ Maps Integration

Ready for Google Maps and Leaflet.js integration:

- Live tracking maps
- Route history visualization
- Location markers and controls

## 📱 Responsive Design

Built with mobile-first approach:

- Mobile-optimized layouts
- Touch-friendly interfaces
- Responsive navigation
- Adaptive components

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 🏗️ Building for Production

```bash
npm run build
```

## 📦 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🔧 Configuration

### Tailwind CSS

Configured with shadcn/ui design tokens and custom utilities.

### TypeScript

Strict mode enabled with comprehensive type definitions.

### Redux Store

Organized by feature with RTK Query for API management.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team.
