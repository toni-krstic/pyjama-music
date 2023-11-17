import { Suspense } from "react";

import { Loader, SearchChart } from "@/components";

const page = ({ params }: { params: { searchTerm: string } }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Showing results for{" "}
        <span className="font-black">{params.searchTerm}</span>
      </h2>
      <Suspense fallback={<Loader />}>
        <SearchChart searchTerm={params.searchTerm} />
      </Suspense>
    </div>
  );
};

export default page;
