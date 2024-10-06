import { IconType } from "react-icons";
import { FaHome, FaSearch, FaHeart, FaInfoCircle, FaPercent } from "react-icons/fa";

type NavigationItem = {
  name: string;
  href: string;
  icon: IconType;
};

export const NavigationList: NavigationItem[] = [
  { name: "Guesser", href: "/guesser", icon: FaSearch },
  { name: "Leaderboard", href: "/leaderboard", icon: FaSearch },
];