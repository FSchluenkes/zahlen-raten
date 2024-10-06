"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const WelcomeButton = () => {
  const router = useRouter();
  return (
    <Button
      className="p-4 w-full rounded-2xl"
      size="lg"
      aria-label="Zum Spiel"
      onClick={() => router.push("/guesser")}
    >
      Zum Spiel
    </Button>
  );
};

export default WelcomeButton;
