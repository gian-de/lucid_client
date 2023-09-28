import _ from "lodash";
import axios from "axios";

import Check from "@/components/svg/Check";
import Xmark from "@/components/svg/Xmark";

export const revalidate = 0;

const url = "http://127.0.0.1:1337" || process.env.URL;
const apiKey = process.env.STRAPI_API_TOKEN;

const fetchData = async () => {
  try {
    const importDataPromise = await axios.get(`${url}/api/imports`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const importData = await importDataPromise.data.data;
    return importData;
  } catch (error) {
    console.log("ERROR fetching", error);
  }
};

export default async function Home() {
  const data = await fetchData();
  console.log("data", data);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className="mt-20">
        {data.map((vehicle: any) => {
          const {
            id,
            attributes: {
              Make,
              Model,
              Year,
              Price,
              Ticket,
              Stock,
              Restoration,
              Seats,
              Trunk,
              Speed,
              Handling,
              Category,
              Generation,
              Unmarketable,
            },
          } = vehicle;

          function formatNumberWithCommas(Price: string) {
            return _.replace(Price, /\B(?=(\d{3})+(?!\d))/g, ",");
          }

          function transformStock(Stock: any) {
            switch (Stock) {
              case "r":
                return "RESTRICTED";
              case "u":
                return "UNMARKETABLE";
              case "i":
                return "INF";
              default:
                return Stock;
            }
          }

          const YearInfo = Year === 0 ? "-" : Year;
          const Pricing = Price == 0 ? "-" : Price;

          return (
            <div
              key={id}
              className="flex space-x-6 font-medium bg-gray-300 divide-x-4"
            >
              <p
                className={`${
                  Unmarketable ? "bg-red-500 text-slate-50" : " "
                } ${Ticket === "Y" ? "text-green-600" : "text black"}  `}
              >
                {Make}
              </p>
              <p
                className={`${
                  Unmarketable ? "bg-red-500 text-slate-50" : " "
                } ${Ticket === "Y" ? "text-green-600" : "text black"}  `}
              >
                {Model}
              </p>
              <p>{YearInfo}</p>
              <p
                className={`${
                  Ticket === "Y" ? "text-green-600" : "text black"
                } font-medium`}
              >
                {Pricing > 0 ? `$${formatNumberWithCommas(Pricing)}` : Pricing}
              </p>

              {/*
              incase you'd want to have the red  X or green checkmark
               <p>{Ticket === "NA" ? "N/A" : Ticket}</p> */}
              <p
                className={`${
                  Stock === "u"
                    ? "bg-red-500 text-slate-50"
                    : Stock === "r"
                    ? "bg-black text-red-600"
                    : Stock === "i"
                    ? "bg-blue-400 text-slate-50"
                    : Stock === "0"
                    ? "bg-red-700 text-white"
                    : ""
                } font-medium tracking-tighter uppercase`}
              >
                {transformStock(Stock)}
              </p>
              <p className="flex items-center w-6 h-6">
                {Restoration === "Y" ? (
                  <Check />
                ) : Restoration === "N" ? (
                  <Xmark />
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}