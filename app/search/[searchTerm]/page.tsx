import { Loader } from "@/components/Loader";
import { SearchChart } from "@/components/SearchChart";
import { Suspense } from "react";

interface props {
  params: { searchTerm: string };
}

export default function page({ params }: props) {
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
}
