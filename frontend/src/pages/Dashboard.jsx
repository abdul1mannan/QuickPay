import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
  return <div className="bg-white-500 rounded-lg  p-4 flex flex-col gap-4">
    <Appbar />
    <Balance />
    <Users />
  </div>;
}
