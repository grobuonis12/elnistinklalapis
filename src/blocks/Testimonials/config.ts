import { Block } from "payload";

export const Testimonials: Block = {
  slug: "testimonials",
  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },
  fields: [
    {
      name: "testimonials",
      type: "array",
      label: "Testimonials",
      labels: {
        singular: "Testimonial",
        plural: "Testimonials",
      },
      fields: [
        {
          name: "company",
          type: "text",
          label: "Company Name",
          required: true,
        },
        {
          name: "testimonial",
          type: "textarea",
          label: "Testimonial Text",
          required: true,
        },
        {
          name: "person",
          type: "text",
          label: "Person's Name",
          required: true,
        },
        {
          name: "bgColor",
          type: "text",
          label: "Background Color",
          required: false,
          defaultValue: "#ffffff", // Default to white
        },
      ],
    },
  ],
};

export default Testimonials;
