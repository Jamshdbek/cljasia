import { isObject } from "lodash";
import React from "react";
import styled from "styled-components";

const StyledBaseTable = styled.table`
    text-align: center;
    width: 100%;
    border-collapse: collapse;
    margin: ${({ margin }) => margin || "0px"};
    min-height: 10vh;
    tr {
        min-height: unset;
        th,
        td {
            padding: ${({ myuhlPage }) => (myuhlPage ? "15px 8px" : "15px")};
        }

        th {
            width: 100px;
            font-size: 12px;
            color: #969696;
            font-weight: 500;
            border-bottom: 1px solid #e8e8e8;
        }

        td {
            font-size: 12px;
            color: #585757;
            font-weight: 500;
            border-bottom: 1px solid #e8e8e8;
            min-width: ${({ minWidth }) => minWidth || ""};
        }
    }
`;

const BaseTable = ({ children, tableHeader = [], ...props }) => {
    return (
        <div style={{ overflowX: "auto" }}>
            <StyledBaseTable {...props}>
                <thead>
                    <tr>
                        {tableHeader &&
                            tableHeader.map((item, index) => {
                                if (isObject(item)) {
                                    const { name, ...rest } = item;

                                    return (
                                        <th key={index} style={rest}>
                                            {name}
                                        </th>
                                    );
                                } else {
                                    return <th key={index}>{item}</th>;
                                }
                            })}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </StyledBaseTable>
        </div>
    );
};

export default BaseTable;
