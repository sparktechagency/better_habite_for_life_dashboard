const formatTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      //   hour24: true,
      hour12: false,
    });
  } catch {
    return "N/A";
  }
};
export default formatTime;
