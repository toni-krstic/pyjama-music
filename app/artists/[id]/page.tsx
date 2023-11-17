import { Suspense } from "react";

import { ArtistChart, Loader } from "@/components";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <ArtistChart id={params.id} />
      </Suspense>
    </div>
  );
};

export default page;
