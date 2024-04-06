import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { Flex, Text } from "components";
import styled from "styled-components";

const StyledPieChart = styled.div`
    height: 50px;
    min-width: ${({ width }) => width || "150px"};
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

const COLORS = [
    "#3D68C5",
    "#CB4627",
    "#F29C38",
    "#449231",
    "#8C2294",
    "#3942A6",
    "#4198C2",
    "#CD5277",
    "#75A733",
    "#AA3A35",
    "#3C6391",
    "#8E4B95",
    "#52A799",
    "#ABA838",
];

const StatisticsPieChart = ({ data }) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active) {
            return (
                <Flex>
                    <Triangle />
                    <StyledPieChart>
                        <Text light>
                            {payload[0].name}: {payload[0].value}
                        </Text>
                    </StyledPieChart>
                </Flex>
            );
        }
    };
    return (
        <ResponsiveContainer width={"75%"} height={500}>
            <PieChart width={400} height={500}>
                <Pie
                    dataKey={"count"}
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    nameKey="name"
                    fill="#8884d8"
                >
                    {data.map((item, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default StatisticsPieChart;
