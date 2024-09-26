"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardTable } from "./leaderboard_table";

 export interface Type_LeaderboardEntry {
  id: number;
  name: string;
  attempts: number;
  score: number;
}

interface LeaderboardContentProps {
  initialData: Type_LeaderboardEntry[];
}

export default function LeaderboardContent({ initialData }: LeaderboardContentProps) {
  const [leaderboard, setLeaderboard] = useState<Type_LeaderboardEntry[]>(initialData);

  return (
    <div className="flex flex-col items-center justify-center px-40 py-4">
      <h1 className="text-2xl font-bold mb-4">Bestenliste</h1>
      <LeaderboardTable entries={leaderboard} />
    </div>
  );
}
