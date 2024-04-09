import { BaseInput, Flex, Text, Title } from "components";
import { get } from "lodash";
import { Row, Col } from "react-grid-system";
import { useDispatch } from "react-redux";
import {
    addPostProducts,
} from "app/slices/myuhlPostSlices/createPostSlice/createPostSlice";
import { updatePostProducts } from "app/slices/myuhlPostSlices/editPostSlice";
const ContentParcelMyuhl = ({
    data,
    changeContentParcel,
    disabled,
    setFieldValue,
    touched,
    errors,
}) => {
    const dispatch = useDispatch()
    return (
        <Row 
        style={{
            marginTop:'-8px',
            marginBottom:'-15px',
            padding:'20px 0',
            height:'300px',
            overflowY: 'scroll',
            whiteSpace:'nowrap',
            overflowX:'hidden',
            
        }}>
            <Col xs={12}>
                <Flex
                    justify={"space-between"}
                    align={"start"}
                >
                    <div style={{ flexBasis: "30%", position: "relative" }}>
                        <Title xs>Название продукта</Title>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Количество</Title>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>HS Code</Title>
                    </div>
                    <div style={{ flexBasis: "20%", position: "relative" }}>
                        <Title xs>Цена (USD)</Title>
                    </div>
                </Flex>
            </Col>
            {get(data, "postProducts", []).map((item, index) => (
                <Col xs={12} key={index + 1}>
                    <Flex
                        justify={"space-between"}
                        style={{ width: "100%" }}
                        className={"mt-8"}
                    >
                        <div style={{ flexBasis: "30%", position: "relative" }}>
                            <BaseInput
                                id={`productName${index}`}
                                placeholder="..."
                                value={get(item, "productName", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "productName",
                                        index,
                                    });
                                    setFieldValue("productName0", e);
                                }}
                                disabled={disabled}
                            />
                            {index == 0 && (
                                <Text
                                    xxs
                                    danger
                                    style={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: 0,
                                    }}
                                >
                                    {get(touched, "productName0", null) &&
                                        get(errors, "productName0", null)}
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "20%", position: "relative" }}>
                            <BaseInput
                                id={`quantity${index}`}
                                placeholder="..."
                                value={get(item, "quantity", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "quantity",
                                        index: index,
                                    });
                                    setFieldValue("quantity0", e);
                                }}
                                disabled={disabled}
                            />
                            {index == 0 && (
                                <Text
                                    xxs
                                    danger
                                    style={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: 0,
                                    }}
                                >
                                    {get(touched, "quantity0", null) &&
                                        get(errors, "quantity0", null)}
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "20%", position: "relative" }}>
                            <BaseInput
                                id={`hsCode${index}`}
                                placeholder="..."
                                value={get(item, "hsCode", "")}
                                handleInput={(e) => {
                                    changeContentParcel({
                                        value: e,
                                        name: "hsCode",
                                        index: index,
                                    });
                                    setFieldValue("hsCode0", e);
                                }}
                                disabled={disabled}
                            />
                            {index == 0 && (
                                <Text
                                    xxs
                                    danger
                                    style={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: 0,
                                    }}
                                >
                                    {get(touched, "hsCode0", null) &&
                                        get(errors, "hsCode0", null)}
                                </Text>
                            )}
                        </div>
                        <div style={{ flexBasis: "20%", position: "relative" }}>
                            <BaseInput
                                id={`productPrice${index}`}
                                placeholder="..."
                                error={"feree"}
                                value={get(item, "price", "")}
                                handleInput={(e) => {
                                    if (e <= 9999) {
                                        changeContentParcel({
                                            value: e,
                                            name: "price",
                                            index: index,
                                        });

                                        setFieldValue("productPrice0", e);
                                    } else {

                                    }
                                }}
                                disabled={disabled}
                            />
                            {index == 0 && (
                                <Text
                                    xxs
                                    danger
                                    style={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: 0,
                                    }}
                                >
                                    {get(touched, "productPrice0", null) &&
                                        get(errors, "productPrice0", null)}
                                </Text>
                            )}
                        </div>
                        <div
                            style={{
                                cursor: 'pointer',
                                fontSize:'30px',
                                padding:get(data, "postProducts", []).length == index + 1?'0 8px':'0'
                            }}
                            onClick={() => {
                                if(get(data, `postProducts[${get(data, "postProducts", []).length-1}].productName`, "")!==''&&
                                get(data, `postProducts[${get(data, "postProducts", []).length-1}].quantity`, "")!==''&&
                                get(data, `postProducts[${get(data, "postProducts", []).length-1}].price`, "")!=='')
                               { 
                                dispatch(addPostProducts())
                                dispatch(updatePostProducts())
                               }
                            }}
                        >{get(data, "postProducts", []).length == index + 1 ? "+" : "ㅤ"}</div>
                    </Flex>
                </Col>
            ))}
        </Row>
    );
};

export default ContentParcelMyuhl;
