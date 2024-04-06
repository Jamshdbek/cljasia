import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import Flex from "components/flex";
import addCollapse from "assets/images/icons/addDropDown.svg";

const CollapseContainer = styled.div`
    width: 100%;
    height: 70px;
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
    padding: 8px 12px;
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

const AddCollapse = ({
    regionValue,
    indexRegion,
    codeRegion,
    handleChangeRegion,
    handleChangeIndex,
    handleChangeCode,
    dispatchRegionInfo = () => console.log("dispatch info working"),
    ...props
}) => {
    return (
        <>
            <CollapseContainer {...props}>
                <CollapseWrapper>
                    <div style={{ display: "flex", width: "100%" }}>
                        <ChildWrapper basis_60>
                            <Input
                                basis_40
                                placeholder={"Название региона..."}
                                value={regionValue}
                                onChange={handleChangeRegion}
                            />
                            <Input
                                basis_30
                                placeholder={"Индекс..."}
                                value={indexRegion}
                                onChange={handleChangeIndex}
                            />
                            <Input
                                basis_30
                                placeholder={"Код..."}
                                value={codeRegion}
                                onChange={handleChangeCode}
                            />
                        </ChildWrapper>

                        <ChildWrapper basis_40>
                            <Flex
                                className={"pr-32"}
                                justify={"space-between"}
                                style={{ width: "100%" }}
                            >   
                                <ReactSVG
                                    src={addCollapse}
                                    className={"svg_icon"}
                                    onClick={dispatchRegionInfo}
                                />
                            </Flex>
                        </ChildWrapper>
                    </div>
                </CollapseWrapper>
            </CollapseContainer>
        </>
    );
};

export default AddCollapse;
