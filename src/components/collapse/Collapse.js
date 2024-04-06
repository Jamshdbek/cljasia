import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import dropDown from "assets/images/icons/drop-down.svg";
import closeDown from "assets/images/icons/closeDown.svg";
import editpen from "assets/images/icons/editpen.svg";
import remove from "assets/images/icons/minus.svg";
import Flex from "components/flex";
import AddSubInfoBox from "./AddSubInfoBox";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import BaseButton from "components/base-button";

const CollapseContainer = styled.div`
    width: 100%;
    background: #d9d9d9;
    padding: 14px 0 14px 96px;
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
    padding: 14px 12px;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;

    ${({ basis_40 }) =>
        basis_40 &&
        css`
            flex-basis: 45%;
        `};
    ${({ basis_30 }) =>
        basis_30 &&
        css`
            flex-basis: 25%;
        `};

    ${({ basis_30 }) =>
        basis_30 &&
        css`
            flex-basis: 25%;
        `};
`;

const DropDownBox = styled.div`
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    min-height: 100px;
    gap: 15px;
    padding: 30px 0;
`;

const Collapse = ({
    region,
    regionIndex,
    regionCode,
    dispatchRemove,
    children,
    district,
    handleChangeDistrict,
    districtCode,
    handleChangeDistrictCode,
    dispatchDistrict,
    setEditCountryData,
    id,
    editable = false,
    disabled,
    dispatchEditDefaultData,
    submitEditableForm,
    cancelEditableForm,
    ...props
}) => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [countryData, setCountryData] = useState({});

    useEffect(() => {
        setCountryData({ region, regionIndex, regionCode });
    }, [region, regionIndex, regionCode]);

    const triggerDropDown = () => {
        setOpen(!open);
    };

    const editTriggerDropDown = () => {
        setOpenEdit(!openEdit);
        dispatchEditDefaultData();
    };

    // useEffect(() => {
    //     setEditCountryData({ ...countryData, id });
    // }, [countryData, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCountryData({
            ...countryData,
            [name]: value,
        });
        setEditCountryData({ ...countryData, id, [name]: value });
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
                                basis_40
                                placeholder={"Название региона..."}
                                value={get(countryData, "region", "")}
                                name="region"
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
                                basis_30
                                placeholder={"Индекс..."}
                                value={get(countryData, "regionIndex", "")}
                                name="regionIndex"
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
                                basis_30
                                placeholder={"Код..."}
                                value={get(countryData, "regionCode", "")}
                                name="regionCode"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </ChildWrapper>

                        <ChildWrapper basis_40>
                            <Flex
                                className={"pr-32"}
                                justify={"space-between"}
                                style={{ width: "100%" }}
                            >
                                <ReactSVG
                                    src={remove}
                                    className={"svg_icon"}
                                    onClick={dispatchRemove}
                                    style={{ height: 20, width: 20 }}
                                />
                                <div>
                                    <Flex>
                                        {editable && (
                                            <div>
                                                {openEdit ? (
                                                    <>
                                                        <BaseButton
                                                            primary
                                                            handleClick={() => {
                                                                submitEditableForm();
                                                                setOpenEdit(
                                                                    !openEdit
                                                                );
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
                                                                setOpenEdit(
                                                                    !openEdit
                                                                );
                                                            }}
                                                            type="submit"
                                                            className="mr-16"
                                                        >
                                                            Отменить
                                                        </BaseButton>
                                                    </>
                                                ) : (
                                                        
                                                    <ReactSVG
                                                        src={editpen}
                                                        className={
                                                            "svg_icon mr-16"
                                                        }
                                                        onClick={
                                                            editTriggerDropDown
                                                        }
                                                        />
                                                        
                                                )}
                                            </div>
                                        )}
                                        {!open ? (
                                            <ReactSVG
                                                src={dropDown}
                                                className={"svg_icon"}
                                                onClick={triggerDropDown}
                                            />
                                        ) : (
                                            <ReactSVG
                                                src={closeDown}
                                                className={"svg_icon"}
                                                onClick={triggerDropDown}
                                            />
                                        )}
                                    </Flex>
                                </div>
                            </Flex>
                        </ChildWrapper>
                    </div>
                </CollapseWrapper>
            </CollapseContainer>
            <DropDownBox open={open}>
                {children}
                <AddSubInfoBox
                    district={district}
                    handleChangeDistrict={handleChangeDistrict}
                    districtCode={districtCode}
                    handleChangeDistrictCode={handleChangeDistrictCode}
                    dispatchDistrict={dispatchDistrict}
                />
            </DropDownBox>
        </>
    );
};

export default Collapse;
