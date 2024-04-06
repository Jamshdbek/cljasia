import React from "react";
import Modal from "react-modal";

// const customStyles = ({ width }) = {
//     content: {
//         position: 'fixed',
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//         width: ({ width }) => width || "600px",
//         maxWidth: "1200px",
//         maxHeight: "1000px",
//         height: "95vh",
//         // zIndex: 1000,
//     },
// };

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const BaseModal = ({
    modalIsOpen,
    openModal,
    closeModal,
    afterOpenModal,
    children,
    width = '90%',
    height='95vh'
}) => {
    return (
        <div>
            {/* <ReactSVG
                src={CloseIcon}
                onClick={closeModal}
                style={{
                    position: "absolute",
                    right: 20,
                    cursor: "pointer",
                }}
            /> */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={{
                    content: {position: 'fixed',
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    width:width,
                    // maxWidth: "1200px",
                    // maxHeight: "1000px",
                    height: height,
                }
                }}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={true}
            >
                {children}
            </Modal>
        </div>
    );
};

export default BaseModal;
