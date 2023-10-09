import { type SchemaTypeDefinition } from "sanity";

import imports from "./schemas/imports";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [imports],
};
