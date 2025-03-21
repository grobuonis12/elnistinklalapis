import { Block } from 'payload';

export const InternalPage: Block = {
  slug: "internalPage",
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
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
    {
      name: "style",
      type: "select",
      label: "Page Style",
      defaultValue: "default",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Modern",
          value: "modern",
        },
        {
          label: "Minimal",
          value: "minimal",
        }
      ],
    },
    {
      name: "embedForm",
      type: "text",
      label: "Embed Form Code",
      admin: {
        description: "Paste the AI-generated form embed code here",
      },
    },
  ],
};

export default InternalPage;
