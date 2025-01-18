import { useState, useEffect } from "react";
import axios from "axios";

export function Balance() {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
        setBalance(0);
      });
  }, [balance, token]);
  return (
    <div className="shadow-lg border-2 rounded-lg border-slate-950 h-14 flex justify-between">
      <div className="text-md font-bold text-slate-950 justify-center items-center flex px-4">
        Your Balance = ₹ {balance}
      </div>
    </div>
  );
}
