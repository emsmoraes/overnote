import { BsLayoutTextSidebarReverse, BsViewList } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";

export const links = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HiOutlineHome,
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
