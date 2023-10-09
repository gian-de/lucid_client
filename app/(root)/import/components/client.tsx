import { getVehicles } from "@/sanity/sanity-utils";
import { columns } from "@/app/(root)/import/components/columns";
import { DataTable } from "@/components/ui/data-table";

const ImportClient = async () => {
  const vehicles = await getVehicles();
  console.log("sanity vehicles", vehicles);
  return (
    <div>
      <DataTable columns={columns} data={vehicles} />
    </div>
  );
};

export default ImportClient;
