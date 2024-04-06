import React from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import { get } from "lodash";
import Avatar from "../avatar";
import userPic from "assets/images/picture/ic_person.png";
import arrowDown from "assets/images/icons/arrow-down.svg";
import Text from "../text";
import Row from "../grid/Row";

const StyledProfile = styled.div`
    .text {
        margin-left: 8px;
    }
    svg {
        margin-left: 10px;
        margin-bottom: 1px;
    }
`;
const Profile = ({ user, ...props }) => {
    return (
        <StyledProfile {...props}>
            <Row align={"center"}>
                <Avatar
                    small
                    online
                    logo={get(user, "profile_photo_url", userPic)}
                />
                <Text medium dark className={"text"}>
                    {get(user, "first_name", null)}
                </Text>
                <ReactSVG src={arrowDown} />
            </Row>
        </StyledProfile>
    );
};

export default Profile;
