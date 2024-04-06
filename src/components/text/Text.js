import styled, { css } from "styled-components";

const StyledText = styled.span`
    display: inline-block;
    color: #1C1C1C;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    font-weight: ${({ fontWeight }) => fontWeight || "400"};
    padding: ${({ padding }) => padding || "0px"};
    margin: ${({ margin }) => margin || "0px"};
    ${({ danger }) =>
        danger &&
        css`
            color: #e92c2c;
        `};
    ${({ tangerine }) =>
        tangerine &&
        css`
            color: #f79e1b;
        `};
    ${({ dark }) =>
        dark &&
        css`
            color: #1c1c1c;
        `};
    ${({ light }) =>
        light &&
        css`
            color: #fff;
        `};

    ${({ gray }) =>
        gray &&
        css`
            color: #969696;
        `};

    ${({ success }) =>
        success &&
        css`
            color: #53ac92;
        `};

    ${({ primary }) =>
        primary &&
        css`
            color: #0052b4;
        `};
        
    ${({ blue }) =>
    blue &&
        css`
            color: #0085FF;
        `};

    ${({ info }) =>
        info &&
        css`
            color: #55acee;
        `};

    ${({ danger }) =>
        danger &&
        css`
            color: #d80027;
        `};

    ${({ green }) =>
        green &&
        css`
            color: #00a241;
        `};
    ${({ dark }) =>
        dark &&
        css`
            color: #000000;
        `};

    ${({ lightDark }) =>
        lightDark &&
        css`
            color: #585757;
        `};

    ${({ review }) =>
        review &&
        css`
            color: rgba(123, 97, 255, 1);
        `}

    ${({ medium }) =>
        medium &&
        css`
            font-weight: 500;
        `};

    ${({ bold }) =>
        bold &&
        css`
            font-weight: 700;
        `};

    ${({ xxl }) =>
        xxl &&
        css`
            font-size: 32px;
        `};

    ${({ xl }) =>
        xl &&
        css`
            font-size: 23px;
        `};

    ${({ large }) =>
        large &&
        css`
            font-size: 18px;
        `};

    ${({ small }) =>
        small &&
        css`
            font-size: 14px;
        `};

    ${({ xs }) =>
        xs &&
        css`
            font-size: 12px;
        `};
    ${({ xxs }) =>
        xxs &&
        css`
            font-size: 10px;
        `};
`;

const Text = (props) => {
    return <StyledText {...props} />;
};

export default Text;
