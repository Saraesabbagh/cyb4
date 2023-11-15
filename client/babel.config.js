module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.css$": "identity-obj-proxy",
  },
};
