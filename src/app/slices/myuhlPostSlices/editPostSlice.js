import { MyuhlPostApiService } from "services/apiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, isEqual } from "lodash";

const initialState = {
    loading: false,
    isFetched: false,
    sender: {},
    postData: {
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
        cbm: "",
        height: "",
        width: "",
        length: "",
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
        ],
    },
    error: "",
};

export const fetchPostInfo = createAsyncThunk(
    "editPost/fetchPostInfo",
    async (id) => {
        const request = await MyuhlPostApiService.GetSingleMyuhlPost(id);
        const respond = await request.data.data;
        return respond;
    }
);

const editPostSlice = createSlice({
    name: "editPost",
    initialState,
    reducers: {
        changeEditPostItem: (state, actions) => {
            switch (get(actions, "payload.id", "")) {
                case "from":
                    state.postData = {
                        ...state.postData,
                        [actions.payload.id]: {
                            ...state.postData.from,
                            [actions.payload.name]: actions.payload.value,
                        },
                    };
                    break;
                case "to":
                    state.postData = {
                        ...state.postData,
                        [actions.payload.id]: {
                            ...state.postData.to,
                            [actions.payload.name]: actions.payload.value,
                        },
                    };
                    break;
                case "postProducts":
                    state.postData = {
                        ...state.postData,
                        postProducts: get(
                            state,
                            "postData.postProducts",
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
                    state.postData = {
                        ...state.postData,
                        [actions.payload.name]: actions.payload.value,
                    };
                    break;
            }
        },

        updateEditPostData: (state, actions) => {
            state.postData = {
                ...state.postData,
                [actions.payload.name]: actions.payload.value,
            };
        },
        updatePostProducts:(state,action) =>{
            state.postData.postProducts.push({
                productName: "",
                quantity: "",
                hsCode: "",
                price: "",

            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostInfo.pending, (state) => {
            state.loading = true;
            state.isFetched = false;
        });
        builder.addCase(fetchPostInfo.fulfilled, (state, actions) => {
            state.loading = false;
            state.isFetched = true;
            state.error = "";
            state.postData = {
                ...actions.payload,
                to: {
                    ...actions.payload.to,
                    phoneNumber:actions.payload.to.phoneNumber?.split(',')?.map((val)=>{
                        return {
                            value:val,
                            label:val
                        }
                    })
                },
                postProducts:
                    actions.payload.postProducts.length >= 5
                        ? actions.payload.postProducts
                        : [
                            ...actions.payload.postProducts,
                            {
                                id: "1000000000",
                                productName: "",
                                quantity: "",
                                hsCode: "",
                                price: "",
                            },
                            {
                                id: "1000000001",
                                productName: "",
                                quantity: "",
                                hsCode: "",
                                price: "",
                            },
                            {
                                id: "1000000002",
                                productName: "",
                                quantity: "",
                                hsCode: "",
                                price: "",
                            },
                            {
                                id: "1000000003",
                                productName: "",
                                quantity: "",
                                hsCode: "",
                                price: "",
                            },
                            {
                                id: "1000000004",
                                productName: "",
                                quantity: "",
                                hsCode: "",
                                price: "",
                            },
                        ].slice(0, 5),
            };
        });
        builder.addCase(fetchPostInfo.rejected, (state, actions) => {
            state.loading = false;
            state.isFetched = true;
            state.error = actions.error.message;
            state.postData = {};
        });
    },
});

export const { changeEditPostItem, updateEditPostData,updatePostProducts } = editPostSlice.actions;
export default editPostSlice.reducer;
