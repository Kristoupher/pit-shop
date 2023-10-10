import { createSlice } from '@reduxjs/toolkit';
//State initial
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Ajout des informations de l'utilisateur dans le store
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        //Mise à jour des informations de l'utilisateur dans le store
        updateCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        //Suppression des informations de l'utilisateur dans le store
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setCredentials, updateCredentials, logout } = authSlice.actions;

export default authSlice.reducer;