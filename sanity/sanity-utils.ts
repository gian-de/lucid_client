import { createClient, groq } from "next-sanity";

export async function getVehicles() {
  const client = createClient({
    projectId: "xl3skqmu",
    dataset: "production",
    apiVersion: "2023-10-06",
  });

  return client.fetch(
    groq`*[_type == "imports"]{
        _id,
        _createdAt,
        make,
        model,
        year, 
        price,
        ticket,
        stock,
        restoration,
        speed,
        seats,
        trunk,
        handling,
        category,
        generation,
        unmarketable
    }`
  );
}
