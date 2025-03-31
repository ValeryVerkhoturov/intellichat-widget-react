'use client';

import { FC, useEffect, memo } from 'react';

interface AiChatWidgetProps {
  token: string;
  proxy?: string;
  url?: string;
}

declare global {
  interface Window {
    aiChatDidInit?: boolean;
    aiChatWidgetConfig?: {
      token: string;
      proxy?: string;
    };
  }
}

const loadScript = (src: string, type: string = 'module'): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

const initAiChatWidget = async (domain: string, token: string, proxy?: string): Promise<void> => {
  // For SSR
  if (typeof window === 'undefined') return;

  if (window.aiChatDidInit) {
    return;
  }

  const configScript = document.createElement('script');
  configScript.textContent = `
    window.aiChatWidgetConfig = {
      token: '${token}',
      ${proxy ? `proxy: '${proxy}',` : ''}
    };
  `;
  document.body.appendChild(configScript);

  try {
    await loadScript(`${domain}/widget.js`);
    window.aiChatDidInit = true;
  } catch (error) {
    console.error('Failed to initialize IntelliChat widget:', error);
  }
};

function AiChatWidgetComponent({
  token,
  proxy,
  url = 'https://widget.intellichat.ru',
}: AiChatWidgetProps) {
  useEffect(() => {
    // For SSR
    if (typeof window === 'undefined') return;

    const timeoutId = setTimeout(() => {
      initAiChatWidget(url, token, proxy).catch(console.error);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [token, proxy, url]);

  return null;
}

export const AiChatWidget = memo(AiChatWidgetComponent);

export default AiChatWidget;
