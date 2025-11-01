"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { date: "2024-07-20T10:00:00.000Z", total: 1234, anomalies: 12 },
  { date: "2024-07-20T11:00:00.000Z", total: 2453, anomalies: 34 },
  { date: "2024-07-20T12:00:00.000Z", total: 1879, anomalies: 21 },
  { date: "2024-07-20T13:00:00.000Z", total: 3123, anomalies: 56 },
  { date: "2024-07-20T14:00:00.000Z", total: 2845, anomalies: 41 },
  { date: "2024-07-20T15:00:00.000Z", total: 3567, anomalies: 121 },
  { date: "2024-07-20T16:00:00.000Z", total: 2145, anomalies: 23 },
];

const chartConfig = {
  total: {
    label: "Total Logs",
    color: "hsl(var(--chart-1))",
  },
  anomalies: {
    label: "Anomalies",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function LogVolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Volume & Anomalies (Last 6 Hours)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
              <Bar dataKey="anomalies" fill="var(--color-anomalies)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
