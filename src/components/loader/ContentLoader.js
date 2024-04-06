import React from "react";
import styled from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";

const StyledContentLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    height: ${({ height }) => height || "auto"};
`;

const ContentLoader = ({
    show = false,
    color = "#0085FF",
    size = 75,
    ...props
}) => {
    return (
        <StyledContentLoader {...props}>
            <BounceLoader color={color} loading={true} size={size} />
        </StyledContentLoader>
    );
};

export default ContentLoader;
