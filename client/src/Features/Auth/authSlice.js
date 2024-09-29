import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    email: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.data.user;

      const url = 'https://ad-4stra.ru/auth/admin/realms/auth/users/415939f0-0c06-4a89-b35c-00aa7363f72d';

      try{
        axios.get(url, {
            headers: {
                'Authorization': state.token
            }
        })
        .then(response => {
          state.userId = response.data.id;
          state.username = response.data.username;
          state.emailVerified = response.data.emailVerified;
          state.firstName = response.data.firstName;
          state.lastName = response.data.lastName;
        })
        .catch(error => {
            console.error('Error occurred:', error.response ? error.response.data : error.message);
        });
      } catch (exception){
          console.log(exception);            
      }

    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;