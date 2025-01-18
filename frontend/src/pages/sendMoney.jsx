import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SendMoney() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const id = queryParams.get("id");
  const [amount, setAmount] = useState(0);
  return (
    <div className="bg-slate-300 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center bg-white border-2 border-slate-950 rounded-lg p-4">
        <Heading label="Send Money" />
        <div className="flex-auto py-2">
          <div className="flex items-center border-2 border-slate-300 rounded-full p-1">
            <div className="text-black p-2 border-2 border-slate-950 rounded-full px-3 ">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="text-black items-center font-medium justify-center px-4">
              {username || "User"}
            </div>
          </div>
        </div>
        <InputBox
          label="Amount"
          placeholder="Enter Amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <div className="flex justify-center p-3">
          <Button
            onClick={() => {
              const token = localStorage.getItem("token");
              axios
                .post(
                  "http://localhost:3000/api/v1/account/transfer",
                  {
                    toUserId: id,
                    amount: Number(amount),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  if (res.data.message === "Transfer successful") {
                    navigate("/dashboard");
                  }
                })
                .catch((err) => {
                  alert(err.response.data.message);
                });
            }}
            label="Send"
          />
        </div>
      </div>
    </div>
  );
}
