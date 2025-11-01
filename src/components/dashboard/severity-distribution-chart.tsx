"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSeverityDistribution } from "@/lib/mock-data";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

const chartConfig = {
    logs: {
      label: "Logs",
    },
    ...mockSeverityDistribution.reduce((acc, cur) => {
        acc[cur.name.toLowerCase()] = { label: cur.name, color: cur.fill };
        return acc;
    }, {})
} satisfies ChartConfig;


export default function SeverityDistributionChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-64 w-full">
                    <ResponsiveContainer>
                        <PieChart>
                            <Tooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
                            <Pie data={mockSeverityDistribution} dataKey="value" nameKey="name" innerRadius={60}>
                                {mockSeverityDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
