import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const type = req.headers?.["x-type"];
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  if (type) {
    return createProxyMiddleware({
      target: BACKEND_URL,
      changeOrigin: true,
      pathRewrite: { "^/api/internal": `/${type}` },
      onProxyReq: (proxyReq, req, res) => {},
      onError: (err, req, res) => {
        res.status(500).json("Upload failed.");
      },
    })(req, res);
  }

  res.status(500).json("Not Found.");
}
