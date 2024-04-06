import React from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { includes, isEmpty } from "lodash";
import Text from "../text";
import Flex from "../flex";
import BaseBadge from "../base-badge";

const StyledMenuItem = styled.div`
    .menu-link {
        display: flex;
        align-items: center;
        padding: 10px 13px;
        text-decoration: none;
        margin-top: 10px;
        .w-100 {
            width: 100%;
        }

        &.active {
            background: #e5f3ff;
            .stroke {
              svg {
                path {
                  stroke-dashoffset: 0;
                  stroke-dasharray: 700;
                  stroke: #0085ff;
                 }
              }
            }
            .menu-icon {
                svg {
                    path {
                        fill: #0085ff;
                        stroke-dashoffset: 0;
                         stroke-dasharray: 700;
                    }
                }
            }
            .menu-text {
                color: #0085ff;
                font-weight: 700;
            }
        }
        .menu-icon {
            width: 20px;
            height: 20px;
            margin-right: 15px;
        }
        .stroke{
            width: 20px;
            height: 20px;
            margin-right: 15px;
        }
    }
`;

const MenuItem = ({
    children,
    icon,
    url = "/",
    activeUrls = [],
    stoke = false,
    badge,
    count = 0,
    exact = false,
    ...props
}) => {
    const { pathname } = useLocation();
    return (
        <StyledMenuItem {...props}>
            {isEmpty(activeUrls) ? (
                <NavLink className={"menu-link"} to={url} exact={exact}>
                    <Flex justify={"space-between"} className={"w-100"}>
                        <Flex justify="center">
                            <ReactSVG className={stoke ? "stroke" : "menu-icon"} src={icon} />
                            <Text className={"menu-text text-center"}>
                                {children}
                            </Text>
                        </Flex>
                        {badge && (
                            <BaseBadge lg primary>
                                {count}
                            </BaseBadge>
                        )}
                    </Flex>
                </NavLink>
            ) : (
                <NavLink
                    className={"menu-link"}
                    to={url}
                    isActive={() => includes(activeUrls, pathname)}
                    exact={exact}
                >
                    <Flex justify={"space-between"} className={"w-100"}>
                        <Flex justify="center">
                            <ReactSVG className={"menu-icon"} src={icon} />
                            <Text className={"menu-text text-center"}>
                                {children}
                            </Text>
                        </Flex>
                        {badge && (
                            <BaseBadge lg primary>
                                {count}
                            </BaseBadge>
                        )}
                    </Flex>
                </NavLink>
            )}
        </StyledMenuItem>
    );
};

export default MenuItem;
