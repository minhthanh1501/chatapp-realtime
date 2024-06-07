import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    onlineUser: [],
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.current;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.current = null;
      state.token = null;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    updateUser: (state, action) => {
      if (state.current) {
        state.current = { ...state.current, ...action.payload };
      }
    },
  },
  // Code logic xử lý async action
  //   extraReducers: (builder) => {
  //     // Bắt đầu thực hiện action login (Promise pending)
  //     builder.addCase(actions.getCategories.pending, (state) => {
  //       // Bật trạng thái loading
  //       state.isLoading = true;
  //     });

  //     // Khi thực hiện action login thành công (Promise fulfilled)
  //     builder.addCase(actions.getCategories.fulfilled, (state, action) => {
  //       //  console.log(action)
  //       // Tắt trạng thái loading, lưu thông tin user vào store
  //       state.isLoading = false;
  //       state.categories = action.payload;
  //     });

  //     // Khi thực hiện action login thất bại (Promise rejected)
  //     builder.addCase(actions.getCategories.rejected, (state, action) => {
  //       // Tắt trạng thái loading, lưu thông báo lỗi vào store
  //       state.isLoading = false;
  //       state.errorMessage = action.payload.message;
  //     });
  //   },
});

export const { login, logout, setOnlineUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
