import React from "react";
import styled, { css } from "styled-components";
import { ReactSVG } from "react-svg";
import chevronIcon from "assets/images/icons/chevron.svg";

const StyledBaseButton = styled.button`
    border: none;
    background-color: #8a8d9d;
    outline: none;
    text-decoration: none;
    border-radius: 8px;
    color: ${({ color }) => color || "#fff"};
    padding: 8px 12px;
    cursor: pointer;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
        0px 1px 1px rgba(0, 0, 0, 0.08);
    font-size: ${({ fontSize }) => fontSize || "16px"};
    min-width: ${({ width }) => width || "100px"};
    .chevron {
        margin-left: 15px;
    }
    margin: ${({ margin }) => margin || "0px"};
    &[disabled] {
        cursor: not-allowed;
    }

    ${({ primary }) =>
        primary &&
        css`
            background-color: #0085ff;
        `};

    ${({ light_primary }) =>
        light_primary &&
        css`
            background-color: #407dc7;
        `};

    ${({ flower }) =>
        flower &&
        css`
            background-color: #b2b8fb;
        `};

    ${({ light_flower }) =>
        light_flower &&
        css`
            background-color: #7391f8;
        `};

    ${({ success }) =>
        success &&
        css`
            background-color: #53ac92;
        `};

    ${({ tangerine }) =>
        tangerine &&
        css`
            background-color: #f79e1b;
        `};

    ${({ info }) =>
        info &&
        css`
            background-color: #9247b5;
        `};

    ${({ danger }) =>
        danger &&
        css`
            background-color: rgba(216, 0, 39, 1);
        `};

    ${({ light_danger }) =>
        light_danger &&
        css`
            background-color: #ec536a;
        `};

    ${({ green }) =>
        green &&
        css`
            background-color: #00a241;
        `};

    ${({ gray, disabled }) =>
        (gray || disabled) &&
        css`
            background-color: #bbbbbb;
        `};

    ${({ bordered }) =>
        bordered &&
        css`
            border: solid 1px #0085ff;
            color: #0085ff;
            background-color: #ffffff;
        `};

    ${({ medium }) =>
        medium &&
        css`
            font-weight: 500;
        `};

    ${({ outlined }) =>
        outlined &&
        css`
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
            border: 1px solid #e8e8e8;
            background-color: transparent;
            display: inline-flex;
            color: #1c1c1c;
            font-weight: 500;
        `};
`;
const BaseButton = ({
    children,
    outlined = false,
    type = "button",
    handleClick = () => {},
    disabled,
    ...props
}) => {
    return (
        <StyledBaseButton
            onClick={handleClick}
            outlined={outlined}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
            {outlined && <ReactSVG className={"chevron"} src={chevronIcon} />}
        </StyledBaseButton>
    );
};

export default BaseButton;
