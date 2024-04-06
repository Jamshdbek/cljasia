import { forwardRef } from "react";
import { StyledPhoneInput } from "./style";

const PhoneDropDown = forwardRef(
    (
        {
            value,
            handleChangePhone,
            initialCountry,
            title,
            optionCountries,
            enableSearch = true,
            disabled,
            zIndex = false,
            // enableSearchPnl=false,
            ...props
        },
        ref
    ) => {
        return (
            <StyledPhoneInput
                country={initialCountry}
                onlyCountries={optionCountries}
                enableAreaCodeStretch
                countryCodeEditable={true}
                value={value}
                onChange={(phone) => handleChangePhone(phone)}
                enableSearch
                disabled={disabled}
                zIndex={zIndex}
                ref={ref}
                {...props}
            />
        );
    }
);

export default PhoneDropDown;
