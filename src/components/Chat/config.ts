export interface ChatConfig {
  webhookUrl: string;
  title: string;
  placeholder: string;
  fullscreen?: boolean;
  i18n?: {
    [key: string]: {
      title?: string;
      subtitle?: string;
      inputPlaceholder?: string;
      sendButtonTooltip?: string;
      clearButtonTooltip?: string;
    };
  };
}

export const chatConfigs: Record<string, ChatConfig> = {
  'skubi-pagalba': {
    webhookUrl: process.env.NEXT_PUBLIC_CHAT_WEBHOOK_PAGALBA || '',
    title: 'Skubi pagalba',
    placeholder: 'Užduokite klausimą apie skubią pagalbą...',
    fullscreen: true,
    i18n: {
      lt: {
        title: 'Skubi pagalba',
        subtitle: 'Užduokite savo klausimą',
        inputPlaceholder: 'Įveskite žinutę...',
        sendButtonTooltip: 'Siųsti',
        clearButtonTooltip: 'Išvalyti pokalbį'
      }
    }
  }
}; 