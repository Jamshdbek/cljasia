import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HasAccess } from "services/auth";

const StyledMenu = styled.nav``;

const Menu = ({ items = [] }) => {
    return (
        <StyledMenu>
            <HasAccess>
                {({ departments, userCan, isAdmin }) => (
                    <>
                        {userCan(departments, "HOME") && (
                            <NavLink to={"/"} exact>
                                Главная
                            </NavLink>
                        )}
                        {userCan(departments, "MYUHL") && (
                            <NavLink to={"/email"}>Почта</NavLink>
                        )}
                        {/* {isAdmin && (
                            <NavLink to={"/myems"}> MyEMS </NavLink>
                        )} */}
                        {isAdmin && (
                            <NavLink to={"/management"}> Менеджмент </NavLink>
                        )}
                        {isAdmin && <NavLink to={"/service"}> Сервис </NavLink>}
                        {userCan(departments, "DEALER") && (
                            <NavLink
                                to={isAdmin ? "/dealer" : "/dealer/orderbox"}
                            >
                                {" "}
                                Дилер{" "}
                            </NavLink>
                        )}
                    </>
                )}
            </HasAccess>
        </StyledMenu>
    );
};

export default Menu;
