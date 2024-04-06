import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyemsApiService from "services/apiServices/myems";

const initialState = {
    data: {
        loading: false,
        singlePostLogs:
        {
            from: {
                countryId: null,
                phoneNumber: '',
                name: "",
                index: "",
                address1: "",
                address2: "",
                address3: "",
            },
            to: {
                countryId: null,
                phoneNumber: '',
                name: "",
                index: "",
                address1: "",
                address2: "",
                address3: "",
                countryCd: '',
                countryName: '',
                product_type: 'Gift',
                totWeight: 0,
            },
            documentStatus: 0,
            postClassification: 1,
            code: '',
            clientId: null,
            postCode: "", // from company api
            pinfl: "",
            price: "",
            senderName: "",
            senderPhoneNumber: "",
            unitId: 1, // unit for assuming parcel, gram
            unitValue: "", // parcel weight
            cbm: 0,
            height: 0,
            width: 0,
            length: 0,
            postProducts: [
                {
                    productName: "",
                    quantity: "",
                    gramm: '',
                    hsCode: "",
                    price: "",
                },
                {
                    productName: "",
                    quantity: "",
                    gramm: '',
                    hsCode: "",
                    price: "",
                },
                {
                    productName: "",
                    quantity: "",
                    gramm: '',
                    hsCode: "",
                    price: "",
                },
            ],
        },
        error: ""
    },
};

export const fetchSinglePostLogs = createAsyncThunk(
    "singlePostMyems/fetchAllInspections",
    async (params) => {
        const request = await MyemsApiService.GetSingleMyemsPost(params);
        const respond = await request.data;
        return respond;
    }
);

const singlePostMyems = createSlice({
    name: "singlePostMyems",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSinglePostLogs.pending, (state) => {
            state.data = {
                loading: true,
                singlePostLogs: [],
                error: "",
            };
        });
        builder.addCase(fetchSinglePostLogs.fulfilled, (state, actions) => {
            console.log("price", actions.payload)
            state.data = {
                loading: false,
                singlePostLogs: {
                    from: {
                        // phoneNumber: actions.payload.data.senderPhone,
                        phoneNumber1: actions.payload.data.senderPhone.split('-')[0].substring(1),
                        phoneNumber2: actions.payload.data.senderPhone.split('-')[1],
                        phoneNumber3: actions.payload.data.senderPhone.split('-')[2],
                        name: actions.payload.data.sender,
                        index: actions.payload.data.senderZipCode,
                        address1: actions.payload.data.senderAdd1,
                        address2: actions.payload.data.senderAdd2,
                        address3: actions.payload.data.senderAdd3,
                    },
                    to: {
                        phoneNumber: actions.payload.data.receiveTelNo,
                        name: actions.payload.data.receiveName,
                        index: actions.payload.data.receiveZipCode,
                        address1: actions.payload.data.receiveAdd1,
                        address2: actions.payload.data.receiveAdd2,
                        address3: actions.payload.data.receiveAdd3,
                        countryCd: actions.payload.data.countryCd,
                        countryName: actions.payload.data.countryName,
                        product_type: actions.payload.data.productType,
                        totWeight: actions.payload.data.totWeight,
                    },
                    documentStatus: 0,
                    postClassification: actions.payload.data.postClassification,
                    postCode: actions.payload.data.code, // from company api
                    pinfl: "",
                    createdAt:actions.payload.data.createdAt,
                    price: actions.payload.data.price,
                    senderName: actions.payload.data.sender,
                    senderPhoneNumber: actions.payload.senderPhone,
                    unitId: 1, // unit for assuming parcel, gram
                    unitValue: "", // parcel weight
                    cbm: actions.payload.data.volumeWeight,
                    height: actions.payload.data.boxHeight,
                    width: actions.payload.data.boxWidth,
                    length: actions.payload.data.boxLength,
                    postProducts:actions.payload.data.productDTOList?.length==3?
                    actions.payload.data.productDTOList?.map(item=>{
                       return   {
                            productName: item.contents,
                            quantity: item?.number,
                            gramm: item?.weight,
                            hsCode: item?.hs_code,
                            price: item?.value,
                        }
                    }):
                    [
                        ...actions.payload.data.productDTOList?.map(item=>{
                            return   {
                                 productName: item.contents,
                                 quantity: item?.number,
                                 gramm: item?.weight,
                                 hsCode: item?.hs_code,
                                 price: item?.value,
                             }
                         }),
                        {
                            productName: "",
                            quantity: "",
                            gramm: '',
                            hsCode: "",
                            price: "",
                        },
                        {
                            productName: "",
                            quantity: "",
                            gramm: '',
                            hsCode: "",
                            price: "",
                        },
                        {
                            productName: "",
                            quantity: "",
                            gramm: '',
                            hsCode: "",
                            price: "",
                        },
                    ].slice(0, 3)
                },
                error: "",
            };
        });
        builder.addCase(fetchSinglePostLogs.rejected, (state, actions) => {
            state.data = {
                loading: false,
                singlePostLogs: [],
                error: actions.error.message,
            };
        });
    },
});

export default singlePostMyems.reducer;
