import { ImportVehicle, columns } from "@/app/import/components/columns";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  data: ImportVehicle[];
};

const ImportClient = (data: Props) => {
  return <div>testing{/* <DataTable columns={columns} data={data} /> */}</div>;
};

export default ImportClient;
