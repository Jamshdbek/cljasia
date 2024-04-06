import styled, { css } from "styled-components";
import userPic from "assets/images/picture/ic_person.png";

const StyledAvatar = styled.div`
    position: relative;
    width: 76px;
    height: 76px;

    img {
        position: absolute;
        border-radius: 50%;
        // z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: contain;
        border: 1px solid #e8e8e8;
    }

    .online {
        display: inline-block;
        width: 15px;
        height: 15px;
        padding: 3px;
        background-clip: content-box;
        background-color: #00ba34;
        border-radius: 50%;
        bottom: -5px;
        right: -5px;
        position: absolute;
        z-index: 0;
    }

    ${({ small }) =>
        small &&
        css`
            width: 32px;
            height: 32px;
        `};

    ${({ middle }) =>
        middle &&
        css`
            width: 60px;
            height: 60px;
        `};
`;

const Avatar = ({ logo = userPic, online, ...props }) => {
    return (
        <StyledAvatar {...props}>
            <img src={logo} alt="avatar" />
            {online && <span className={"online"}></span>}
        </StyledAvatar>
    );
};

export default Avatar;
