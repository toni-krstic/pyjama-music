import Image from "next/image";

import { loader } from "@/assets";

interface Props {
  title?: string;
}

const Loader: React.FC<Props> = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <Image src={loader} alt="loader" />
    <h1 className="font-bold text-2xl text-white mt-2">
      {title || "Loading..."}
    </h1>
  </div>
);

export default Loader;
