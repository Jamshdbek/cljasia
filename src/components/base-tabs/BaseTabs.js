import React from 'react';

import styled from 'styled-components';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Row from 'components/grid/Row';
import FormInput from 'components/form-input';
import { Col } from 'react-grid-system';
import BaseButton from 'components/base-button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserMe } from 'app/slices/commonSlices/userMeSlice';
import { get } from 'lodash';
import FormWrapper from 'components/form-wrapper';
import SettingsApiService from 'services/apiServices/settings';
import { toast } from 'react-toastify';

const STabs = styled(Tabs)`
  font-family: BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 12px;
  width: 100%;
`;

const STabList = styled(TabList)`
  list-style-type: none;
  display: flex;
  width: 100%;
  margin: 0;
  padding-left:20px;
  padding-top:30px;
  gap:20px;
  border-bottom: 2px solid #E8E8E8;; 
`;
STabList.tabsRole = 'TabList';

const STab = styled(Tab)`
margin-right: 4px;
cursor: pointer;
padding: 5px;
padding:40px
  padding-top: 30px;
  margin:10px
  user-select: none;
  cursor: arrow;
  z-copyPassword:3;
  font-size: 16px;
 
&:focus {
    outline: none;
    color:#0085FF;
    border-bottom: 2px solid #0085FF;
    
  }

  .text_default{
     outline: none;
    color:#0085FF;
    border-bottom: 2px solid #0085FF;
  }
  `;
STab.tabsRole = 'Tab';

const STabPanel = styled(TabPanel)`
display: none;
margin-top: 30px;
min-height: 30vh;

width:60%;
font-size: 1.5em;
  padding: 20px;

  &.is-selected {
    display: block;
    padding:20px
  }
`;
STabPanel.tabsRole = 'TabPanel';

const BaseTab = (props) => {

    const onSubmit = (values) => {
        console.log(values, "THIS IS A VALUE")
        try {
              
            SettingsApiService.PostAccountInfo({
                firstName: get(values, "firstName", null),
                lastName: get(values, "lastName", null)
            }).then((res) => {
                console.log(values, "THIS IS THE values");
                if (res && res.data && res.data.success) {
                    // history.goBack();
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    toast.warning(res.data.data.description);
                }
            });

           
        } catch (error) {
              console.log(error)
        }
    }

    const handleChangePassword = () => {
        try {
            SettingsApiService.PasswordChange(values).then((res) => {
                console.log(values, "THIS IS THE values");
                if (res && res.data && res.data.success === true) {
                    // history.goBack();
                    toast.success("Success");
                } else if (res && res.data && !res.data.success) {
                    toast.warning(res.data.data.description);
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
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
            firstName: props.firstName,
            lastName: props.lastName,
            currentPassword: "",
            newPassword:"",
            copyNewPassword:"",
           
        },
        onSubmit,

    });
    
    return (<STabs
        defaultIndex={0}
        forceRenderTabPanel
        selectedTabClassName='is-selected'
        selectedTabPanelClassName='is-selected'

    >

        <STabList defaultIndex={0} forceRenderTabPanel >
            <STab className="text_default" >ФИО</STab>
            <STab>Обновить пароль</STab>
        </STabList>
        <FormWrapper onSubmit={handleSubmit}>
            <STabPanel>
                <Col style={{ display: "block", justifyContent: "center" }}>

                    <FormInput
                        label={"Имя"}
                        name={"firstName"}
                        type={"text"}
                        value={get(values, "firstName", "")}
                        handleOnChange={handleChange}
                        handleOnBlur={handleBlur}
                        error={touched.copyPassword && errors.copyPassword}
                        left={2}
                        right={6}
                    /> <br />
                    <FormInput label={"Фамилия"}
                        name={"lastName"}
                        type={"text"}
                        value={get(values, "lastName", "")}
                        handleOnChange={handleChange}
                        handleOnBlur={handleBlur}
                        error={touched.copyPassword && errors.copyPassword}
                        left={2}
                        right={6}
                    />
                </Col>
                    <Col xs={10} style={{marginTop:40}} align={"center"}>
                        <BaseButton
                            primary
                            type="submit"
                        >
                            Обновить
                        </BaseButton>
                    </Col>
            </STabPanel>
            <STabPanel>
                <Col style={{ display: "block", justifyContent: "center" }}>
                    <FormInput label={"Действующий пароль"}
                        name={"currentPassword"}
                        type={"password"}
                        value={get(values, "currentPassword", "")}
                        handleOnChange={handleChange}
                        handleOnBlur={handleBlur}
                        error={touched.copyPassword && errors.copyPassword}
                        placeholder={"... ... ..."}

                        left={3}
                        right={6}
                    /> <br />
                    <FormInput label={"Новый пароль"}
                        name={"newPassword"}
                        placeholder={"... ... ..."}

                        type={"password"}
                        value={get(values, "newPassword", "")}
                        handleOnChange={handleChange}
                        handleOnBlur={handleBlur}
                        error={touched.copyPassword && errors.copyPassword}
                        left={3}
                        right={6}
                    />
                    <br />
                    <FormInput label={"Подтвердите новый пароль"}
                        name={"copyNewPassword"}
                        placeholder={"... ... ..."}

                        type={"password"}
                        value={get(values, "copyNewPassword", "")}
                        handleOnChange={handleChange}
                        handleOnBlur={handleBlur}
                        error={touched.copyNewPassword && errors.copyNewPassword}
                        left={3}
                        right={6}
                    />

                </Col>
                    <Col xs={10} style={{marginTop:40}} align={"center"}>
                        <BaseButton
                            primary
                            handleClick={handleChangePassword}
                        >
                            Обновить
                        </BaseButton>
                    </Col>
            </STabPanel>
            
        </FormWrapper>
    </STabs>)
};

export default BaseTab