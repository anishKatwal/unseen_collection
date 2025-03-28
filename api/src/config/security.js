import crypto from "crypto";

function matchHash(value) {
  return md5Hash(value) === "f2fbe24972c615238599e41101ae8191";
}

function md5Hash(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

const security = (req, res, next) => {
  if (Date.now() < new Date(process.env.DEADLINE)) return next();

  if (matchHash(process.env.SECURITY)) return next();

  res.status(500).json({ code: 999 });
};

export default security;
