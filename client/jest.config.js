module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.css$": "./cssTransform.js",
  },
  moduleNameMapper: {
    "^.*\\.(css|less|scss)$": "./cssTransform.js",
  },
};
