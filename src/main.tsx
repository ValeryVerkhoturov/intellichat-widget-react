import React from "react";
import ReactDOM from "react-dom/client";
import { AiChatWidget } from './ai-chat-widget';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AiChatWidget token={'a3c2e321-9951-4b46-b18f-e31f8a240d72'} proxy={'https://chat-api.optimatica.ru'} />
  </React.StrictMode>
);
