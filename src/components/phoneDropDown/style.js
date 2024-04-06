import PhoneInput from "react-phone-input-2";
import styled from "styled-components";
import Text from "components/text";

const PhoneInputContainer = styled.div`
    width: 100%;
    height: 36px;
`;

const DropdownTitle = styled(Text).attrs({
    color: "#4D555B",
})``;

const StyledPhoneInput = styled(PhoneInput).attrs(({ disabled, zIndex }) => ({
    placeholder: "",
    containerStyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#e8e8e8",
        borderStyle: "solid",
        boxShadow: "0px 1px 1px rgb(0 0 0 / 6%)",
        borderRadius: "8px",
        backgroundColor: disabled ? "#e8e8e8" : "#fff",
    },
    inputStyle: {
        width: "calc(100% - 40px)",
        position: "absalute",
        // zIndex: 5,
        borderWidth: 0,
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "21px",
        letterSpacing: "0.01em",
        padding: "0px 0px",
        marginLeft: 40,
        borderRadius: "8px",
        backgroundColor: disabled ? "#e8e8e8" : "#fff",
        // backgroundColor:"red",
        // color: "#9DA2AA",
        // zIndex:0,
        zIndex: zIndex ? 0 : 5
    },
    buttonStyle: {
        width: "100%",
        borderWidth: 0,
        backgroundColor: "inherit",
        borderRadius: "8px",
    },
    searchStyle: {
        width: "90%",
        height: 30,
        borderRadius: "8px",
    },
    dropdownStyle: {
        position: "static",
        width: "100%",
        borderRadius: "8px",
        // boxShadow: "none",
        borderWidth: 1,
        borderColor: "#A2AAAD",
        borderStyle: "solid",
    },
}))``;

export { PhoneInputContainer, StyledPhoneInput, DropdownTitle };
