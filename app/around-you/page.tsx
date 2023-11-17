import { Suspense } from "react";

import { AroundYouChart, Loader } from "@/components";

const page = () => {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <AroundYouChart />
      </Suspense>
    </div>
  );
};

export default page;
