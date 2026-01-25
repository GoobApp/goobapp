import { useState } from "react";
import { useNavigate } from "react-router";
import "./Groups.css";
import { Group } from "./GroupsList";

const GroupsButton = ({
  group,
  handleDelete,
}: {
  group: Group;
  handleDelete: () => void;
}) => {
  const handleClick = () => {
    navigate("/groups/" + group.groupId, {
      viewTransition: true,
    });
  };

  const startDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this group?\nThis action cannot be undone.",
    );

    if (shouldDelete) {
      handleDelete();
    }
  };
  const navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  return (
    <div
      className="list-button-container"
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onFocus={() => setMouseOver(true)}
      onBlur={() => setMouseOver(false)}
    >
      <button className="list-button" onClick={handleClick}>
        {group.groupName}
      </button>
      {mouseOver && (
        <button
          className="delete-button"
          onClick={startDelete}
          aria-label={`Delete ${group.groupName}`}
        >
          X
        </button>
      )}
    </div>
  );
};

export default GroupsButton;
