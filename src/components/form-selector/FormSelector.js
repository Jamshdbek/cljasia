import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Col, Row } from "react-grid-system";
import Text from "../text";
import arrowIcon from "assets/images/icons/arrow-down.svg";
import { ReactSVG } from "react-svg";
import { get } from "lodash";

const ErrorText = styled.span`
    display: inline-block;
    color: #d80027;
    font-size: 12px;
`;

const FormSelector = ({
    options = [],
    label,
    name,
    placeholder,
    validation,
    error,
    defaultValue = "",
    disabled = false,
    control,
    isMulti = false,
    left = 4,
    right = 8,
    rule = {},
    handleChange = (e) => console.log(e),
    value,
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const customStyles = {
        control: (base, state) => ({
            ...base,

            // fontWeight: "500",
            // fontSize: "14px",
            // fontFamily: "Inter, sans-serif",
            // color: "#1c1c1c",

            background: "#fff",
            borderColor: "#E8E8E8",
            borderRadius: "8px",
            boxShadow: "0px 1px 1px rgb(0 0 0 / 6%)",
            "&:hover": {
                borderColor: "none",
            },
            maxWidth: "333px",
            width: "100%",
        }),
        menu: (base, state) => ({
            ...base,
            maxWidth: "333px",
            width: "100%",
        }),
        indicatorSeparator: (base, state) => ({
            ...base,
            display: "none",
        }),
    };

    const customLabel = {
        fontWeight: "500",
        fontSize: "14px",
        color: "#1c1c1c",
    };

    const DropdownIndicator = (props) => {
        return <ReactSVG src={arrowIcon} className={"mr-16"} />;
    };

    // const handleChange = (value) => {
    //     setSelectedValue(value.value);
    // };
    const handleChangeValue = (e) => {
        if (isMulti) {
            handleChange(e.map((item) => item.value));
        } else {
            handleChange(get(e, "value", null));
        }
    };
    return (
        <Row align={"center"} {...props}>
            <Col xs={left}>
                <label style={customLabel}>{label}</label>
            </Col>
            <Col xs={right}>
                <Select
                    clearIndicator={true}
                    options={options}
                    isDisabled={disabled}
                    placeholder={placeholder}
                    onChange={(value) => handleChangeValue(value)}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    isMulti={isMulti}
                    defaultValue={defaultValue}
                    // value={
                    //     isMulti
                    //         ? selectedValue
                    //         : options.filter(
                    //               (option) =>
                    //                   option.value === selectedValue
                    //           )
                    // }
                    value={
                        isMulti && value.length > 0
                            ? options.filter((option) =>
                                  value.includes(option.value)
                              )
                            : options.find((item) => item.value === value)
                    }
                />
            </Col>
            <Col xs={12}>{error && <ErrorText>{error}</ErrorText>}</Col>
        </Row>
    );
};

export default FormSelector;
