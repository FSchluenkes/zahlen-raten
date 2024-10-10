"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Win = () => {
  const router = useRouter();
  const [time, setTime] = useState<number>(5);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      router.push("/guesser");
    }
  }, [time, router]);

  return (
    <div className="flex flex-col items-center justify-center p-40 bg-white rounded-2xl">
      <h1 className="text-2xl font-bold">Du hast gewonnen!</h1>

      <p className="text-2xl font-bold">Du wirst in {time} Sekunden wieder ein neues Spiel starten können.</p>
      <Separator className="my-4" />
      <Button onClick={() => router.push("/guesser")} className="text-2xl font-bold">Neue Runde</Button>
    </div>
  );
};

export default Win;
