import styled, { css } from "styled-components";
export const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding-top: 25vh;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  /* background-color: rgba(0, 0, 0, 0.4); */
  margin: auto;
`;
export const ModalContent = styled.div`
  width: 100%;
  background-color: #fefefe;
  margin: auto;
  border-radius: 10px;
  height: fit-content;
  border: 1px solid #888;
  border: solid 5px #fff;
  max-width: ${({ width }) => width || "600px"};
  min-width: 400px;
  height: ${({ height }) => height || "100%"};
  max-height: 85vh;
  overflow: auto;
  height: auto;
  overflow-wrap: break-word;

  ::-webkit-scrollbar {
    width: 0.5em;
    margin: 0.1em;
    border-radius: 50px;
    padding-right: 60px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    outline: 1px solid rgba(0, 0, 0, 0.3);
  }
`;
