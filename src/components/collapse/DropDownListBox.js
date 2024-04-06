import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import remove from "assets/images/icons/minus.svg";
import Flex from "components/flex";
import { useEffect, useState } from "react";
import { get } from "lodash";
import BaseSelect from "components/base-select";

const CollapseContainer = styled.div`
    width: 100%;
`;

const CollapseWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

const ChildWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    gap: 8px;
    ${({ basis_60 }) =>
        basis_60 &&
        css`
            flex-basis: 80%;
        `};
    ${({ basis_40 }) =>
        basis_40 &&
        css`
            flex-basis: 20%;
        `};
`;

const Input = styled.input`
    display: flex;
    outline: none;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    padding: 6px 12px;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;

    ${({ basis_50 }) =>
        basis_50 &&
        css`
            flex-basis: 47.5%;
        `};
`;

const DropDownListBox = ({
    region,
    price,
    dispatchRemoveItem,
    setRegionPrice,
    id,
    dropDown = false,
    options,
    ...props
}) => {
    const [regionPriceData, setRegionPriceData] = useState({});
    useEffect(() => {
        setRegionPriceData({ region, price });
    }, [region, price]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegionPriceData({
            ...regionPriceData,
            [name]: value,
        });
        setRegionPrice({ ...regionPriceData, id, [name]: value });
    };

    return (
        <>
            <CollapseContainer {...props}>
                <CollapseWrapper>
                    <div style={{ display: "flex", width: "100%" }}>
                        <ChildWrapper basis_60>
                            <BaseSelect
                                value={get(regionPriceData, "region", "")}
                                name="region"
                                handleChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: "region",
                                            value: e,
                                        },
                                    })
                                }
                                options={options}
                            />

                            <Input
                                basis_50
                                value={get(regionPriceData, "price", "")}
                                name="price"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </ChildWrapper>

                        <ChildWrapper basis_40>
                            <Flex
                                className={"pl-32"}
                                justify={"space-between"}
                                style={{ width: "100%" }}
                            >
                                <ReactSVG
                                    src={remove}
                                    className={"svg_icon"}
                                    onClick={dispatchRemoveItem}
                                    style={{ height: 20, width: 20 }}
                                />
                            </Flex>
                        </ChildWrapper>
                    </div>
                </CollapseWrapper>
            </CollapseContainer>
        </>
    );
};

export default DropDownListBox;
