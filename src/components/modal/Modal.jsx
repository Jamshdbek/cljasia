import { memo } from "react";

import { ModalContent, ModalWrapper } from "./style";
const ReactModal = ({ children, isOpen,width, ...props }) => {

    return (
        <>
            {isOpen && (
                <ModalWrapper width={width} {...props}>
                    <ModalContent  {...props} >
                        {children}
                    </ModalContent>
                </ModalWrapper>
            )}
        </>
    );
};

export default ReactModal;
