import { TableCell, TableRow } from "../ui/table";
import { Type_LeaderboardEntry } from "./page";

interface LeaderboardEntryProps {
  entry: Type_LeaderboardEntry;
  position: number;
}

export function LeaderboardEntry({ entry, position }: LeaderboardEntryProps) {
  return (
    <TableRow key={entry.id}>
      <TableCell className="text-center font-medium">{position}</TableCell>
      <TableCell>{entry.name}</TableCell>
      <TableCell className="text-right">{entry.attempts}</TableCell>
      <TableCell className="text-right">{entry.score}</TableCell>
    </TableRow>
  );
}
