"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaKey } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { handleRefreshToken, handleLogout } from "@/lib/client-auth";
import { useEffect, useState } from "react";

const UserDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Gast");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const result = await handleRefreshToken();
        if (result) {
          setIsLoggedIn(result);

          // setUsername(result.username || "Benutzer");
          // setEmail(result.email || "");
        }
      } catch (error) {
        console.error("Fehler beim Aktualisieren des Tokens:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      try {
        await handleLogout();
        setIsLoggedIn(false);
        setUsername("Gast");
        setEmail("");
        router.push("/");
      } catch (error) {
        console.error("Fehler beim Abmelden:", error);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 rounded-full flex items-center space-x-2 px-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt={username} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-4 hover:bg-red-400"
          onClick={handleAuthAction}
        >
          <FaKey className="h-4 w-4" />
          <h1 className="text-sm font-medium leading-none">
            {isLoggedIn ? "Abmelden" : "Anmelden"}
          </h1>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
