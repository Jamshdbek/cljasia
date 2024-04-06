import React from "react";
import styled, { css } from "styled-components";

const StyledContent = styled.section`
    position: relative;
    background: #ffffff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
        0px 1px 1px rgba(0, 0, 0, 0.08);
    border-radius: 0px 0px 0px 0px;
    padding: 20px 20px 30px 20px;
    width:100%;
    ${({ rounded }) =>
        rounded &&
        css`
            border-radius: 8px;
        `};
    min-height: ${({ height }) => height || "75vh"};
    
`;
const Content = (props) => {
    return <StyledContent {...props} />;
};

export default Content;
