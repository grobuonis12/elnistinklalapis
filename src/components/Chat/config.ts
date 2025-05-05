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
  },
  'reikalinga-konsultacija': {
    webhookUrl: process.env.NEXT_PUBLIC_CHAT_WEBHOOK_KONSULTACIJA || '',
    title: 'Reikalinga konsultacija',
    placeholder: 'Užduokite klausimą apie konsultaciją...',
    fullscreen: true,
    i18n: {
      lt: {
        title: 'Reikalinga konsultacija',
        subtitle: 'Užduokite savo klausimą',
        inputPlaceholder: 'Įveskite žinutę...',
        sendButtonTooltip: 'Siųsti',
        clearButtonTooltip: 'Išvalyti pokalbį'
      }
    }
  },
  'nauja-svetaine': {
    webhookUrl: process.env.NEXT_PUBLIC_CHAT_WEBHOOK_SVETAINE || '',
    title: 'Nauja svetainė',
    placeholder: 'Užduokite klausimą apie naujos svetainės kūrimą...',
    fullscreen: true,
    i18n: {
      lt: {
        title: 'Nauja svetainė',
        subtitle: 'Užduokite savo klausimą',
        inputPlaceholder: 'Įveskite žinutę...',
        sendButtonTooltip: 'Siųsti',
        clearButtonTooltip: 'Išvalyti pokalbį'
      }
    }
  },
  'pateikti-uzduoti': {
    webhookUrl: process.env.NEXT_PUBLIC_CHAT_WEBHOOK_UZDUOTIS || '',
    title: 'Pateikti užduotį',
    placeholder: 'Užduokite klausimą apie užduoties pateikimą...',
    fullscreen: true,
    i18n: {
      lt: {
        title: 'Pateikti užduotį',
        subtitle: 'Užduokite savo klausimą',
        inputPlaceholder: 'Įveskite žinutę...',
        sendButtonTooltip: 'Siųsti',
        clearButtonTooltip: 'Išvalyti pokalbį'
      }
    }
  },
  'nauja-parduotuve': {
    webhookUrl: process.env.NEXT_PUBLIC_CHAT_WEBHOOK_PARDUOTUVE || '',
    title: 'Nauja el. parduotuvė',
    placeholder: 'Užduokite klausimą apie el. parduotuvės kūrimą...',
    fullscreen: true,
    i18n: {
      lt: {
        title: 'Nauja el. parduotuvė',
        subtitle: 'Užduokite savo klausimą',
        inputPlaceholder: 'Įveskite žinutę...',
        sendButtonTooltip: 'Siųsti',
        clearButtonTooltip: 'Išvalyti pokalbį'
      }
    }
  },
  'svetaines-atnaujinimas': {
    webhookUrl: process.env.NEXT_PUBLIC_CHAT_WEBHOOK_ATNAUJINIMAS || '',
    title: 'Svetainės atnaujinimas',
    placeholder: 'Užduokite klausimą apie svetainės atnaujinimą...',
    fullscreen: true,
    i18n: {
      lt: {
        title: 'Svetainės atnaujinimas',
        subtitle: 'Užduokite savo klausimą',
        inputPlaceholder: 'Įveskite žinutę...',
        sendButtonTooltip: 'Siųsti',
        clearButtonTooltip: 'Išvalyti pokalbį'
      }
    }
  },
  'prieziuros-paslauga': {
    webhookUrl: process.env.NEXT_PUBLIC_CHAT_WEBHOOK_PRIEZIURA || '',
    title: 'Priežiūros paslauga',
    placeholder: 'Užduokite klausimą apie priežiūros paslaugą...',
    fullscreen: true,
    i18n: {
      lt: {
        title: 'Priežiūros paslauga',
        subtitle: 'Užduokite savo klausimą',
        inputPlaceholder: 'Įveskite žinutę...',
        sendButtonTooltip: 'Siųsti',
        clearButtonTooltip: 'Išvalyti pokalbį'
      }
    }
  }
}; 