export function setCheckpoint(path: string) {
  if (typeof window === "undefined") return false;
  const checkpoint = path;

  localStorage.setItem("checkPoint", JSON.stringify(checkpoint));
}

export function getCheckPoint() {
  if (typeof window === "undefined") return false;

  const checkpoint = localStorage.getItem("checkPoint");

  if (checkpoint) {
    return JSON.parse(checkpoint);
  }
  return null;
}
