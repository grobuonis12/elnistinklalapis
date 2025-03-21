import { Block } from "payload";

const WelcomeBlock: Block = {
  slug: "welcomeBlock",
  labels: {
    singular: "Welcome Block",
    plural: "Welcome Blocks",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Sveiki atvykę! Pasirinkite jus dominančią temą:",
      required: true,
    },
    {
      name: "buttons",
      label: "Buttons",
      type: "array",
      required: true,
      fields: [
        {
          name: "text",
          label: "Button Text",
          type: "text",
          required: true,
        },
        {
          name: "link",
          label: "Button Link",
          type: "text",
          required: true,
          admin: {
            description: "Enter the page URL (e.g. /nauja-svetaine), not the API URL"
          }
        },
        {
          name: "hexColor",
          label: "Hexagon Color",
          type: "text",
          required: true,
          defaultValue: "#FF5733", // Example default color
        },
      ],
    },
  ],
};

export default WelcomeBlock;
