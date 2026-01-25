import { useEffect, useState } from "react";
import "../../App.css";
import Loading from "../../Loading";
import { socket } from "../../socket";
import "../Pages/List.css";
import GroupsButton from "./GroupsButton";

export interface Group {
  groupName: string;
  groupId: number;
}

const GroupsList = () => {
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
    socket.on("deleted group", onDeletedGroup);

    return () => {
      socket.off("recent groups requested", onRecentGroups);
      socket.off("created new group", onCreatedGroup);
      socket.off("deleted group", onDeletedGroup);
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

  const onDeletedGroup = (groupId: number) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => {
        return group.groupId != groupId;
      }),
    );
  };

  return (
    <main className="list-window">
      <h1>Groups</h1>
      {finishedLoadingGroups ? (
        <>
          {groups?.length == 0 ? (
            <p className="no-list-notice">No groups found!</p>
          ) : (
            <div className="list">
              {groups?.map((group, index) => {
                return (
                  <GroupsButton
                    key={index}
                    group={group}
                    handleDelete={() =>
                      socket.emit("delete group", group.groupId)
                    }
                  />
                );
              })}
            </div>
          )}
          <br />
          <button
            className="list-button-important"
            onClick={() => createGroup()}
          >
            +
          </button>
        </>
      ) : (
        <Loading className="list-window" />
      )}
    </main>
  );
};

export default GroupsList;
