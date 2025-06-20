# Socket IO Live Chat

A real-time chat application built with Fastify, Socket.IO, React, and TailwindCSS. This project demonstrates a modern fullstack setup for live messaging, including user presence, chat history, and an API documented via Swagger/OpenAPI.

---

## 🛠️ Technologies Used

### **Backend**

- **[Fastify](https://www.fastify.io/):** High performance Node.js web framework.
- **[Socket.IO](https://socket.io/):** Real-time bidirectional event-based communication.
- **[@ericedouard/fastify-socket.io](https://www.npmjs.com/package/@ericedouard/fastify-socket.io):** Socket.IO integration for Fastify.
- **[@fastify/autoload](https://github.com/fastify/fastify-autoload):** Automatic loading of plugins and routes.
- **[@fastify/cors](https://github.com/fastify/fastify-cors):** CORS support for Fastify.
- **[@fastify/swagger](https://github.com/fastify/fastify-swagger):** OpenAPI (Swagger) documentation generation.
- **[@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui):** Swagger UI integration.
- **[@sinclair/typebox](https://github.com/sinclairzx81/typebox):** JSON Schema TypeScript type builder.
- **[dotenv](https://github.com/motdotla/dotenv):** Environment variable management.

### **Frontend**

- **[React 19](https://react.dev/):** Frontend UI library.
- **[Vite](https://vitejs.dev/):** Frontend build tool for lightning-fast development.
- **[TailwindCSS](https://tailwindcss.com/):** Utility-first CSS framework.
- **[socket.io-client](https://socket.io/docs/v4/client-api/):** Real-time event communication from the browser.
- **[react-router](https://reactrouter.com/):** Declarative routing for React.
- **[lucide-react](https://lucide.dev/):** Icon set.
- **[motion (framer-motion)](https://www.framer.com/motion/):** Animations and transitions.
- **[react-scroll-to-bottom](https://www.npmjs.com/package/react-scroll-to-bottom):** Auto-scroll for chat windows.

### **Other**

- **[TypeScript](https://www.typescriptlang.org/):** Type safety.
- **[ESLint](https://eslint.org/):** Linting.
- **[tsx](https://github.com/esbuild-kit/tsx):** TypeScript execution environment.
- **[pnpm](https://pnpm.io/):** Fast, disk space-efficient package manager.

---

## 🚀 Quick Start

### 1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/socket-io-live-chat.git
cd socket-io-live-chat
```

### 2. **Install dependencies**

This project uses [pnpm](https://pnpm.io/) for package management.

```bash
pnpm install
```

### 3. **Set up environment variables**

Create a `.env` file in the root with the following variables:

```env
# Backend
VITE_BACK_HOST=127.0.0.1
VITE_BACK_PORT=3001
BACK_SWAGGER=/docs

# Frontend
FRONT_HOST=127.0.0.1
FRONT_PORT=5173
```

Adjust the values as needed for your environment.

### 4. **Start the backend**

In one terminal, run:

```bash
pnpm dev-server
```

This will start the Fastify server with Socket.IO and REST API on the backend.

### 5. **Start the frontend**

In a separate terminal, run:

```bash
pnpm dev
```

This will launch the Vite development server for the React frontend.

- Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 🧑‍💻 Features

- **Live chat:** Real-time messaging between all connected users.
- **Online users:** See who's currently online.
- **Chat history:** New users joining receive the full chat history.
- **Responsive UI:** Built with TailwindCSS and animates via framer-motion.
- **API documentation:** Swagger/OpenAPI UI available at `/docs` on the backend server.
