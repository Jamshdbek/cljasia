import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import remove from "assets/images/icons/minus.svg";
import Flex from "components/flex";
import { useEffect, useState } from "react";
import { get } from "lodash";
import editpen from "assets/images/icons/editpen.svg";
import BaseButton from "components/base-button";

const CollapseContainer = styled.div`
    width: 100%;
    padding-left: 96px;
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
            flex-basis: 60%;
        `};
    ${({ basis_40 }) =>
        basis_40 &&
        css`
            flex-basis: 40%;
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

const SubInfoBox = ({
    district,
    districtCode,
    dispatchRemoveItem,
    setEditDistrictData,
    editable = false,
    districtId,
    disabled,
    regionId,
    dispatchEditDefaultData,
    submitEditableForm,
    cancelEditableForm,
    ...props
}) => {
    const [districtData, setDistrictData] = useState({});

    useEffect(() => {
        setDistrictData({ district, districtCode });
    }, [district, districtCode]);

    // useEffect(() => {
    //     setEditDistrictData({ ...districtData, id });
    // }, [districtData, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDistrictData({
            ...districtData,
            [name]: value,
        });
        setEditDistrictData({
            ...districtData,
            districtId,
            regionId,
            [name]: value,
        });
    };

    const [openEdit, setOpenEdit] = useState(false);
    const editTriggerDropDown = () => {
        setOpenEdit(!openEdit);
        dispatchEditDefaultData();
    };

    return (
        <>
            <CollapseContainer {...props}>
                <CollapseWrapper>
                    <div style={{ display: "flex", width: "100%" }}>
                        <ChildWrapper basis_60>
                            <Input
                                disabled={
                                    disabled
                                        ? true
                                        : editable
                                        ? !openEdit
                                        : false
                                }
                                basis_50
                                value={get(districtData, "district", "")}
                                name="district"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <Input
                                disabled={
                                    disabled
                                        ? true
                                        : editable
                                        ? !openEdit
                                        : false
                                }
                                basis_50
                                value={get(districtData, "districtCode", "")}
                                name="districtCode"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </ChildWrapper>

                        <ChildWrapper basis_40>
                            <Flex
                                className={"pr-32"}
                                // justify={"space-between"}
                                style={{ width: "100%" }}
                            >
                                <ReactSVG
                                    src={remove}
                                    className={"svg_icon mr-16"}
                                    onClick={dispatchRemoveItem}
                                    style={{ height: 20, width: 20 }}
                                />
                                {editable && (
                                    <div>
                                        {openEdit ? (
                                            <>
                                                <BaseButton
                                                    primary
                                                    handleClick={() => {
                                                        submitEditableForm();
                                                        setOpenEdit(!openEdit);
                                                    }}
                                                    type="submit"
                                                    className="mr-4"
                                                >
                                                    Сохранить
                                                </BaseButton>
                                                <BaseButton
                                                    danger
                                                    handleClick={() => {
                                                        cancelEditableForm();
                                                        setOpenEdit(!openEdit);
                                                    }}
                                                    type="submit"
                                                >
                                                    Отменить
                                                </BaseButton>
                                            </>
                                        ) : (
                                            <ReactSVG
                                                src={editpen}
                                                className={"svg_icon mr-16"}
                                                onClick={editTriggerDropDown}
                                            />
                                        )}
                                    </div>
                                )}
                            </Flex>
                        </ChildWrapper>
                    </div>
                </CollapseWrapper>
            </CollapseContainer>
        </>
    );
};

export default SubInfoBox;
