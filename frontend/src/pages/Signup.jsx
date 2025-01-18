import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center bg-white border-2 border-slate-950 rounded-lg p-4">
        <Heading label="Signup" />
        <Subheading label="Create an account to get started" />
        <InputBox
          placeholder="Abdul"
          label={"First Name"}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputBox
          placeholder="Mannan"
          label={"Last Name"}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputBox
          placeholder="abdul1mannan"
          label={"Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBox
          placeholder="mannan.jnv123@gmail.com"
          label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          placeholder="123456"
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center p-3">
          <Button
            onClick={async () => {
              await axios
                .post("http://localhost:3000/api/v1/users/signup", {
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                })
                .then((res) => {
                  if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/");
                  } else {
                    alert(res.data.message);
                  }
                })
            }}
            label="Signup"
          />
        </div>
        <BottomWarning
          label="Already have an account? "
          buttonText="Signin"
          to="/"
        />
      </div>
    </div>
  );
}
