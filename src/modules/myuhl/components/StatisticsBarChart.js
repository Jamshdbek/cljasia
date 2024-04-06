import { Flex, Text } from "components";
import { isEmpty } from "lodash";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import styled from "styled-components";

const StyledPieChart = styled.div`
    height: 50px;
    min-width: 230px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 8px 12px;
    background-color: rgba(0, 0, 0, 0.7);
`;
const Triangle = styled.div`
    width: 0;
    height: 0;
    border-left: none;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid rgba(0, 0, 0, 0.7);
`;

const StatisticsBarChart = ({ data, dataKey }) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active) {
            return (
                <Flex>
                    <Triangle />
                    <StyledPieChart>
                        <Text light style={{ minWidth: "100%" }}>
                            {payload[0].payload.name}: {payload[0].value}
                        </Text>
                    </StyledPieChart>
                </Flex>
            );
        }
    };
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
                    fill={"#666"}
                    transform="rotate(-8)"
                >
                    {!isEmpty(payload) && payload.value}
                </text>
            </g>
        );
    };
    return (
        <ResponsiveContainer width={"100%"} height={500}>
            <BarChart width={400} height={300} data={data}>
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey={dataKey}
                    nameKey="name"
                    fill="rgba(158, 179, 226, 0.7)"
                    // barSize={50} // width of each bar chart
                />
                <XAxis
                    dataKey="name"
                    tick={<CustomizedAxisTick />}
                    height={100}
                />
                <YAxis />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StatisticsBarChart;
