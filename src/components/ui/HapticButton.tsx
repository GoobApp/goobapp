import { useWebHaptics } from "web-haptics/react";

export const HapticButton = ({
  onClick,
  id,
  className,
  disabled,
  children,
}: {
  onClick?: React.MouseEventHandler;
  id?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const { trigger } = useWebHaptics({ debug: true });

  const handleButtonPressed = (e: React.MouseEvent) => {
    trigger();

    if (onClick) onClick(e);
  };

  return (
    <button
      id={id}
      className={className}
      onClick={handleButtonPressed}
      disabled={disabled ?? false}
    >
      {children}
    </button>
  );
};
