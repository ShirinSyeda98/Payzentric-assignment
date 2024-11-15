const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://67.254.128.64:8123",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "",
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["access-control-allow-origin"] = "*";
        proxyRes.headers["access-control-allow-headers"] =
          "Origin, Content-Type, Accept";
      },
    })
  );
};
