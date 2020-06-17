module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-keep-clone/" : "/",
  lintOnSave: false,
  transpileDependencies: ["vuetify"]
};
