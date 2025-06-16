# Socket IO Live Chat

This project aims to test Socket.IO by creating a real-time chat application. It utilizes several modern technologies to ensure a smooth development experience:

- **pnpm** as the package manager
- **Tailwind CSS** for styling
- **Node.js** for the backend
- **Vite** as the bundler

## Development Setup

To get started with development, follow these steps:

1. **Install dependencies** using pnpm:

   ```sh
   pnpm install
   ```

2. **Start the development server**:

   ```sh
   pnpm dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000` (or the port specified by Vite) to view the application.

## Expanding the ESLint Configuration

For production applications, consider updating the ESLint configuration for more robust type checking and stylistic rules.

### Recommended Plugins

- [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) for React-specific rules
- [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React DOM specific rules

Configure ESLint with type-aware and stylistic rules as needed to maintain code quality and consistency.

### Deployment

To deploy the application for development, simply utilize the Vite dev server as described in the development setup. For production deployment, ensure to build and serve using a suitable Node.js server setup.
