import type { Session } from "@supabase/supabase-js";
import { FC, ReactNode } from "react";
import { Outlet, useLocation } from "react-router";
import "../App.css";
import TopBar from "../components/Profile/TopBar";
import SwitcherPanel from "../components/SwitcherPanel";
import UserProfile from "../types/UserProfileObject";
import DMUsersPanel from "./Chat/Users/DMUsersPanel";
import ChatUsersPanel from "./Chat/Users/UsersPanel";

interface LayoutProps {
  session: Session | null;
  profileObject: UserProfile;
  chatWindow: ReactNode;
  usersList: UserProfile[];
  DMUsersList: UserProfile[];
  maxUsers: number;
}

const App: FC<LayoutProps> = ({
  session,
  profileObject,
  chatWindow,
  usersList,
  DMUsersList,
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
      ) : location.pathname.includes("/groups/") &&
        !location.pathname.endsWith("/groups/") ? (
        <DMUsersPanel
          activeUsers={DMUsersList}
          maxUsers={maxUsers}
          clientUser={profileObject}
          groupId={location.pathname.split("/groups/")[1]} // yeah i truly gave up. i feel bad for my future self.
        ></DMUsersPanel>
      ) : (
        chatWindow
      )}
    </div>
  );
};
export default App;
