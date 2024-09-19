import LeaderboardContent from "@/components/leaderboard/page";
import { getMockLeaderboard } from "@/lib/leaderboard";

export default async function LeaderboardPage() {
  const leaderboardData = await getMockLeaderboard();

  return <LeaderboardContent initialData={leaderboardData} />;
}