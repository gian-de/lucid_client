import _ from "lodash";

import ImportClient from "./components/client";

export const revalidate = 0;

export default async function ImportPage() {
  return (
    <div className="mt-20 ">
      <ImportClient />
    </div>
  );
}
