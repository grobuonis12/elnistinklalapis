import { Block } from "payload";

export const Kontaktai: Block = {
  slug: "kontaktai",
  labels: {
    singular: "Kontaktai",
    plural: "Kontaktai Sections",
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      label: "Company Name",
      required: true,
      defaultValue: "II „ELNIS“",
    },
    {
      name: "companyCode",
      type: "text",
      label: "Company Code",
      required: true,
      defaultValue: "304153085",
    },
    {
      name: "vatCode",
      type: "text",
      label: "PVM Mokėtojo Kodas",
      required: true,
      defaultValue: "LT100009868416",
    },
    {
      name: "bankAccount",
      type: "text",
      label: "Bank Account",
      required: true,
      defaultValue: "LT474010051003606689",
    },
    {
      name: "bankName",
      type: "text",
      label: "Bank Name",
      required: true,
      defaultValue: "Luminor Bank AS",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
      required: true,
      defaultValue: "+370 623 06955",
    },
    {
      name: "email",
      type: "text",
      label: "Email Address",
      required: true,
      defaultValue: "info@elnis.lt",
    },
    {
      name: "illustration",
      type: "upload",
      label: "Illustration Image",
      relationTo: "media",
      required: false,
    },
  ],
};

export default Kontaktai;
