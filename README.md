# IntelliChat Widget React

A React component for easily integrating the IntelliChat AI chatbot widget into your React applications.

## Installation

### From the IntelliChat npm registry

```bash
npm install intellichat-widget-react
```

## Usage

### Basic Implementation

```jsx
import React from 'react';
import { AiChatWidget } from 'intellichat-widget-react';

function App() {
  return (
    <div>
      <h1>My Application</h1>

      <AiChatWidget 
        token="your-intellichat-api-token"
      />
    </div>
  );
}

export default App;
```

### Next.js Implementation

For Next.js applications, use dynamic imports to avoid SSR issues:

```jsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the widget to prevent SSR issues
const AiChatWidget = dynamic(
  () => import('intellichat-widget-react').then((mod) => mod.AiChatWidget),
  { ssr: false }
);

function ChatPage() {
  return (
    <div>
      <h1>My Application</h1>
      
      <AiChatWidget 
        token="your-intellichat-api-token"
        proxy="https://your-custom-proxy.com"
      />
    </div>
  );
}

export default ChatPage;
```

### With Custom API Proxy

If you need to use a custom API proxy:

```jsx
import React from 'react';
import { AiChatWidget } from 'intellichat-widget-react';

function App() {
  return (
    <div>
      <h1>My Application</h1>
      
      <AiChatWidget 
        token="your-intellichat-api-token"
        proxy="https://your-custom-proxy.com"
      />
    </div>
  );
}

export default App;
```

## How It Works

The IntelliChat Widget React component:

1. Injects a configuration script into your application with your provided token and proxy settings
2. Loads the IntelliChat widget script from the specified URL
3. Initializes the chat widget in your application

The widget will be available to your users once the page loads, with a slight delay to ensure proper initialization.

## Development

### Local Development

```bash
npm install

npm start

npm run build
```

## License

MIT
