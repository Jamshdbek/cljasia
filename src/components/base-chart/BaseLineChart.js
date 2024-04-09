import React, { useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    ReferenceLine,
    CartesianAxis,
    Label,
} from "recharts";
import moment from "moment";
import { forInRight, get, head, merge, round } from "lodash";
import styled from "styled-components";
import { NumericFormat } from "react-number-format";
import Text from "../text";

const StyledBaseLineChart = styled.div`
    height: 100%;
    min-height: ${({ height }) => height || "600px"};
    width: ${({ width }) => width || "100%"};

    .recharts-legend-wrapper {
        left: 65px !important;
        bottom: 0px !important;
    }
    .recharts-tooltip-wrapper {
        background: #ffffff !important;
        box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.1),
            0px 9px 46px rgba(0, 0, 0, 0.06), 0px 24px 38px rgba(0, 0, 0, 0.04) !important;
        border-radius: 8px !important;
        border: none !important;
    }

    /* .custom-cartesian-grid:last-child {
        display: none;
    } */
`;

const StyledCustomTooltip = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 236px;
    height: 48px;
    padding: 0 10px;
    background: #ffffff;
    box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.1),
        0px 9px 46px rgba(0, 0, 0, 0.06), 0px 24px 38px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
`;

const dotsStyle = {
    stroke: "#0085FF",
    color: "#0085FF",
    r: 4,
    fill: "#0085FF",
};

const BaseLineChart = ({
    data = [],
    colors = ["#F98600", "#00BA34", "#0085FF"],
    lines = [],
    type = "monotone",
    date = "month",
    ...props
}) => {
    // data = data.map((item) =>
    //     merge(
    //         { name: item["month"] ?? item["year"] ?? item["day"] },
    //         ...lines.map((line) => ({ [line]: 0 })),
    //         ...get(item, "values").map(({ country, sum }) => ({
    //             [country]: round(sum, 2),
    //         }))
    //     )
    // );

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <StyledCustomTooltip>
                    <Text medium dark className="label">
                        {label && label.split("-")[0]} {payload[0].payload.year}
                    </Text>
                    <Text medium dark className="desc">
                        <NumericFormat
                            displayType={"text"}
                            thousandSeparator={","}
                            value={round(payload[0].value, 2)}
                            decimalScale={0}
                            fixedDecimalScale={true}
                            prefix={"¥"}
                        />
                    </Text>
                </StyledCustomTooltip>
            );
        }

        return null;
    };

    const CustomizedLabelY = (props) => {
        // console.log("payload", props);
        return (
            <Text style={{ border: "1px solid red" }}>
                <NumericFormat
                    displayType={"text"}
                    thousandSeparator={","}
                    value={get(props, "payload.value", 1000)}
                    decimalScale={0}
                    fixedDecimalScale={true}
                />
            </Text>
        );
    };

    const [isLabelActive, setIsLabelActive] = useState(false); // for active label

    const CustomizedAxisTick = (props) => {
        const { x, y, stroke, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    dx={20}
                    textAnchor="end"
                    fill={isLabelActive ? "#0085FF" : "#666"}
                    // transform="rotate(-35)"
                >
                    {payload && payload.value && payload.value.split("-")[0]}
                </text>
                <text
                    x={0}
                    y={0}
                    dy={40}
                    dx={12}
                    textAnchor="end"
                    fill="#000"
                    // transform="rotate(-35)"
                >
                    {payload.index === 0
                        ? payload.value && `${payload.value.split("-")[1]}`
                        : payload.value &&
                          payload.value.split("-")[0] === "Янв."
                        ? payload.value && `${payload.value.split("-")[1]}`
                        : ""}
                </text>
            </g>
        );
    };

    const maxDomain = data.map((item) => Number(item.amt));

    const dataMax = Math.max(...maxDomain) + 5000;
    const ticksY = [0];
    if (dataMax > 0) {
        const preRise = dataMax / 5;
        const arr = [1, 2, 3, 4, 5];
        let i = 0;
        arr.forEach((item) => {
            ticksY.push(i + +preRise);
            i = i + preRise;
        });
    }

    return (
        <StyledBaseLineChart {...props}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 15,
                        left: 40,
                        bottom: 30,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="8 8"
                        className="custom-cartesian-grid"
                    />
                    <XAxis
                        dataKey={"name"}
                        tick={<CustomizedAxisTick />}
                        interval={0}
                    />
                    <YAxis
                        type={"number"}
                        tickCount={6}
                        scale="auto"
                        // ticks={ticksY}
                        tickFormatter={(item) =>
                            new Intl.NumberFormat("en", {
                                maximumFractionDigits: 0,
                            }).format(item)
                        }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {/* <ReferenceLine stroke="red" label="Min PAGE" /> */}
                    {/* <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="left"
                        height={36}
                    /> */}
                    {/* {lines &&
                        lines.map((line, index) => (
                            <Line
                                key={index}
                                type={type}
                                dataKey={line}
                                strokeWidth={2}
                                stroke={colors[index - 1]}
                                activeDot={{ r: 8 }}
                            />
                        ))} */}
                    <Line
                        // key={index}
                        type={type}
                        dataKey={"amt"}
                        activeDot={{
                            r: 8,
                            fill: "#ffff",
                            stroke: "#0085FF",
                        }}
                        stroke={"#0085FF"}
                        strokeWidth={2}
                        dot={{ ...dotsStyle }}
                        isAnimationActive={false}
                    />

                    {/* <Line key={index} type={type} dataKey={line} strokeWidth={2} stroke={colors[index - 1]} activeDot={{r: 8}}/> */}
                </LineChart>
            </ResponsiveContainer>
        </StyledBaseLineChart>
    );
};

export default BaseLineChart;
