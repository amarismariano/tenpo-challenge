# Rick and Morty Character Viewer

A web application built with React + TypeScript that allows you to explore and search for Rick and Morty characters. This project was developed as part of a technical challenge, focusing on creating a modern, responsive, and user-friendly interface while implementing best practices in React development.

## 🚀 Features

- 🔐 Authentication system with form validation
- 📋 Character listing with pagination and infinite scroll support
- 🔍 Advanced search filters (name, species, status, gender)
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
- [ ] Improve accessibility standards
- [ ] Add character comparison feature
- [ ] Implement real authentication backend
- [ ] Add more advanced filtering options

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
