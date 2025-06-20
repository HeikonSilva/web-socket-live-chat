# Web Socket Live Chat

Este projeto foi desenvolvido com o objetivo de aprender e entender a dinâmica de comunicação em tempo real utilizando WebSocket, mais especificamente o [socket.io](https://socket.io/). Não possui finalidade de uso em produção ou aplicação profissional, servindo exclusivamente como estudo e experimentação.

## Tecnologias Utilizadas

### Frontend

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (bundler)
- [TailwindCSS](https://tailwindcss.com/) (estilização rápida e utilitária)
- [framer-motion](https://www.framer.com/motion/) (animações)
- [react-scroll-to-bottom](https://github.com/compulim/react-scroll-to-bottom) (auto scroll no chat)

### Backend

- [Fastify](https://fastify.dev/) (HTTP server)
  - Plugins: `swagger`, `typebox`, `autoload`, `fastify-socket.io`
- [socket.io](https://socket.io/) (WebSocket)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

## Estrutura do Projeto

A estrutura de pastas está organizada para acomodar tanto o frontend (React) quanto o backend (Fastify + Socket.io) na mesma raiz, mas a execução é separada:

```
/
├── src/
│   ├── http/        # Backend (Fastify + Socket.io)
│   └── ...          # Frontend (React)
├── public/
├── package.json
├── pnpm-lock.yaml
└── ...
```

- O frontend depende do backend para funcionar corretamente.
- O backend pode ser iniciado independentemente do frontend.

## Como Executar Localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/HeikonSilva/web-socket-live-chat.git
   cd web-socket-live-chat
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Inicie o backend (em um terminal separado):**

   ```bash
   pnpm dev-server
   ```

4. **Inicie o frontend:**

   ```bash
   pnpm dev
   ```

5. **Acesse o chat:**
   - Normalmente estará disponível em [http://localhost:5173](http://localhost:5173)

> **Obs:** Certifique-se de que o backend esteja rodando antes do frontend, pois o frontend depende dele para funcionar.

---

## Funcionamento da Aplicação e o Papel do WebSocket (Socket.io)

### Visão Geral

Este projeto implementa um chat em tempo real onde múltiplos usuários podem enviar e receber mensagens instantaneamente, visualizar quem está online e acessar o histórico de conversas ao entrar. Tudo isso só é possível graças ao uso do protocolo WebSocket, implementado aqui via [socket.io].

### Por que WebSocket?

O WebSocket é um protocolo de comunicação bidirecional e persistente entre cliente e servidor, diferente do HTTP tradicional, que é baseado em requisições e respostas pontuais. Em aplicações como chats, jogos e sistemas colaborativos, a comunicação precisa ser instantânea e contínua — e não há solução mais eficiente para isso do que o WebSocket.

**Vantagens do WebSocket/Socker.io:**

- Baixa latência e troca de dados em tempo real.
- Conexão persistente: usuário conectado pode receber dados a qualquer momento.
- Redução do overhead de troca de mensagens (não precisa abrir/fechar conexão toda vez).
- Com o socket.io, ganha-se ainda fallback para outros transportes caso o navegador/ambiente não suporte WebSocket puro.

### Dinâmica na Aplicação

#### 1. Estabelecimento da conexão

Ao acessar o frontend, o React instancia um socket (com o socket.io-client) e inicia a conexão com o backend Fastify. Assim que a conexão é estabelecida, o frontend emite um evento `join` enviando o nome de usuário.

```js
// Frontend: src/pages/App.tsx
useEffect(() => {
  socket.emit('join', username)
  // ...
}, [])
```

No backend, ao receber esse evento, o servidor:

- Registra o usuário na lista de conectados.
- Emite para todos os clientes a lista atualizada de usuários online.
- Envia ao novo usuário o histórico de mensagens.

```js
// Backend: src/http/chat.ts
socket.on('join', (username: string) => {
  users[socket.id] = { id: socket.id, username }
  app.io.emit('online-users', Object.values(users))
  socket.emit('chat-history', messages)
})
```

#### 2. Envio e recebimento de mensagens em tempo real

Quando um usuário envia uma mensagem:

- O frontend emite o evento `message` para o backend.
- O backend cria um objeto de mensagem, salva no histórico e faz o broadcast do evento `chat` para todos os clientes conectados.
- Cada cliente recebe o evento `chat` e atualiza sua interface instantaneamente.

```js
// Frontend
const handleSend = () => {
  socket.emit('message', input)
}

// Backend
socket.on('message', (data: string) => {
  // Cria objeto da mensagem
  app.io.emit('chat', message)
})
```

#### 3. Atualização da lista de usuários online

Quando um usuário entra ou sai do chat (`join` ou `disconnect`), o backend emite `online-users` com a lista atualizada. O frontend recebe e atualiza a interface de usuários conectados em tempo real.

#### 4. Histórico e persistência temporária

Ao conectar, o usuário recebe o histórico atual de mensagens (`chat-history`), garantindo contexto da conversa, mesmo que tenha acabado de entrar.

#### 5. Desconexão

Quando o usuário fecha a aba/navegador ou se desconecta, o servidor atualiza a lista de usuários e emite novamente para todos.

### Resumo da Dinâmica

- **Frontend**: sempre conectado via WebSocket, ouvindo e emitindo eventos.
- **Backend**: gerencia estados globais (usuários, mensagens) e propaga eventos para todos os clientes em tempo real.
- **Socket.io**: faz toda a ponte de comunicação, abstraindo complexidades do protocolo WebSocket puro, fornecendo API simples e eficiente.

### Importância do WebSocket no Projeto

Sem WebSocket, a aplicação teria que recorrer a técnicas ineficientes como "polling" (requisições HTTP periódicas) para checar atualizações, causando atraso, consumo desnecessário de recursos e experiência ruim para o usuário. O WebSocket permite que tudo aconteça de forma realmente instantânea e fluida — fundamental para a proposta de um chat ao vivo.

---

## Funcionalidades Implementadas

- Chat em tempo real entre múltiplos usuários conectados
- Auto scroll para a última mensagem recebida
- Interface dinamica e moderna

## Limitações e Possíveis Melhorias

- Projeto com fins educativos, portanto funcionalidades básicas
- Não há autenticação, histórico, salas privadas, ou persistência das mensagens
- Sem suíte de testes automatizados
- Futuras melhorias podem incluir: autenticação, múltiplas salas, persistência das mensagens, deploy, etc.

## Licença

Este projeto não possui uma licença definida.

## Contato

Se quiser entrar em contato, acesse meu [perfil no GitHub](https://github.com/HeikonSilva) — o e-mail está disponível lá!

---

**Sinta-se livre para clonar, estudar, modificar e utilizar este projeto como base para aprender mais sobre WebSocket, Socket.io, Fastify e React!**
