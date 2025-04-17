import { Block } from 'payload';
import { chatConfigs } from '@/components/Chat/config';

// Convert chatConfigs to options array for the select field
const chatbotOptions = Object.entries(chatConfigs).map(([value, config]) => ({
  label: config.title,
  value: value,
}));

export const InternalPage: Block = {
  slug: "internalPage",
  interfaceName: "InternalPageBlock",
  labels: {
    singular: "Internal Page",
    plural: "Internal Pages",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Page Title",
      required: true,
    },
    {
      name: "chatbot",
      type: "select",
      label: "Pokalbių robotas",
      options: chatbotOptions,
      admin: {
        description: "Pasirinkite pokalbių robotą šiam puslapiui",
        position: 'sidebar',
      },
    },
  ],
};

export default InternalPage;
