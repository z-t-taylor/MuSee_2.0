module.exports = {
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }], // this enables JSX transform without importing React
    "@babel/preset-env",
    "@babel/preset-typescript",
  ],
};
