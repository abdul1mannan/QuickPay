import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center bg-white border-2 border-slate-950 rounded-lg p-4">
        <Heading label="Signin" />
        <Subheading label="Signin to your account" />
        <InputBox placeholder="abdul1mannan" label={"Username"} onChange={(e)=>{setUsername(e.target.value)}} />
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>{setPassword(e.target.value)}} />
        <div className="flex justify-center p-3">
          <Button label="Signin" onClick={()=>{
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signin`, {
              username, 
              password
            })
            .then(response => {
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
    
            })
            .catch(error => {
              console.error("Error signing in:", error);
            });
          }}/>
        </div>
        <BottomWarning label="Don't have an account? " buttonText="Signup" to="/signup" />
      </div>
     
    </div>
  );
}
