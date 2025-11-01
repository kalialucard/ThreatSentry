"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockIncidents } from "@/lib/mock-data";
import LlmSummary from "@/components/incidents/llm-summary";
import FormattedDate from "@/components/shared/formatted-date";
import IpAddress from "@/components/incidents/ip-address";

const severityVariantMap = {
    high: 'destructive',
    medium: 'secondary',
    low: 'outline'
} as const;

export default function IncidentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Incidents</CardTitle>
        <CardDescription>
          A log of all detected security incidents and anomalies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Incident ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell className="font-mono">{incident.id}</TableCell>
                <TableCell className="font-medium">{incident.title}</TableCell>
                <TableCell>
                  <Badge variant={severityVariantMap[incident.severity]}>
                    {incident.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <FormattedDate date={incident.timestamp} />
                </TableCell>
                <TableCell>{incident.events}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${incident.status === 'open' ? 'bg-red-500' : incident.status === 'monitoring' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                    {incident.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-headline">{incident.title}</DialogTitle>
                        <DialogDescription>
                          {incident.id} &bull; <FormattedDate date={incident.timestamp} />
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-4">
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          <IpAddress text={incident.details} />
                        </div>
                        <LlmSummary incident={incident} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
