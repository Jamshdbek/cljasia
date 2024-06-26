import React, { useState } from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import arrowIcon from "../../assets/images/icons/arrow-down.svg";
import Text from "../text";
import Row from "../grid/Row";

const StyledMenuItem = styled.div`
    .menu-parent-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 13px;
        text-decoration: none;
        margin-top: 10px;
        cursor: pointer;
        &.active {
            background: #e5f3ff;
            .menu-icon {
                svg {
                    path {
                        fill: #0085ff;
                    }
                }
            }
            .menu-text {
                color: #1c1c1c;
                font-weight: 700;
            }
        }
        .menu-text {
        }
        .menu-icon {
            width: 20px;
            height: 20px;
            margin-right: 15px;
        }
        .menu-arrow {
            margin-bottom: 3px;
            transform: ${({ open }) =>
                open ? "rotate(180deg)" : "rotate(0deg)"};
        }
    }
`;

const MenuParent = ({ children, icon, name = "/", ...props }) => {
    const [open, setOpen] = useState(false);
    return (
        <StyledMenuItem open={open}>
            <div
                className={"menu-parent-link"}
                onClick={() => setOpen((prev) => !prev)}
            >
                <Row align={"center"}>
                    <ReactSVG className={"menu-icon"} src={icon} />
                    <Text className={"menu-text"}>{name}</Text>
                </Row>
                <ReactSVG className={"menu-arrow"} src={arrowIcon} />
            </div>
            {open && children}
        </StyledMenuItem>
    );
};

export default MenuParent;
