'use client';

import { FC, useEffect } from 'react';

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

  await loadScript(`${domain}/widget.js`);

  window.aiChatDidInit = true;
};

export const AiChatWidget: FC<AiChatWidgetProps> = ({
  token,
  proxy,
  url = "https://widget.intellichat.ru"
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initAiChatWidget(url, token, proxy).catch(console.error);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [token, proxy, url]);

  return <div />;
};
