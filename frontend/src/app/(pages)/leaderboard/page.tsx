import { getLeaderboard } from "@/actions/flaskapi";
import LeaderboardContent from "@/components/leaderboard/page";
import { getMockLeaderboard } from "@/lib/leaderboard";

export default async function LeaderboardPage() {
  const leaderboardMockData = await getMockLeaderboard();
  const leaderboardData = await getLeaderboard();

  return <LeaderboardContent initialData={leaderboardData} />;
}