import type { Session } from "@supabase/supabase-js";
import { FC, ReactNode } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Outlet, useLocation } from "react-router";
import "../App.css";
import TopBar from "../components/Profile/TopBar";
import SwitcherPanel from "../components/SwitcherPanel";
import UserProfile from "../types/UserProfileObject";
import isTauri from "../utils/EnvironmentInfo";
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
  const sideMinSize = 100;
  const sideMaxSize = 500;
  const sideDefaultSize = 200;

  return (
    <div className={isTauri ? "wrapper tauri-wrapper" : "wrapper"}>
      <TopBar profile={profileObject} session={session}></TopBar>

      <Group className="content-group" orientation="horizontal">
        <Panel
          minSize={sideMinSize}
          defaultSize={sideDefaultSize}
          maxSize={sideMaxSize}
          className="content-panel"
        >
          <SwitcherPanel></SwitcherPanel>
        </Panel>
        <Separator className="content-group-separator" />
        <Panel className="content-panel">
          <Outlet></Outlet>
        </Panel>

        <Separator className="content-group-separator" />
        <Panel
          minSize={sideMinSize}
          defaultSize={sideDefaultSize}
          maxSize={sideMaxSize}
          className="content-panel"
        >
          {location.pathname == "/" ? (
            <ChatUsersPanel
              activeUsers={usersList}
              clientUser={profileObject}
            />
          ) : location.pathname.includes("/groups/") &&
            !location.pathname.endsWith("/groups/") ? (
            <DMUsersPanel
              activeUsers={DMUsersList}
              clientUser={profileObject}
              groupId={location.pathname.split("/groups/")[1]} // yeah i truly gave up. i feel bad for my future self.
            ></DMUsersPanel>
          ) : (
            chatWindow
          )}
        </Panel>
      </Group>
    </div>
  );
};
export default App;
