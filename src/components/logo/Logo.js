import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "assets/images/icons/logo.svg";
import { ReactSVG } from "react-svg";
import Title from "components/title";

const LogoContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #1c1c1c;
`;

const Logo = () => {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <LogoContainer>
        <Title style={{ fontFamily: " system-ui" }}>CLJASIA ADMIN </Title>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
