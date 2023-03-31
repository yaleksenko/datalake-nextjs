import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: undefined,
    toggleForm: false,
    toggleDelete: false,
    formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        status: 'Inactive',
        photo: '',
        user: '1'
    },
    customers: [],
    filter: '',
    filteredCustomers: [],
    errorMessage: '',
}

export const ReducerSlice = createSlice({
    name: "datalake",
    initialState,
    reducers: {
        id: (state, action) => {
            state.id = action.payload;
        },
        toggleChangeAction: (state) => {
            state.toggleForm =!state.toggleForm
        },
        toggleDelete: (state) => {
            state.toggleDelete =!state.toggleDelete
        },
        setFormData: (state, action) => { 
            state.formData = action.payload;
        },
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        updateAction: (state, action) => {
            state.id = action.payload
        },
        deleteAction: (state, action) => {
            state.id = action.payload
        },
        filterAction: (state, action) => {
            state.filter = action.payload
        },
        setFilteredCustomers: (state, action) => { 
            state.filteredCustomers = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const { 
    id,
    toggleChangeAction,
    toggleDelete,
    setFormData,
    setCustomers,
    updateAction,
    deleteAction,
    filterAction,
    setFilteredCustomers,
    setErrorMessage
} = ReducerSlice.actions;
 
export default ReducerSlice.reducer;

