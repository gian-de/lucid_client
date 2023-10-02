import _ from "lodash";
import axios from "axios";

import ImportClient from "./components/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";

export const revalidate = 0;

const url = "http://127.0.0.1:1337" || process.env.URL;
const apiKey = process.env.STRAPI_API_TOKEN;

const fetchData = async () => {
  try {
    // ?populate=yourImage
    const importDataPromise = await axios.get(
      //   `${url}/api/imports?populate=Image`,
      `${url}/api/imports?populate=*`,
      //   `${url}/api/imports?_limit=500`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const importData = await importDataPromise.data.data;
    return importData;
  } catch (error) {
    console.log("ERROR fetching", error);
  }
};

export default async function ImportPage() {
  const data = await fetchData();
  console.log("data", data);

  function flattenData(dataArray: any) {
    return dataArray.map((item: any) => ({
      ...item.attributes, // Spread out all attributes properties
      id: item.id, // Include the id as well, if needed
    }));
  }
  const flatData = flattenData(data);

  return (
    <div className="mt-20">
      <DataTable columns={columns} data={flatData} />
    </div>
  );
}
