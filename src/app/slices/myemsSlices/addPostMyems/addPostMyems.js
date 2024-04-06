import { MyemsApiService } from "services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, isEqual } from "lodash";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    loading: false,
    isFetched: false,
    sender: {},
    newPost: {
        from: {
            countryId: null,
            phoneNumber1: '',
            phoneNumber2: '',
            phoneNumber3: '',
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
            totWeight: 0,
            product_type: 'Gift',
        },
        documentStatus: 0,
        postClassification: 1,

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
    error: "",
    receiverValidation: null,
    regionDistrictCostumeCodes: "",
};

export const fetchSenderInfo = createAsyncThunk(
    "createPost/fetchSenderInfo",
    async () => {
        const request = await MyemsApiService.createPost();
        const respond = await request.data;
        return respond;
    }
);

const addPostMyems = createSlice({
    name: "createPost",
    initialState,
    reducers: {
        changePostItem: (state, actions) => {
            switch (get(actions, "payload.id", "")) {
                case "from":
                    state.newPost = {
                        ...state.newPost,
                        [actions.payload.id]: {
                            ...state.newPost.from,
                            [actions.payload.name]: actions.payload.value,
                        },
                    };
                    break;
                case "to":
                    state.newPost = {
                        ...state.newPost,
                        [actions.payload.id]: {
                            ...state.newPost.to,
                            [actions.payload.name]: actions.payload.value,
                        },
                    };
                    break;
                case "postProducts":
                    state.newPost = {
                        ...state.newPost,
                        postProducts: get(
                            state,
                            "newPost.postProducts",
                            []
                        ).map((item, index) =>
                            isEqual(index, get(actions, "payload.index", null))
                                ? {
                                    ...item,
                                    [actions.payload.name]:
                                        actions.payload.value,
                                }
                                : item
                        ),
                    };
                    break;
                case "postProductsDoc":
                    state.newPost = {
                        ...state.newPost,
                        postProductsDoc: get(
                            state,
                            "newPost.postProductsDoc",
                            []
                        ).map((item, index) =>
                            isEqual(index, get(actions, "payload.index", null))
                                ? {
                                    ...item,
                                    [actions.payload.name]:
                                        actions.payload.value,
                                }
                                : item
                        ),
                    };
                    break;
                default:
                    state.newPost = {
                        ...state.newPost,
                        [actions.payload.name]: actions.payload.value,
                    };
                    break;
            }
        },
        updatePostData: (state, actions) => {
            switch (actions.payload.id) {
                case "to":
                    state.newPost = {
                        ...state.newPost,
                        [actions.payload.id]: {
                            ...state.newPost.to,
                            [actions.payload.name]: actions.payload.value,
                        },
                    };
                    break;
                default:
                    state.newPost = {
                        ...state.newPost,
                        [actions.payload.name]: actions.payload.value,
                    };
                    break;
            }
        },
        handleCheckError: (state, actions) => {
            state.receiverValidation = actions.payload;
        },
        clearPostData: (state) => {
            state.newPost = {
                from: {
                    countryId: null,
                    phoneNumber: null,
                    name: "",
                    index: "",
                    address: "",
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
                    totWeight: 0,
                    product_type: 'Gift',
                },
                documentStatus: 0,
                postClassification: 1,
                clientId: null,
                postCode: "", // from company api
                passport: "",
                pinfl: "",
                price: "",
                senderName: "",
                senderPhoneNumber: "",
                unitId: 1, // unit for assuming parcel, gram
                unitValue: "", // parcel weight
                cbm: '',
                height: '',
                width: '',
                length: '',
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
            };
        },
        handleSaveCostumesCode: (state, actions) => {
            state.regionDistrictCostumeCodes = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSenderInfo.pending, (state) => {
            state.loading = true;
            state.isFetched = false;
        });
        builder.addCase(fetchSenderInfo.fulfilled, (state, actions) => {
            state.loading = false;
            state.isFetched = true;
            state.error = "";
            state.sender = actions.payload.data;
            state.newPost = {
                ...state.newPost,
                from: {
                    phoneNumber: get(actions, "payload.data.phoneNumber", null),
                    name: get(actions, "payload.data.name", ""),
                    address: get(actions, "payload.data.address", ""),
                    countryId: get(actions, "payload.data.countryId", null),
                    index: get(actions, "payload.data.postalCode", ""),
                },
                postCode: get(actions, "payload.data.code", ""),
            };
        });
        builder.addCase(fetchSenderInfo.rejected, (state, actions) => {
            state.loading = false;
            state.isFetched = true;
            state.error = actions.error.message;
            state.sender = {};
        });
    },
});

export const {
    changePostItem,
    updatePostData,
    clearPostData,
    handleCheckError,
    handleSaveCostumesCode,
} = addPostMyems.actions;
export default addPostMyems.reducer;
