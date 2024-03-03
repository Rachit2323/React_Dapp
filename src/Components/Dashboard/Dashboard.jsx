import React, { useEffect, useState } from "react";
import {
  connectWallet,
  connectingWithContract,
} from "../../Utils/apiFeature.js";

const Dashboard = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [allUserList, setAllUserList] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [myFriendList, setMyFriendList] = useState();
  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();

      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      const userName = await contract.methods
        .getUsername(connectAccount)
        .call();
      setUserName(userName);
    } catch (error) {
      // setError("Please install the Metamask");
    }
  };

  const allUser = async () => {
    try {
      const contract = await connectingWithContract();

      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      const allUser = await contract.methods.getAllAppUser().call();

      setAllUserList(allUser);
    } catch (error) {}
  };

  const freindList = async () => {
    const contract = await connectingWithContract();

    const allFriend = await contract.methods.getMyFriendList().call();
    setMyFriendList(allFriend);
  };

  const addFriends = async (name, friend_key) => {
    try {
      console.log(name, friend_key);
      const contract = await connectingWithContract();

      const addFriendList = await contract.methods
        .addFriend(friend_key, name)
        .send({ from: account });
      console.log("add", addFriendList);
      setLoading(true);
      await addFriendList.wait();
      setLoading(false);

      window.location.reload();
    } catch (error) {}
  };

  const handleAddFriend = async (name, friendAddress) => {
    const contract = await connectingWithContract();
    console.log(name, friendAddress);
    const Friend = await addFriends(name, friendAddress);
  };

  const [selectedUserPubkey, setSelectedUserPubkey] = useState(null);

  const messageUser = async (pubkey) => {
    setSelectedUserPubkey(pubkey);
  };

  useEffect(() => {
    fetchData();
    allUser();
    freindList();
  }, []);

  console.log("list", allUserList, myFriendList);
  return (
    <nav className="bg-gray-800 p-4 flex h-screen w-screen flex-col items-center justify-between">
      <div className="flex w-full justify-between">
        <div className="text-white text-xl font-bold">ChatApp</div>
        <div className="text-white">{userName}</div>
      </div>

      <hr className="h-0.5 w-screen block border-t border-gray-300" />

      <div className="flex w-full gap-4 h-full pt-4">
        <div className="flex flex-col pr-4 bg-slate-600 h-full w-[26%] p-3">
          <input
            type="text"
            placeholder="Search any user"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-white bg-gray-800 border outline-none  border-gray-700 rounded px-3 py-2 mb-4"
          />
          <h2 className="text-white text-lg font-semibold mb-2">Users</h2>
          <ul>
            {allUserList
              ?.filter((user) =>
                user.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((user) => (
                <li
                  key={user.accountAddress}
                  className="text-white border-b flex justify-between border-gray-700 py-2 align-middle"
                >
                  <div className="flex flex-col">
                    <div>UserName : {user.name}</div>
                    {/* <div className="sm:flex sm:flex-col">
                  Address :{" "}
                  <span className="font text-sm">{user.accountAddress}</span>
                </div> */}
                  </div>
                  <button
                    onClick={() =>
                      handleAddFriend(user.name, user.accountAddress)
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 cursor-pointer"
                  >
                    Add Friend
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex w-[74%]">
          <div className="flex border border-gray-300 rounded p-4 w-full">
            <div className="overflow-y-auto flex-grow flex-col flex w-[15%]">
              {myFriendList?.map((user) => (
                <li
                  key={user.pubkey}
                  className="text-white  flex justify-between  flex-col w-full border-gray-700 py-2 align-middle"
                >
                  <div className="flex flex-col  w-full">
                    <div
                      className={`border-b cursor-pointer w-full rounded-lg p-2 overflow-hidden ${
                        user.pubkey === selectedUserPubkey
                          ? "bg-blue-500 text-white border border-blue-500"
                          : ""
                      }`}
                      onClick={() => messageUser(user.pubkey)}
                    >
                      {user.name}
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <span className="block h-full bg-white w-0.5 m-2"></span>

            <div className="flex mt-4 w-[85%] flex-col">
              <div className="flex w-[100%] h-full"></div>
              <div className="flex w-[100%]">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow border outline-none border-gray-300 rounded-l px-4 py-2"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r border border-blue-700 cursor-pointer">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;
