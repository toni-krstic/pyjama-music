import { AroundYouChart } from "@/components/AroundYouChart";
import { Loader } from "@/components/Loader";
import { getCountry } from "@/core/services/services";
import { Suspense } from "react";

export default async function page() {
  const country: string = await getCountry();
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <AroundYouChart country={country} />
      </Suspense>
    </div>
  );
}
