"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationList } from "@/Declarations/navigation";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "../user-dropdown/user-dropdown";

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={"/"} className="text-xl font-bold text-red-900 text1">
              Zahlen-Raten
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10  flex items-baseline space-x-4">
              {NavigationList.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200",
                    {
                      " bg-defaultprimary p-2 rounded-xl bg-red-600 text-white":
                        pathname === item.href,
                    }
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Header;
