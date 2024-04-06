import React, { forwardRef } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import Text from "../text";

const StyledFormTextarea = styled.div`
    width: 100%;
    textarea {
        background-color: #fff;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        border: 1px solid ${({ error }) => (error ? "#E92C2C" : "#E8E8E8")};
        max-width: 333px;
        padding: 8px 12px;
        outline: none;
        color: #1c1c1c;
        font-weight: 500;
        font-size: 16px;
        width: 100%;
        min-height: ${({ height }) => height || "100px"};
        font-family: "Inter", sans-serif;
        background-color: ${({ disabled }) => (disabled ? "#E8E8E8" : "#fff")};

        &::placeholder {
            color: rgba(0, 0, 0, 0.7);
        }
    }
`;

const BaseTextarea = forwardRef(({
    label,
    name,
    placeholder,
    validation,
    error,
    center = "flex-start",
    defaultValue = "",
    disabled = false,
    value,
    handleChange,
    left = 4,
    right = 8,
    onBlur,
    ...props

}   , ref) => {
    return (
        <StyledFormTextarea error={error} {...props} disabled={disabled}>
            <textarea
                value={value}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                onBlur={onBlur}
                ref={ref}
            >
            </textarea>
        </StyledFormTextarea>
    );
}
)

export default BaseTextarea;
