import _ from "lodash";
import axios from "axios";

import Check from "@/components/svg/Check";
import Xmark from "@/components/svg/Xmark";
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
    return dataArray.map((item) => ({
      ...item.attributes, // Spread out all attributes properties
      id: item.id, // Include the id as well, if needed
    }));
  }
  const flatData = flattenData(data);

  return (
    <div className="mt-20">
      <DataTable columns={columns} data={flatData} />
    </div>
    // <main className="flex flex-col items-center justify-between min-h-screen">
    //   <div className="mt-20">
    //     {data.map((vehicle: any) => {
    //       const {
    //         id,
    //         attributes: {
    //           Make,
    //           Model,
    //           Year,
    //           Price,
    //           Ticket,
    //           Stock,
    //           Restoration,
    //           Seats,
    //           Trunk,
    //           Speed,
    //           Handling,
    //           Category,
    //           Generation,
    //           Unmarketable,
    //           Image,
    //         },
    //       } = vehicle;

    //       //   console.log("img 1", Image);
    //       const {
    //         data: [
    //           {
    //             attributes: { url: imgUrl },
    //           },
    //         ],
    //       } = Image;

    //       console.log("img att", data);
    //       //   console.log("img 2 step", imgUrl);
    //       const imgFetch = `${url}${imgUrl}`;
    //       console.log("img 3 step", imgFetch);

    //       function formatNumberWithCommas(Price: string) {
    //         return _.replace(Price, /\B(?=(\d{3})+(?!\d))/g, ",");
    //       }

    //       function transformStock(Stock: any) {
    //         switch (Stock) {
    //           case "r":
    //             return "RESTRICTED";
    //           case "u":
    //             return "UNMARKETABLE";
    //           case "i":
    //             return "INF";
    //           default:
    //             return Stock;
    //         }
    //       }

    //       return (

    //             <div
    //               key={id}
    //               className="flex space-x-6 font-medium bg-gray-300 divide-x-4"
    //             >
    //               <p
    //                 className={`${
    //                   Unmarketable ? "bg-red-500 text-slate-50" : " "
    //                 } ${Ticket === "Y" ? "text-green-600" : "text black"}  `}
    //               >
    //                 {Make}
    //               </p>
    //               <p
    //                 className={`${
    //                   Unmarketable ? "bg-red-500 text-slate-50" : " "
    //                 } ${Ticket === "Y" ? "text-green-600" : "text black"}  `}
    //               >
    //                 {Model}
    //               </p>
    //               <p>
    //                 {Year > 0 ? Year : <span className="text-red-500">{"-"}</span>}
    //               </p>
    //               <p
    //                 className={`${
    //                   Ticket === "Y" ? "text-green-600" : "text black"
    //                 } font-medium`}
    //               >
    //                 {Price > 0 ? (
    //                   `$${formatNumberWithCommas(Price)}`
    //                 ) : (
    //                   <span className="text-red-500">{"-"}</span>
    //                 )}
    //               </p>
    //               <p
    //                 className={`${
    //                   Stock === "u"
    //                     ? "bg-red-500 text-slate-50"
    //                     : Stock === "r"
    //                     ? "bg-black text-red-600"
    //                     : Stock === "i"
    //                     ? "bg-blue-400 text-slate-50"
    //                     : Stock === "0"
    //                     ? "bg-red-700 text-white"
    //                     : ""
    //                 } font-medium tracking-tighter uppercase`}
    //               >
    //                 {transformStock(Stock)}
    //               </p>
    //               <p className="flex items-center w-6 h-6">
    //                 {Restoration === "Y" ? (
    //                   <span className="text-green-500">
    //                     <Check />
    //                   </span>
    //                 ) : Restoration === "N" ? (
    //                   <span className="text-red-700">
    //                     <Xmark />
    //                   </span>
    //                 ) : (
    //                   <span className="text-red-500">{"N/A"}</span>
    //                 )}
    //               </p>
    //               <p>
    //                 {Speed === 999 ? (
    //                   <span className="text-red-500">{"-"}</span>
    //                 ) : (
    //                   <span>{`${Speed} mph`}</span>
    //                 )}
    //               </p>
    //               <p>{Seats}</p>
    //               <p>{Trunk}</p>
    //               <p>{`${Handling}/5`}</p>
    //               <p className={`${Unmarketable ? "text-red-500" : " "} uppercase`}>
    //                 {Category}
    //               </p>
    //               <p
    //                 className={`${Unmarketable ? "text-red-500" : " "} uppercase`}
    //               >{`Generation ${Generation}`}</p>
    //             </div>
    //       );
    //     })}
    //   </div>
    // </main>
  );
}
{
  /* <DataTable columns={columns} data={data} /> */
}
