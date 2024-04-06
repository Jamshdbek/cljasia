import React from "react";
import styled from "styled-components";
const TooltipText = styled.div`
  // background: rgba(28, 56, 151, 0.9);
  // color: #fff;

  width:100%;
  text-align: center;
  line-height: 20px;
  border-radius: 3px;
  cursor: pointer;
`;
const TooltipBox = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  z-index:3;
  left: 20px;
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  width: 130px;
  padding: 5px 5px;
  border-radius: 4px;
  transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
    padding 0.5s ease-in-out;
  &:before {
    content: "";
    width: 0;
    height: 0;
    left: 40px;
    bottom: -10px;
    position: absolute;
    border: 10px solid transparent;
    transform: rotate(315deg);
    transition: border 0.3s ease-in-out;
  }
`;
const TooltipCard = styled.div`
  position: absolute;
  // background: rgba(28, 56, 151, 0.9);
   
  z-index:2;
  width:100px;
//  background: rgba(28, 56, 151, 0.9);
  & ${TooltipText}:hover + ${TooltipBox} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    width: 250px;
    font-size:15px;
    padding: 10px 10px;

    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.8)
        rgba(0, 0, 0, 0.8);
    }
  }
`;
export default function BaseTooltip(props) {
    return (
        <TooltipCard>
            <TooltipText>
            <span>ㅤ</span>
            </TooltipText>
            <TooltipBox>
                <p>{props.noteInfo}</p>
            </TooltipBox>
        </TooltipCard>
    );
}