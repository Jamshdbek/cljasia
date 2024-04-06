import { MyuhlPostApiService } from "services/apiServices";
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
            phoneNumber: '',
            name: "",
            index: "",
            address: "",
        },
        to: {
            countryId: '',
            phoneNumber: [],
            name: "",
            index: "",
            address: "",
            regionId: '',
            districtId: '',
        },
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
                hsCode: "",
                price: "",
            },
            {
                productName: "",
                quantity: "",
                hsCode: "",
                price: "",
            },
            {
                productName: "",
                quantity: "",
                hsCode: "",
                price: "",
            },
            {
                productName: "",
                quantity: "",
                hsCode: "",
                price: "",
            },    
            {
                productName: "",
                quantity: "",
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
        const request = await MyuhlPostApiService.GetSenderInfo();
        const respond = await request.data;
        return respond;
    }
);

export const fetchUserInfo = async (phone) => {
    const request = await MyuhlPostApiService.GetClientInfo({ phone });
    const respond = await request.data.data;
    return respond;
};

const createPostSlice = createSlice({
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
                    phoneNumber: [],
                    name: "",
                    index: "",
                    address: "",
                    regionId: null,
                    districtId: null,
                },
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
                        hsCode: "",
                        price: "",
                    },
                    {
                        productName: "",
                        quantity: "",
                        hsCode: "",
                        price: "",
                    },
                    {
                        productName: "",
                        quantity: "",
                        hsCode: "",
                        price: "",
                    },
                    {
                        productName: "",
                        quantity: "",
                        hsCode: "",
                        price: "",
                    },
                    {
                        productName: "",
                        quantity: "",
                        hsCode: "",
                        price: "",
                    },
                ],
            };
        },
        handleSaveCostumesCode: (state, actions) => {
            state.regionDistrictCostumeCodes = actions.payload;
        },
        addPostProducts: (state,actions) => {
                state.newPost.postProducts.push({
                    productName: "",
                    quantity: "",
                    hsCode: "",
                    price: "",   
            })
        }
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
    addPostProducts,
} = createPostSlice.actions;
export default createPostSlice.reducer;
