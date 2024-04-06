import React, { useEffect, useState } from "react";
import _, { get, isEmpty } from "lodash";
import { Col, Container, Row } from "react-grid-system";
import {
    BaseBreadcrumb,
    Content,
    BaseButton,
    FormWrapper,
    FormInput,
    FormSelector,
    Loader,
    ContentLoader,
    Flex,
} from "components";
import SettingsApiService from "services/apiServices/settings";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import editCompanyInfoSchema from "utils/schema/settingsSchema/settingsSchema";
import { fetchAllServiceAllCountries } from "app/slices/serviceSlices/allCountriesSlice/allCountriesSlice";
import { useDispatch, useSelector } from "react-redux";
import {fetchCompanyInfo} from "app/slices/settingsSlices/companyInfoSlice/companyInfoSlice";
import { fetchActiveLocations } from "app/slices/commonSlices/activeLocationsSlice";
import { updatedUserComing } from "app/slices/authSlices/loginSlice/loginSlice";

const CompanyInfoContainer = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const countrydata = useSelector((store) =>
        get(store, "service.allCountries.data.serviceAllCountries.data", [])
    );

    useEffect(() => {
        dispatch(fetchAllServiceAllCountries());
    }, []);

    const countryOptions = _.map(countrydata, function map(item){
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        }
    });

    useEffect(() => {
        dispatch(fetchActiveLocations());
    }, []);

    const activeLocations = useSelector((store) =>
    get(store, "common.activeLocations.data.activeLocations.data", [])
    );

    const activeLocationOptions = _.map(activeLocations, function map(item){
        return {
            label: get(item, "name", "-"),
            value: get(item, "id", "-"),
        }
    });

    useEffect(()=>{
        dispatch(fetchCompanyInfo());
    }, [])
    
    const companyInfo = useSelector((store) =>
        get(store, "settings.companyInfoSlice.data.companyInfo.data", [])
    );
  console.log(companyInfo , "INFO COM")
    const isCompanyInfoLoading = useSelector((store) =>
        get(store, "settings.companyInfoSlice.data.loading", true)
    );

    const onSubmit = (values) => {
        try {
            setLoading(true);
            SettingsApiService.PutCompanyInfo({
                ...values,
                countryId: get(values, "countryId", null),
                locationId: get(values, "locationId", null),
            }).then((res) => {
                console.log(values, "THIS IS THE values");
                if (res && res.data && res.data.success) {

                    dispatch(updatedUserComing(!res.data.success))


                    setLoading(false);
                    // history.goBack();
                    toast.success("Success");

                    dispatch(fetchCompanyInfo());
                } else if (res && res.data && !res.data.success) {
                    setLoading(true);
                    toast.success(res.data.message);
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            companyName: get(companyInfo, "companyName", null),
            companyAddress: get(companyInfo, "companyAddress", null),
            companyPhoneNumber: get(companyInfo, "companyPhoneNumber", null),
            companyEmail: get(companyInfo, "companyEmail", null),
            index : get(companyInfo, "index", null),
            countryId: get(companyInfo, "country.value", null),
            locationId: get(companyInfo, "location.value", null),
        },
        onSubmit,
        validationSchema: editCompanyInfoSchema,
    });

    return (
        <Container fluid>
            {loading && <Loader />}
            <Row>
                <Col xs={12} className={"mb-8"}>
                    <BaseBreadcrumb
                        items={[
                            { id: 1, 
                                name: "Настройки",
                                // url: "/settings"
                             },
                            {
                                id: 2,
                                name: "Информация о компании",
                                // url: "/settings/companyinfo"
                            },
                        ]}
                    />
                </Col>
                {!isCompanyInfoLoading ? 
                <Col xs={12}>
                <Content>
                        <Row className="mt-32 ml-64">
                            <Col xs={12}>
                                <FormWrapper onSubmit={handleSubmit}>
                                    <FormInput
                                        label={"Названия компании"}
                                        name={"companyName"}
                                        type={"text"}
                                        value={get(values, "companyName", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.companyName &&
                                            errors.companyName
                                        }
                                        left={3}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Адрес"}
                                        name={"companyAddress"}
                                        type={"text"}
                                        value={get(values, "companyAddress", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={
                                            touched.companyAddress && errors.companyAddress
                                        }
                                        left={3}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Номер телефона"}
                                        name={"companyPhoneNumber"}
                                        type={"text"}
                                        value={get(values, "companyPhoneNumber", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.companyPhoneNumber && errors.companyPhoneNumber}
                                        left={3}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Имейл компании"}
                                        name={"companyEmail"}
                                        type={"text"}
                                        disabled={true}
                                        value={get(values, "companyEmail", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.companyEmail && errors.companyEmail}
                                        left={3}
                                        right={6}
                                    />
                                    <FormInput
                                        label={"Индекс"}
                                        name={"index"}
                                        type={"text"}
                                        value={get(values, "index", "")}
                                        handleOnChange={handleChange}
                                        handleOnBlur={handleBlur}
                                        error={touched.index && errors.index}
                                        left={3}
                                        right={6}
                                    />
                                    <FormSelector
                                        label={"Страна"}
                                        name={"countryId"}
                                        value={get(values, "countryId", "")}
                                        placeholder={"Выберите страну"}
                                        error={
                                            touched.countryId &&
                                            errors.countryId
                                        }
                                        options={countryOptions}
                                        handleChange={(e) =>
                                            setFieldValue("countryId", e)
                                        }
                                        left={3}
                                        right={6}
                                    />
                                    <FormSelector
                                        label={"Локация"}
                                        name={"locationId"}
                                        value={get(values, "locationId", "")}
                                        placeholder={"Выберите местоположение"}
                                        error={
                                            touched.locationId &&
                                            errors.locationId
                                        }
                                        options={activeLocationOptions}
                                        handleChange={(e) =>{
                                            console.log(e , "E")
                                            setFieldValue("locationId", e)}
                                        }
                                        left={3}
                                        right={6}
                                    />
                                    <Row className="mt-32">
                                        <Col xs={12} align={"center"}>
                                            <BaseButton
                                                primary
                                                type="submit"
                                            >
                                                Обновить
                                            </BaseButton>
                                        </Col>
                                    </Row>
                                </FormWrapper>
                            </Col>
                        </Row>
                    </Content>
                </Col>
                 :
                 <Col xs={12}>
                 <Flex style={{marginTop: "15%"}} justify='center'>
                 <ContentLoader />
                 </Flex>
                 </Col>}
            </Row>
        </Container>
    );
};

export default CompanyInfoContainer;
