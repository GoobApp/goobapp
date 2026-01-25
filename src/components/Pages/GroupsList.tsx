import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../App.css";
import Loading from "../../Loading";
import { socket } from "../../socket";
import "./List.css";

interface Group {
  groupName: string;
  groupId: number;
}

const GroupsList = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [finishedLoadingGroups, setLoadingGroups] = useState<boolean>(false);

  const onRecentGroups = (receivedGroups: Group[]) => {
    setGroups(receivedGroups);
    setLoadingGroups(true);
  };

  useEffect(() => {
    socket.emit("request recent groups");
    socket.on("recent groups requested", onRecentGroups);
    socket.on("created new group", onCreatedGroup);

    return () => {
      socket.off("recent groups requested", onRecentGroups);
      socket.off("created new group", onCreatedGroup);
    };
  }, []);

  const createGroup = () => {
    const name = prompt("Please enter the group name:");
    if (name != null) // Allow unnamed but don't allow cancel
    {
      socket.emit("create group", name);
    }
  };

  const onCreatedGroup = (group: Group) => {
    if (group) setGroups((prevGroups) => [...prevGroups, group]);
    setLoadingGroups(true);
  };

  if (finishedLoadingGroups) {
    return (
      <main className="list-window">
        <h1>Groups</h1>
        {groups?.length == 0 ? (
          <p className="no-list-notice">No groups found!</p>
        ) : (
          <div className="list">
            {groups?.map((group, index) => {
              return (
                <button
                  className="list-button"
                  key={index}
                  onClick={() =>
                    navigate("/groups/" + group.groupId, {
                      viewTransition: true,
                    })
                  }
                >
                  {group.groupName}
                </button>
              );
            })}
          </div>
        )}
        <br />
        <button className="list-button-important" onClick={() => createGroup()}>
          +
        </button>
      </main>
    );
  } else return <Loading isMini={false} />;
};

export default GroupsList;
