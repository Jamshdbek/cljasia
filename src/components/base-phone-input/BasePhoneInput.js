import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import styled from "styled-components";
import sthKorFlg from "assets/images/picture/south_korea.png";

const StyledBaseInput = styled(PatternFormat)`
    background: ${({ disabled }) => (disabled ? "#E8E8E8" : "#ffffff")};
    border: 1px solid #e8e8e8;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 8px 12px 8px 40px;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    margin: ${({ margin }) => margin || "0px"};
    color: #1c1c1c;
    display: inline-block;
    /* min-width: ${({ width }) => width || "auto"}; */
    min-height: 36px;
    width: 100%;
    max-width: ${({ width }) => width || "400px"};

    type: ${({ type }) => type || "text"};

    &::placeholder {
        color: #979797;
    }
`;
const BasePhoneInput = ({
    clear = "",
    placeholder = "",
    disabled = false,
    handleInput = () => {
        console.log("input");
    },
    ...props
}) => {
    const [val, setVal] = useState(clear);

    const handleChange = (e) => {
        setVal(e.target.value);
        handleInput(e.target.value);
    };

    useEffect(() => {
        if (clear.length == 0) {
            setVal(clear);
        }
    }, [clear]);
    return (
        <div style={{ position: "relative" }}>
            <StyledBaseInput
                value={val}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />
            <img
                src={sthKorFlg}
                alt={"south korea flag"}
                width={"21"}
                height={"14"}
                style={{
                    border: "1px solid #F0EEED",
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    );
};

export default BasePhoneInput;
