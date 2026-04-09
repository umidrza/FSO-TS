const Notification = ({ message }: { message: string }) => {
  if (!message || message.trim() === "") return null;

  return <div style={{ color: "red", fontSize: "20px" }}>{message}</div>;
};

export default Notification;
