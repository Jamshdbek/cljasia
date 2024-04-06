import React, { Fragment } from "react";
import { useField } from "formik";
import styled from "styled-components";
import Flex from "components/flex";
import { Col, Row } from "react-grid-system";

const StyledFormInput = styled.div`
    input {
        background: #ffffff;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        padding: 8px 12px;
        outline: none;
        font-size: 14px;
        font-weight: 500;
        margin: ${({ margin }) => margin || "0px"};
        color: #1c1c1c;
        display: inline-block;
        max-width: ${({ width }) => width || "333px"};
        width: 100%;
        min-height: ${({ height }) => height || "40px"};
        border: ${({ error }) =>
            error ? "1px solid #D80027" : "1px solid #e8e8e8"};
        &::placeholder {
            color: #979797;
        }
    }

    label {
        font-weight: 500;
        font-size: 14px;
        color: #1c1c1c;
    }

    span {
        display: inline-block;
        font-size: 12px;
        color: #d80027;
    }
`;

const FormInput = ({
    label,
    placeholder,
    value,
    handleOnChange,
    type,
    handleOnBlur,
    error,
    name,
    defaultValue,
    disabled = false,
    left = 4,
    right = 8,
    id,
    ...props
}) => {
    return (
        <StyledFormInput {...props}>
            <Row align={"center"}>
                <Col xs={left} justify={"center"}>
                    <label>{label}</label>
                </Col>
                <Col xs={right}>
                    <input
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleOnChange}
                        type={type}
                        onBlur={handleOnBlur}
                        error={error}
                        name={name}
                        defaultValue={defaultValue}
                        disabled={disabled}
                    />
                </Col>
                <Col xs={12}>{error && <span>{error}</span>}</Col>
            </Row>
        </StyledFormInput>
    );
};

export default FormInput;
