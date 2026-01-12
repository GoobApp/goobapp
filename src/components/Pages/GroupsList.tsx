import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../App.css";
import { socket } from "../../socket";
import "./List.css";

interface Group {
  groupName: string;
  groupId: number;
}

const GroupsList = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);

  const onRecentGroups = (receivedGroups: Group[]) => {
    setGroups(receivedGroups);
  };

  useEffect(() => {
    socket.emit("request recent groups");
    socket.on("recent groups requested", onRecentGroups);
  }, []);

  return (
    <main className={"list"}>
      {groups?.length == 0 ? (
        <p className="no-list-notice">No groups found!</p>
      ) : (
        groups?.map((group, index) => {
          return (
            <button
              className="list-button"
              key={index}
              onClick={() =>
                navigate("/groups/" + group.groupId, { viewTransition: true })
              }
            >
              {group.groupName}
            </button>
          );
        })
      )}
      <button
        className="list-button-important"
        onClick={() => window.alert("asfdasdf!")}
      >
        +
      </button>
    </main>
  );
};

export default GroupsList;
