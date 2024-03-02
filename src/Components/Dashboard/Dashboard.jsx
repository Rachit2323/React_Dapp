import React, { useEffect, useState } from "react";
import {
  connectWallet,
  connectingWithContract,
} from "../../Utils/apiFeature.js";

const Dashboard = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [allUserList, setAllUserList] = useState();
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

  useEffect(() => {
    fetchData();
    allUser();
  }, []);
  return (
    <nav className="bg-gray-800 p-4 flex h-screen w-screen flex-col items-center justify-between">
    {/* ChatApp name and username section */}
    <div className="flex w-full justify-between">
      <div className="text-white text-xl font-bold">ChatApp</div>
      <div className="text-white">{userName}</div>
    </div>
  
  {/* <div> */}
    <div className="flex flex-col pr-4 bg-slate-600 h-full w-1/2">
      <h2 className="text-white text-lg font-semibold mb-2">Users</h2>
      <ul>
        {allUserList.map((user) => (
          <li key={user.accountAddress} className="text-white border-b border-gray-700 py-2">
            <div>{user.name}</div>
            <div>{user.accountAddress}</div>
          </li>
        ))}
      </ul>
    </div>
    {/* </div> */}
  </nav>
  
  
  );
};

export default Dashboard;
