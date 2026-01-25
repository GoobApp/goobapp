import type { Session } from "@supabase/supabase-js";
import { FC, ReactNode } from "react";
import { Outlet, useLocation } from "react-router";
import "../App.css";
import TopBar from "../components/Profile/TopBar";
import SwitcherPanel from "../components/SwitcherPanel";
import UserProfile from "../types/UserProfileObject";
import ChatUsersPanel from "./Chat/Users/UsersPanel";

interface LayoutProps {
  session: Session | null;
  profileObject: UserProfile;
  chatWindow: ReactNode;
  usersList: UserProfile[];
  maxUsers: number;
}

const App: FC<LayoutProps> = ({
  session,
  profileObject,
  chatWindow,
  usersList,
  maxUsers,
}) => {
  const location = useLocation();

  return (
    <div className="wrapper">
      <TopBar profile={profileObject} session={session}></TopBar>
      <SwitcherPanel></SwitcherPanel>
      <Outlet></Outlet>

      {location.pathname == "/" ? (
        <ChatUsersPanel
          activeUsers={usersList}
          maxUsers={maxUsers}
          clientUser={profileObject}
        ></ChatUsersPanel>
      ) : (
        chatWindow
      )}
    </div>
  );
};
export default App;
