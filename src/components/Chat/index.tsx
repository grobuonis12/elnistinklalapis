'use client';

import { useEffect, useRef } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import { chatConfigs } from './config';

interface ChatProps {
  pageId: string;
  className?: string;
  config?: {
    mode?: 'window' | 'fullscreen';
    i18n?: {
      [key: string]: {
        title?: string;
        subtitle?: string;
        footer?: string;
        getStarted?: string;
        inputPlaceholder?: string;
        closeButtonTooltip?: string;
        uploadButtonTooltip?: string;
      };
    };
  };
}

export default function Chat({ pageId, className = '', config = {} }: ChatProps) {
  const chatRef = useRef<ReturnType<typeof createChat> | null>(null);

  useEffect(() => {
    // Add custom styles to match the project's design
    const style = document.createElement('style');
    style.textContent = `
      .n8n-chat {
        border: 2px solid black !important;
        border-radius: 20px !important;
        font-family: var(--font-geist-sans) !important;
      }
      .n8n-chat-header {
        background-color: #FFDE59 !important;
        border-bottom: 2px solid black !important;
        border-radius: 18px 18px 0 0 !important;
      }
      .n8n-chat-input-container {
        border-top: 2px solid black !important;
        background-color: white !important;
      }
      .n8n-chat-input {
        border: 2px solid black !important;
        border-radius: 15px !important;
        background-color: white !important;
      }
      .n8n-chat-input:focus {
        box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.1) !important;
      }
      .n8n-chat-send-button, .n8n-chat-upload-button {
        background-color: #FFDE59 !important;
        border: 2px solid black !important;
        border-radius: 12px !important;
        box-shadow: 2px 2px 0px 0px rgba(0,0,0,1) !important;
      }
      .n8n-chat-send-button:hover, .n8n-chat-upload-button:hover {
        transform: translate(1px, 1px) !important;
        box-shadow: 1px 1px 0px 0px rgba(0,0,0,1) !important;
      }
      .n8n-chat-message-bubble {
        border: 2px solid black !important;
        border-radius: 15px !important;
        box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.1) !important;
      }
      .n8n-chat-message-bubble.sent {
        background-color: #FFDE59 !important;
      }
      .n8n-chat-message-bubble.received {
        background-color: white !important;
      }
      .n8n-chat-file-preview {
        border: 2px solid black !important;
        border-radius: 10px !important;
        background-color: white !important;
      }
    `;
    document.head.appendChild(style);

    console.log('Chat component mounted with pageId:', pageId);
    const chatConfig = chatConfigs[pageId];
    console.log('Found chatConfig:', chatConfig);

    if (!chatConfig) {
      console.error(`No chat configuration found for pageId: ${pageId}`);
      return;
    }

    if (!chatConfig.webhookUrl) {
      console.error(`Webhook URL is missing for pageId: ${pageId}`);
      return;
    }

    try {
      console.log('Creating chat with config:', {
        webhookUrl: chatConfig.webhookUrl,
        mode: config.mode || (chatConfig.fullscreen ? 'fullscreen' : 'window'),
      });

      const chat = createChat({
        webhookUrl: chatConfig.webhookUrl,
        target: '#n8n-chat',
        mode: config.mode || (chatConfig.fullscreen ? 'fullscreen' : 'window'),
        defaultLanguage: 'en',
        loadPreviousSession: false,
        initialMessages: [
          "Sveiki! 👋 Aš – Nida, įmonės Elnis virtuali asistentė. Esu čia, kad padėčiau atsakyti į jūsų klausimus."
        ],
        // Enable file uploads only for skubi-pagalba
        allowFileUploads: pageId === 'skubi-pagalba',
        i18n: {
          en: {
            title: ' ',
            subtitle: ' ',
            footer: '',
            getStarted: 'Naujas pokalbis',
            inputPlaceholder: "Rašyti čia...",
            closeButtonTooltip: 'Uždaryti',
            uploadButtonTooltip: 'Pridėti failą',
            ...config.i18n?.en
          }
        }
      });

      chatRef.current = chat;
      console.log('Chat created successfully');
    } catch (error) {
      console.error('Error creating chat:', error);
    }

    return () => {
      if (chatRef.current) {
        try {
          // @ts-ignore - unmount method exists but TypeScript doesn't know about it
          chatRef.current.unmount();
        } catch (error) {
          console.error('Error unmounting chat:', error);
        }
      }
      // Remove custom styles
      document.head.removeChild(style);
    };
  }, [pageId, config]);

  return <div id="n8n-chat" className={`w-full h-[600px] ${className}`} />;
}