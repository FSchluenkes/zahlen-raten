"use client";

import { useState, useEffect } from "react";
import { LeaderboardTable } from "./leaderboard_table";
import { LeaderboardEntry } from "@/actions/flaskapi";

interface LeaderboardContentProps {
  initialData: LeaderboardEntry[];
}

export default function LeaderboardContent({
  initialData,
}: LeaderboardContentProps) {
  const [leaderboard, setLeaderboard] =
    useState<LeaderboardEntry[]>(initialData);

  return (
    <div className="flex flex-col items-center justify-center px-40 py-4">
      <h1 className="text-2xl font-bold mb-4">Bestenliste</h1>
      <LeaderboardTable entries={leaderboard} />
    </div>
  );
}
