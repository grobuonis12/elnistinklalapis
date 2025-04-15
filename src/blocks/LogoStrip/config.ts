import { Block } from 'payload';

export const LogoStrip: Block = {
  slug: "logoStrip",
  labels: {
    singular: "Logo Strip",
    plural: "Logo Strips",
  },
  fields: [
    {
      name: "logos",
      type: "array",
      label: "Partner Logos",
      labels: {
        singular: "Logo",
        plural: "Logos",
      },
      minRows: 1,
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Logo Image",
          required: true,
          filterOptions: {
            mimeType: {
              contains: 'image',
            },
          },
        },
        {
          name: "alt",
          type: "text",
          label: "Alt Text",
          required: true,
          admin: {
            description: "Alternative text for accessibility",
          },
        },
        {
          name: "url",
          type: "text",
          label: "Website URL",
          required: false,
          admin: {
            description: "Optional URL to the partner's website",
          },
        },
      ],
    },
  ],
};

export default LogoStrip;
