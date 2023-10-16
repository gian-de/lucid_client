import { defineField } from "sanity";

export default {
  name: "imports",
  title: "Imports",
  type: "document",
  fields: [
    defineField({
      name: "make",
      title: "Make",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: 'If the car "Unmarketable" enter 999',
      validation: (Rule) => Rule.required().integer().min(0).max(2099),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description:
        'Just enter the number no need to add "mph". If the car is "Unmarketable", enter number 0',
      validation: (Rule) => Rule.required().precision(2),
    }),
    defineField({
      name: "ticket",
      title: "Ticket",
      type: "string",
      options: {
        list: ["Y", "N", "N/A"],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "string",
      description:
        "Type a lowercase 'i' for INF, lowercase 'r' for RESTRICTED, lowercase 'u' for UNMARKETABLE, or type number of quantity in restock ex. 19",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "restoration",
      title: "Restoration",
      type: "string",
      options: {
        list: ["Y", "N", "N/A"],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "speed",
      title: "Speed",
      type: "number",
      description: 'If the car "Unmarketable" enter 999',
      validation: (Rule) => Rule.required().integer().min(0).max(999),
    }),
    defineField({
      name: "seats",
      title: "Seats",
      type: "number",
      description: 'If the car "Unmarketable" enter 999',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "trunk",
      title: "Trunk",
      type: "number",
      description: 'If the car "Unmarketable" enter 999',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "handling",
      title: "Handling",
      type: "number",
      description: 'Enter number 1-5, if its "Unmarketable" enter 6',
      validation: (Rule) => Rule.required().integer().min(0).max(6),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",

      options: {
        list: ["Standard", "Premium", "Exclusive", "Limited", "Exquisite"],
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "generation",
      title: "Generation",
      type: "string",
      description: "Only type the letter in lowercase ex. 'ii' or 'iv' or 'e'",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "unmarketable",
      title: "Unmarketable",
      type: "boolean",
      validation: (Rule: any) => Rule.required(),
      initialValue: false,
    }),
  ],
};
