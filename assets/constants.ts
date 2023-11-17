import { HiOutlineUserGroup } from "react-icons/hi";
import { PiMusicNotesSimpleDuotone } from "react-icons/pi";
import { AiTwotoneCustomerService } from "react-icons/ai";
import { RiUserLocationLine } from "react-icons/ri";

export const genres = [
  { title: "Electronic", value: "genre-global-chart-4" },
  { title: "Hip-Hop", value: "genre-global-chart-2" },
  { title: "Dance", value: "genre-global-chart-3" },
  { title: "Pop", value: "genre-global-chart-1" },
  { title: "Soul", value: "genre-global-chart-5" },
  { title: "Alternative", value: "genre-global-chart-6" },
  { title: "Rock", value: "genre-global-chart-7" },
  { title: "Latin", value: "genre-global-chart-8" },
  { title: "Film", value: "genre-global-chart-9" },
  { title: "Country", value: "genre-global-chart-10" },
  { title: "Afro", value: "genre-global-chart-11" },
  { title: "Worldwide", value: "genre-global-chart-12" },
  { title: "Reggae", value: "genre-global-chart-13" },
  { title: "House", value: "genre-global-chart-14" },
  { title: "K-Pop", value: "genre-global-chart-15" },
  { title: "French Pop", value: "genre-global-chart-16" },
  { title: "Singer", value: "genre-global-chart-17" },
  { title: "Regional Mexicano", value: "genre-global-chart-18" },
];

export const links = [
  { name: "Discover", to: "/", icon: AiTwotoneCustomerService },
  { name: "Around You", to: "/around-you", icon: RiUserLocationLine },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: PiMusicNotesSimpleDuotone },
];
