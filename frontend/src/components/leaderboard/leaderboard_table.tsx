import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import { LeaderboardEntry } from "./leaderboard-entry";
import { Type_LeaderboardEntry } from "./page";

interface LeaderboardTableProps {
  entries: Type_LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <Table className="w-full p-12">
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center bg-red-100 rounded-l-xl">
            Platz
          </TableHead>
          <TableHead className="bg-red-100">Name</TableHead>
          <TableHead className="text-right bg-red-100">Versuche</TableHead>
          <TableHead className="text-right bg-red-100 rounded-r-xl">
            Zahl
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, index) => (
          <LeaderboardEntry key={entry.id} entry={entry} position={index + 1} />
        ))}
      </TableBody>
    </Table>
  );
}