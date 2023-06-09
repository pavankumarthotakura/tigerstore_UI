console.log(
  "process env REACT_APP_DEV_REMOTE",
  process.env.REACT_APP_DEV_REMOTE
)

export const API_BASE_URL =
  process.env.NODE_ENV === "production" ||
  process.env.REACT_APP_DEV_REMOTE === "remote"
  ? "http://localhost:8080/"
  : "http://localhost:8080/";
