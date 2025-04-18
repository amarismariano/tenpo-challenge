# Rick and Morty Character Explorer

A modern web application for exploring characters from the Rick and Morty universe, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- 🔐 Simulated authentication system
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔍 Character search and filtering
- 📄 Pagination system
- 🌈 Animated toast notifications
- 🛡️ Protected routes
- 🌐 API integration with error handling
- 📦 Modular and maintainable code structure

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Axios
- Vite
- Context API for state management

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Modern web browser

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone [REPOSITORY_URL]
   cd tenpo-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## 🔑 Usage

1. **Authentication**:

   - Use any valid email (e.g., user@example.com)
   - Use any password (minimum 6 characters)
   - Demo credentials are for testing purposes only

2. **Character Explorer**:
   - Browse through the character list
   - Use filters to search for specific characters
   - Navigate through pages using the pagination controls
   - View detailed character information

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, Toast)
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── routes/         # Route configurations
├── services/       # API services
├── types/          # TypeScript definitions
├── utils/          # Utility functions
├── constants/      # App constants
└── config/         # Configuration files
```

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 📦 Production Build

Create a production build:

```bash
npm run build
# or
yarn build
```

The build will be available in the `dist` directory.

## 🔧 Development

### Code Style

- Uses ESLint for code linting
- Follows TypeScript best practices
- Implements React hooks guidelines
- Maintains consistent code formatting

### State Management

- Uses React Context for global state
- Implements custom hooks for reusable logic
- Manages form state locally
- Handles API state efficiently

### Error Handling

- Comprehensive error boundaries
- Toast notifications for user feedback
- API error handling
- Form validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Author

- Mariano Amaris

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
