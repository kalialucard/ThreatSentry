'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockLogEntries, type LogEntry } from '@/lib/mock-data';
import {
  SearchIcon,
  Filter,
  AlertCircle,
  Shield,
  Clock,
  Server,
  ChevronDown,
  Calendar as CalendarIcon,
} from 'lucide-react';
import FormattedDate from '@/components/shared/formatted-date';
import IpAddress from '@/components/incidents/ip-address';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

type Severity = LogEntry['severity'];
type Action = LogEntry['action'];
type Host = LogEntry['host'];

const severities: Severity[] = ['critical', 'error', 'warning', 'info'];
const actions: NonNullable<Action>[] = ['login', 'db_query', 'read', 'write'];
const hosts: Host[] = [
  ...new Set(mockLogEntries.map((log) => log.host)),
];

export default function SearchPage() {
  const [severityFilters, setSeverityFilters] = useState<Set<Severity>>(
    new Set()
  );
  const [actionFilters, setActionFilters] = useState<Set<Action>>(new Set());
  const [hostFilters, setHostFilters] = useState<Set<Host>>(new Set());
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const toggleSeverityFilter = (severity: Severity) => {
    setSeverityFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(severity)) {
        newSet.delete(severity);
      } else {
        newSet.add(severity);
      }
      return newSet;
    });
  };

  const toggleActionFilter = (action: Action) => {
    setActionFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(action)) {
        newSet.delete(action);
      } else {
        newSet.add(action);
      }
      return newSet;
    });
  };

  const toggleHostFilter = (host: Host) => {
    setHostFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(host)) {
        newSet.delete(host);
      } else {
        newSet.add(host);
      }
      return newSet;
    });
  };

  const filteredLogs = useMemo(() => {
    return mockLogEntries.filter((log) => {
      const logDate = new Date(log.timestamp);
      const severityMatch =
        severityFilters.size === 0 || severityFilters.has(log.severity);
      const actionMatch =
        actionFilters.size === 0 ||
        (log.action && actionFilters.has(log.action));
      const hostMatch = hostFilters.size === 0 || hostFilters.has(log.host);
      const dateMatch =
        !dateRange ||
        !dateRange.from ||
        (logDate >= dateRange.from &&
          (!dateRange.to || logDate <= dateRange.to));

      return severityMatch && actionMatch && hostMatch && dateMatch;
    });
  }, [severityFilters, actionFilters, hostFilters, dateRange]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search & Explore</CardTitle>
          <CardDescription>
            Query your logs using free-text or structured KQL-like queries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder='e.g., severity:error AND src_ip:"192.168.1.1"'
                className="pl-10 h-12 text-lg font-code"
              />
            </div>
            <Button size="lg">Search</Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">
              <Filter className="mr-2" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <AlertCircle className="mr-2" />
                  Severity
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {severities.map((severity) => (
                  <DropdownMenuCheckboxItem
                    key={severity}
                    checked={severityFilters.has(severity)}
                    onCheckedChange={() => toggleSeverityFilter(severity)}
                    onSelect={(e) => e.preventDefault()} // prevent menu from closing
                  >
                    {severity}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Shield className="mr-2" />
                  Action
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {actions.map((action) => (
                  <DropdownMenuCheckboxItem
                    key={action}
                    checked={actionFilters.has(action)}
                    onCheckedChange={() => toggleActionFilter(action)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {action || 'N/A'}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2" />
                  <span>
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'LLL dd, y')} -{' '}
                          {format(dateRange.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(dateRange.from, 'LLL dd, y')
                      )
                    ) : (
                      'Time Range'
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Server className="mr-2" />
                  Host
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Host</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hosts.map((host) => (
                  <DropdownMenuCheckboxItem
                    key={host}
                    checked={hostFilters.has(host)}
                    onCheckedChange={() => toggleHostFilter(host)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {host}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {mockLogEntries.length} log
            entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Timestamp</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono">
                    <FormattedDate date={log.timestamp} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.severity === 'error' || log.severity === 'critical'
                          ? 'destructive'
                          : log.severity === 'warning'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">
                    {log.src_ip ? <IpAddress text={log.src_ip} /> : 'N/A'}
                  </TableCell>
                  <TableCell className="font-mono">{log.host}</TableCell>
                  <TableCell>{log.os || 'N/A'}</TableCell>
                  <TableCell>{log.action || 'N/A'}</TableCell>
                  <TableCell className="text-center">
                    {log.attempts || 'N/A'}
                  </TableCell>
                  <TableCell className="font-code">{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

    