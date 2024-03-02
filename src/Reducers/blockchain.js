
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { connectWallet, connectingWithContract } from '../Utils/apiFeature';

// const   initialState= {
//     account: '',
//     userName: '',
//     friendList: [],
//     friendMsg: [],
//     loading: false,
//     error: null,
//   };

// export const fetchDataAsync = createAsyncThunk('app/fetchData', async () => {
//   try {
//     const contract = await connectingWithContract();
//     const connectAccount = await connectWallet();
//    console.log(connectAccount)
//     const userName = await contract.methods.getUsername(connectAccount).call();
//     console.log('user',userName)
//     const friendList = await contract.getMyFriendList();
//     const userList = await contract.getAllAppUser();

//     return { connectAccount, userName, friendList, userList };
//   } catch (error) {
//     throw Error('Please install the Metamask');
//   }
// });

// export const createAccountAsync = createAsyncThunk('app/createAccount', async ({ name, accountAddress }) => {
//   try {
//     const contract = await connectingWithContract();
//     const getCreateUser = await contract.methods.createAccount(name, accountAddress).send({ from: accountAddress });
//     return fetchDataAsync();
//   } catch (error) {
//     throw Error('Please reload your browser');
//   }
// });

// export const readMessageAsync = createAsyncThunk('app/readMessage', async (friendAddress, thunkAPI) => {
//   try {
//     const contract = await connectingWithContract();
//     const read = await contract.readMessage(friendAddress);
//     return read;
//   } catch (error) {
//     throw Error('Error reading message');
//   }
// });

// export const addFriendsAsync = createAsyncThunk('app/addFriends', async ({ name, accountAddress }) => {
//   try {
//     const contract = await connectingWithContract();
//     const addFriend = await contract.addFriend(accountAddress, name);
//     return fetchDataAsync();
//   } catch (error) {
//     throw Error('Error adding friend');
//   }
// });

// export const sendMessageAsync = createAsyncThunk('app/sendMessage', async ({ msg, address }) => {
//   try {
//     const contract = await connectingWithContract();
//     const addMessage = await contract.sendMessage(address, msg);
//     return fetchDataAsync();
//   } catch (error) {
//     throw Error('Error sending message');
//   }
// });

// export const readUserAsync = createAsyncThunk('app/readUser', async (userAddress) => {
//   try {
//     const contract = await connectingWithContract();
//     const userName = await contract.getUsername(userAddress);
//     return userName;
//   } catch (error) {
//     throw Error('Error reading user');
//   }
// });

// // Slice
// export const appSlice = createSlice({
//   name: 'app',
//   initialState,

//   reducers: {
//     // setFriendMsg: (state, action) => {
//     //   state.friendMsg = action.payload;
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDataAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDataAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.account = action.payload.connectAccount;
//         state.userName = action.payload.userName;
//         state.friendList = action.payload.friendList;
//         state.userList = action.payload.userList;
//       })
//       .addCase(fetchDataAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createAccountAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createAccountAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(readMessageAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(readMessageAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.friendMsg = action.payload;
//       })
//       .addCase(readMessageAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addFriendsAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addFriendsAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(sendMessageAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessageAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(readUserAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(readUserAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setFriendMsg } = appSlice.actions;

// export default appSlice.reducer;
