import type { Session } from "@supabase/supabase-js";
import { FC, ReactNode } from "react";
import { Outlet, useLocation } from "react-router";
import "../App.css";
import ChatUsersPanel from "../components/Chat/UsersPanel";
import TopBar from "../components/Profile/TopBar";
import SwitcherPanel from "../components/SwitcherPanel";
import UserProfile from "../types/UserProfileObject";

interface LayoutProps {
  session: Session | null;
  profileObject: UserProfile;
  chatWindow: ReactNode;
}

const App: FC<LayoutProps> = ({ session, profileObject, chatWindow }) => {
  const location = useLocation();

  return (
    <div className="wrapper">
      <TopBar profile={profileObject} session={session}></TopBar>
      <SwitcherPanel></SwitcherPanel>
      <Outlet></Outlet>
      {location.pathname == "/" ? (
        <ChatUsersPanel></ChatUsersPanel>
      ) : (
        chatWindow
      )}
    </div>
  );
};
export default App;
