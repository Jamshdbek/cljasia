import styled from "styled-components";

const { default: QRCode } = require("react-qr-code");

const QRCodeWrapper = styled.div`
    height: auto;
    margin: 0 auto;
    max-width: 150px;
    width: 100%;
`;

const QRCodeGenerator = ({ value, ...props }) => {
    return (
        <QRCodeWrapper {...props}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={value}
                viewBox={`0 0 256 256`}
            />
        </QRCodeWrapper>
    );
};

export default QRCodeGenerator;
