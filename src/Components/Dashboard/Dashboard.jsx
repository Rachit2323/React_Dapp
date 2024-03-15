import React, { useEffect, useState } from "react";
import {
  connectWallet,
  connectingWithContract,
} from "../../Utils/apiFeature.js";
import ScrollToBottom from "react-scroll-to-bottom";

const Dashboard = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [allUserList, setAllUserList] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [myFriendList, setMyFriendList] = useState();
  const [selectedUserPubkey, setSelectedUserPubkey] = useState(null);
  const [currentMessageUser, setCurrentMessageUser] = useState();
  const [_msg, setMessage] = useState("");
  const [allUserMessage, setAllUserMessage] = useState();
  const [sendingBack, setSendingBack] = useState(false);
  const [newmsg, setNewMsg] = useState();

  useEffect(() => {
    if (account) {
      const uppercaseToken = account.toLowerCase();

      localStorage.setItem("token", account);
    }
  }, [account]);

  const presentUser = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();

      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      const userName = await contract.getUsername(connectAccount);
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
      // const allUser = await contract.methods.getAllAppUser().call();
      const allUser = await contract.getAllAppUser();

      setAllUserList(allUser);
    } catch (error) {}
  };

  const freindList = async () => {
    const contract = await connectingWithContract();
    console.log(account);
    const friend_key = account;
    const allFriend = await contract.getMyFriendList();

    console.log(allFriend);
    setMyFriendList(allFriend);
  };

  const addFriends = async (name, friend_key) => {
    try {
      console.log(name, friend_key, account);
      const contract = await connectingWithContract();
      // account=account.toLowerCase();

      const addFriendList = await contract
        .addFriend(friend_key.toLowerCase(), name)
        .send({ from: account });
      console.log("add", addFriendList);
      setLoading(true);
      await addFriendList.wait();
      setLoading(false);

      // window.location.reload();
    } catch (error) {}
  };

  const handleAddFriend = async (name, friendAddress) => {
    console.log(name, friendAddress);
    const contract = await connectingWithContract();
    console.log(name, friendAddress);
    const Friend = await addFriends(name, friendAddress);
  };

  const sendMessageToBack = async (friend_key, _msg) => {
    setSendingBack(true);
    const contract = await connectingWithContract();
    await contract.sendMessage(friend_key, _msg);
    const receivemsg = await contract.readMessage(friend_key);

    // const newmsg = [{
    //   sender: account,
    //   msg: _msg,
    //   timestamp: BigInt(Date.now()),
    // }];
    setNewMsg({
      sender: account,
      msg: _msg,
      timestamp: BigInt(Date.now()),
    });
    // console.log("new", newmsg);
    // setAllUserMessage((prevMessages) => [...prevMessages, ...newmsg]);
    console.log(allUserMessage);
    setMessage("");
    setSendingBack(false);
  };

  const messageUser = async (pubkey, name) => {
    setSelectedUserPubkey(pubkey);
    setCurrentMessageUser(name);
  };

  useEffect(() => {
    fetchData();
    allUser();
  }, []);

  useEffect(() => {
    if (account) {
      freindList(account);
    }
  }, [account]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sendingBack || selectedUserPubkey) {
          const contract = await connectingWithContract();
          const receivemsg = await contract.readMessage(selectedUserPubkey);
          // console.log(receivemsg)

          setAllUserMessage(receivemsg);
        }
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, [selectedUserPubkey, sendingBack, newmsg]);

  // console.log("list", allUserList, myFriendList, presentUser);
  return (
    <nav className="bg-gray-800 p-4 flex h-screen w-screen flex-col items-center justify-between fixed">
      <div className="flex w-full justify-between">
        <div className="text-white text-xl font-bold">ChatApp</div>
        <div className="text-white">
          {userName}:{account}
        </div>
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
                  {user.accountAddress.toLowerCase() !==
                    account.toLowerCase() && (
                    <div className="flex flex-col">
                      <div>UserName: {user.name}</div>
                      {/* <div className="sm:flex sm:flex-col">
      Address:{" "}
      <span className="font text-sm">{user.accountAddress}</span>
    </div> */}
                      <button
                        onClick={() =>
                          handleAddFriend(user.name, user.accountAddress)
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 cursor-pointer"
                      >
                        {myFriendList?.some(
                          (friend) => friend.pubkey === user.accountAddress
                        )
                          ? "Friend"
                          : "Add Friend"}
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="flex w-[74%]">
          <div className="flex border border-gray-300 rounded p-4 w-full">
            <div className="overflow-y-auto flex-grow flex-col flex w-[15%] ">
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
                      onClick={() => messageUser(user.pubkey, user.name)}
                    >
                      {user.name}
                    </div>
                  </div>
                </li>
              ))}
            </div>
            {selectedUserPubkey && (
              <span className="block h-full bg-white w-0.5 m-2"></span>
            )}
            {selectedUserPubkey && (
              <div className="flex mt-4 w-[85%] flex-col">
                <div className="flex w-full h-full border flex-col rounded border-gray-300">
                  <span className="w-full justify-center flex bg-yellow-100 text-cyan-800  align-middle">
                    User: {currentMessageUser}
                  </span>
                  <ScrollToBottom className="w-full h-full pt-3 overflow-y-auto max-h-[610px]">
                    {allUserMessage?.map((message, index) => (
                      <div
                        key={index}
                        className="w-full "
                        style={{
                          marginLeft:
                            message.sender.toLowerCase() ===
                            account.toLowerCase()
                              ? "65%"
                              : "2%",
                        }}
                      >
                        {/* marginLeft: message.sender === account ? '200px' : '0' */}
                        <div
                          className="border border-gray-300 w-1/3  rounded p-2 mb-2"
                          style={{
                            background:
                              message.sender.toLowerCase() ===
                              account.toLowerCase()
                                ? "green"
                                : "blue",
                          }}
                        >
                          {/* {console.log(message.sender,account,typeof(account),typeof(message.sender))} */}
                          <p style={{ color: "white" }}>
                            Message: {message.msg}
                          </p>

                          {/* <p>Sender: {message.sender}</p> */}
                        </div>
                      </div>
                    ))}
                  </ScrollToBottom>
                </div>

                <div className="flex w-[100%]">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={_msg}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow border outline-none border-gray-300 rounded-l px-4 py-2"
                  />
                  <button
                    onClick={() => sendMessageToBack(selectedUserPubkey, _msg)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r border border-blue-700 cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;
