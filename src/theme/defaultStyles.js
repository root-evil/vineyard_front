export const scrollStyles = ({ color }) => ({
  "&::-webkit-scrollbar": {
    width: 8,
    height: 8,
  },
  "&::-webkit-scrollbar-button": {
    width: 8,
    height: 8,
  },
  "&::-webkit-scrollbar-thumb": {
    background: color,
    border: "0px none #fff",
    borderRadius: 8,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: color,
  },
  "&::-webkit-scrollbar-thumb:active": {
    background: color,
  },
  "&::-webkit-scrollbar-track": {
    background: "#fff",
    border: "0px none #fff",
    borderRadius: 8,
  },
  "&::-webkit-scrollbar-track:hover": {
    background: "#fff",
  },
  "&::-webkit-scrollbar-track:active": {
    background: "#fff",
  },
  "&::-webkit-scrollbar-corner": {
    background: "transparent",
  },
});
