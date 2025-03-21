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
      label: "Logos",
      labels: {
        singular: "Logo",
        plural: "Logos",
      },
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Logo Image",
          required: true,
        },
      ],
    },
  ],
};

export default LogoStrip;
