# Rick and Morty Character and Location Viewer

A web application built with React + TypeScript that allows you to explore and search for Rick and Morty characters and locations. This project was developed as part of a technical challenge, focusing on creating a modern, responsive, and user-friendly interface while implementing best practices in React development.

## 🎯 Challenge Requirements and Solutions

### 1. Responsive React TypeScript Application

✅ **Solution**: Implemented using React 18 with TypeScript and Tailwind CSS. Mobile-first approach with responsive breakpoints and fluid layouts. Components adapt seamlessly between mobile and desktop views using Tailwind's responsive modifiers.

### 2. CSS Management

✅ **Solution**: Chose Tailwind CSS for:

- Utility-first approach enabling rapid development
- Built-in responsive design system
- Zero runtime CSS with purging unused styles
- Easy theme customization and maintenance

### 3. Project Documentation

✅ **Solution**: Comprehensive README including:

- Detailed installation steps
- Project structure explanation
- Technology stack overview
- Development practices
- Future improvements

### 4. Token Management

✅ **Solution**: Implemented using React Context (AuthContext) for:

- In-memory token storage
- Token persistence across page refreshes
- Clean logout functionality
- Protected route management

### 5. Public/Private Context Architecture

✅ **Solution**: Implemented a scalable architecture:

- Public routes (/login) and private routes (/home)
- PrivateRoute component for route protection
- AuthContext for global auth state
- Easy to extend with new modules (public/private)

### 6. Axios Configuration

✅ **Solution**: Configured Axios with:

- Global instance with base URL
- Interceptors for token injection
- Error handling middleware
- Response transformation

### 7. Home List Implementation

✅ **Solution**: Optimized character list with:

- Virtualized scrolling for performance
- Pagination with infinite scroll support
- Client-side caching for faster navigation
- Debounced search for better UX
- Loading states and error handling

### 8. Logout Strategy

✅ **Solution**: Implemented comprehensive logout:

- Clears auth token
- Resets application state
- Redirects to login
- Cleans up cached data
- Prevents memory leaks

### 9. Backend Call Optimization

✅ **Solution**: Implemented several optimizations:

- Response caching for repeated requests
- Debounced search to reduce API calls
- Pagination to limit data transfer
- Error boundary for failed requests
- Loading states for better UX

## 🚀 Features

- 🔐 Authentication system with form validation
- 📋 Character listing with pagination and infinite scroll support
- 🗺️ Location listing with search and filtering capabilities
- 🔄 Toggle between characters and locations views
- 🔍 Advanced search filters
  - Characters: name, species, status, gender
  - Locations: name, type, dimension
- 🎯 Detailed character modal with episode information
- 📱 Fully responsive design for all devices
- ✨ Smooth animations and transitions
- ⚡ Results caching for better performance
- 🧪 Comprehensive unit tests
- 🛡️ Protected routes with authentication
- 🌈 Toast notifications for user feedback
- 🔄 Loading states and error handling
- 📱 Mobile-first approach

## 🛠️ Technologies

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Vitest + Testing Library
- React Router v6
- Axios
- Context API for state management
- React Query for data fetching

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Character/      # Character-related components
│   ├── Location/       # Location-related components
│   ├── common/         # Shared components
│   └── layout/         # Layout components
├── contexts/           # React contexts
│   ├── AuthContext     # Authentication context
│   └── ToastContext    # Notifications context
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── routes/             # Route configurations
├── services/           # API services
├── types/              # TypeScript definitions
├── utils/              # Utility functions
├── constants/          # App constants
└── config/             # Configuration files
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amarismariano/tenpo-challenge.git
   cd tenpo-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🧪 Tests

To run the tests:

```bash
npm test
```

To see test coverage:

```bash
npm run test:coverage
```

## 📦 Build

To create a production build:

```bash
npm run build
```

The files will be generated in the `dist` directory.

## 🔑 Test Credentials

To access the application, you can use any valid email format and a password of at least 6 characters.

Example:

- Email: user@example.com
- Password: 123456

## 🌟 Future Improvements

- [ ] Implement favorites persistence
- [ ] Add more e2e tests with Cypress
- [ ] Implement PWA capabilities
- [ ] Add dark/light mode theme switch
- [ ] Add detailed location modal with resident information
- [ ] Implement location bookmarking feature

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Development Practices

- **State Management**: Uses React Context for global state
- **Code Organization**: Follows a modular approach with clear separation of concerns
- **Testing**: Implements unit tests for critical components and hooks
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Implements caching and optimized renders
- **TypeScript**: Strict type checking and interfaces
- **Git**: Conventional commits and clear branch structure

## 📝 License

This project is under the MIT License.
