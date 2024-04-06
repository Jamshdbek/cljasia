import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NumericFormat } from "react-number-format";

const StyledBaseInput = styled(NumericFormat)`
    background: ${({ disabled }) => (disabled ? "#E8E8E8" : "#ffffff")};
    border: 1px solid #e8e8e8;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 8px 12px;
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

    &::placeholder {
        color: #979797;
    }
`;
const BaseMaskInput =forwardRef(({
    clear = "",
    placeholder = "",
    disabled = false,
    handleInput = () => {
        console.log("input");
    },
    ...props
},
ref
) => {
    const tes = useRef()
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
    console.log("log",ref)
    return (
        <StyledBaseInput
            type="text"
            value={val}
            ref={ref}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            {...props}
        />
    );
})

export default BaseMaskInput;
