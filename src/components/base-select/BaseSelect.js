import React from "react";
import styled, { css } from "styled-components";
import arrowIcon from "assets/images/icons/arrow-down.svg";
import Select from "react-select";
import { ReactSVG } from "react-svg";
import { get } from "lodash";

const StyledBaseSelect = styled.div`
    width: 100%;
    max-width: ${({ width }) => width || "250px"};
    margin: ${({ margin }) => margin || "0px"};
    font-size: 14px;
    color: #1c1c1c;
    font-weight: 500;

    cursor: pointer;
    .select-arrow {
        margin-right: 10px;
        margin-left: 5px;
    }

    ${({ sm }) =>
        sm &&
        css`
            font-size: 13px;
        `};
`;

const customStyles = ({ sm, isDisabled }) => ({
    control: (base, state) => ({
        ...base,
        background: isDisabled ? "#E8E8E8" : "#fff",
        borderColor: "#E8E8E8",
        borderRadius: "8px",
        minHeight: sm ? "28px" : "36px",
        boxShadow: "0px 1px 1px rgb(0 0 0 / 6%)",
        "&:hover": {
            borderColor: "none",
        },
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: "none",
    }),
});

const DropdownIndicator = (props) => {
    return <ReactSVG className={"select-arrow"} src={arrowIcon} />;
};

const BaseSelect = React.forwardRef(
    (
        {
            options = [],
            placeholder = "Select",
            value = "",
            isSearchable = false,
            // disabled = false,
            isDisabled = false,
            isMulti = false,
            defaultValue,
            isLoading = false,
            defaultOptions,
            handleChange = (value) => console.log(value),
            sm,
            onBlur,
            isClearable = false,
            ...props
        },
        ref
    ) => {
        const handleChangeValue = (e) => {
            if (isMulti) {
                handleChange(e.map((item) => item.value));
            } else {
                handleChange(get(e, "value", null));
            }
        };

        return (
            <StyledBaseSelect sm={sm} {...props}>
                <Select
                    ref={ref}
                    key={`unique_key__${value}`}
                    clearIndicator={true}
                    options={options}
                    // disabled={disabled}
                    isClearable={isClearable}
                    isDisabled={isDisabled}
                    placeholder={placeholder}
                    onChange={(value) => handleChangeValue(value)}
                    defaultOptions={
                        isMulti
                            ? defaultOptions
                            : options.filter(
                                  (option) => option.value === defaultOptions
                              )
                    }
                    styles={customStyles({ sm, isDisabled })}
                    components={
                        value && isClearable
                            ? { DropdownIndicator: null }
                            : { DropdownIndicator }
                    }
                    isMulti={isMulti}
                    isSearchable={isSearchable}
                    isLoading={isLoading}
                    value={
                        isMulti && value.length > 0
                            ? options.filter((option) =>
                                  value.includes(option.value)
                              )
                            : options.find((item) => item.value === value)
                    }
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                />
            </StyledBaseSelect>
        );
    }
);

export default BaseSelect;
