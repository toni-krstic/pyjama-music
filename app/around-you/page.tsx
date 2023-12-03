import { AroundYouChart } from "@/components/AroundYouChart";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <AroundYouChart />
      </Suspense>
    </div>
  );
}
