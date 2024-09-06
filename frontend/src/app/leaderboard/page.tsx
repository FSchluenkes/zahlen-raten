export default function Leaderboard() {
  const { data: leaderboard } = useQuery({
    queryKey: ["leaderboard"],
    queryfn: fetchLeaderboard,
  });

  return (
    <div>
      <h1>Bestenliste</h1>

   
    </div>
  );
}
