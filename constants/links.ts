import { BsLayoutTextSidebarReverse, BsViewList } from "react-icons/bs";
import { RiHome9Line } from "react-icons/ri";

export const links = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: RiHome9Line,
  },
  {
    title: "Minhas Anotações",
    url: "/dashboard/my-notes",
    icon: BsLayoutTextSidebarReverse,
  },
  {
    title: "Anotações Públicas",
    url: "/dashboard/public-notes",
    icon: BsViewList,
  },
];
