import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockIncidents, type Incident } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import FormattedDate from "../shared/formatted-date";

const severityVariantMap = {
    high: 'destructive',
    medium: 'secondary',
    low: 'outline'
} as const;

export default function RecentIncidentsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent High-Severity Incidents</CardTitle>
        <Button variant="ghost" size="sm" asChild>
            <Link href="/incidents">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Incident</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIncidents.slice(0, 4).map((incident: Incident) => (
              <TableRow key={incident.id}>
                <TableCell className="font-medium">{incident.title}</TableCell>
                <TableCell>
                    <Badge variant={severityVariantMap[incident.severity]}>{incident.severity}</Badge>
                </TableCell>
                <TableCell><FormattedDate date={incident.timestamp} /></TableCell>
                <TableCell>
                    <span className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${incident.status === 'open' ? 'bg-red-500' : incident.status === 'monitoring' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                        {incident.status}
                    </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}