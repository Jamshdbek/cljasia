import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    width: 100%;
    align-items: ${({ align }) => align || "stretch"};
    justify-content: ${({ justify }) => justify || "flex-start"};
    flex-direction: ${({ direction }) => direction || "column"};
    gap: ${({ gap }) => gap || "20px"};
`;

const FormWrapper = ({ ...props }) => <StyledForm {...props} />;

export default FormWrapper;
