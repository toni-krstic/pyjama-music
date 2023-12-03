import { HiOutlineUserGroup } from "react-icons/hi";
import { PiMusicNotesSimpleDuotone } from "react-icons/pi";
import { AiTwotoneCustomerService } from "react-icons/ai";
import { RiUserLocationLine } from "react-icons/ri";

export const pageUrl = {
  discover: () => "/",
  aroundYou: () => "/around-you",
  topArtists: () => "/top-artists",
  topCharts: () => "/top-charts",
};

export const links = [
  {
    name: "Discover",
    to: pageUrl.discover(),
    icon: AiTwotoneCustomerService,
  },
  {
    name: "Around You",
    to: pageUrl.aroundYou(),
    icon: RiUserLocationLine,
  },
  {
    name: "Top Artists",
    to: pageUrl.topArtists(),
    icon: HiOutlineUserGroup,
  },
  {
    name: "Top Charts",
    to: pageUrl.topCharts(),
    icon: PiMusicNotesSimpleDuotone,
  },
];
