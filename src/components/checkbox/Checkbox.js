import styled from "styled-components";

const CheckBoxContainer = styled.div`
    position: relative;
    cursor: pointer;
    /* width: 100%; */
`;

const CheckBoxInput = styled.input.attrs({
    type: "checkbox",
})`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

const CheckBoxLabel = styled.label`
    font-weight: 400;
    font-size: ${({ fontSize }) => fontSize || "16px"};
    cursor: pointer;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: ${({ color }) => color || "#4d555b"};

    &:hover input ~ span {
        background-color: rgb(235, 235, 235);
    }

    input:checked ~ span {
        background-color: ${({ color }) => color || "#0085FF"};
        border: 0;
    }
    input:checked ~ span::after {
        display: block;
    }
`;

const CustomCheckBox = styled.span`
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20px;
    width: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #a1aaad;

    &:after {
        top: 2px;
        width: 5px;
        height: 10px;
        position: absolute;
        margin: 0;
        top: 9%;
        left: 33%;
        transform: translate(-50%, -50%);
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        content: "";
        position: absolute;
        display: none;
    }
`;

const BaseCheckbox = ({
    label,
    defaultChecked = false,
    handleChange = () => {},
    checked,
    name,
    value,
    disabled,
    onClick,
    ref,
    ...props
}) => {
    return (
        <CheckBoxContainer {...props}>
            <CheckBoxLabel>
                {label}
                <CheckBoxInput
                    disabled={disabled}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                    onClick={onClick}
                    ref={ref}
                />
                <CustomCheckBox></CustomCheckBox>
            </CheckBoxLabel>
        </CheckBoxContainer>
    );
};

export default BaseCheckbox;
