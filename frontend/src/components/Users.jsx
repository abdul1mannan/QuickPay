import { Button } from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/bulk?filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUsers(response.data?.user || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, [filter]);
  return (
    <div className="border-2 rounded-lg border-slate-950 h-full flex flex-col py-2">
      <div className="text-md font-bold text-slate-950 flex px-4 pb-2">
        Users
      </div>

      <div className="flex-auto px-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full border-2 h-full items-center border-slate-950 rounded-lg px-2 py-1"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      <div className="px-4 py-2">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.username}
              className="flex items-center border-2 border-slate-100 rounded-lg px-4 py-2"
            >
              <div className="flex justify-center items-center text-center text-slate-500 mr-4 border-2 bg-slate-100 border-slate-950 rounded-full w-8 h-8">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-slate-950 font-medium">{user.username}</div>
              <div className="flex-auto justify-end text-end items-end">
                <Button
                  onClick={() => {
                    navigate(
                      "/transfer?id=" + user.id + "&username=" + user.username
                    );
                  }}
                  label={"Send Money"}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-950 font-medium">No users found</div>
        )}
      </div>
    </div>
  );
}
