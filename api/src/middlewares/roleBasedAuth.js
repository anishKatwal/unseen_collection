import { ROLE_ADMIN } from "../constants/roles.js";

function roleBasedAuth(role) {
  return (req, res, next) => {
    if (!req.user.roles.includes(role)) {
      return res.status(403).send("Access denied");
    }

    next();
  };
}

export const allowAdminOrSelf = (req, res, next) => {
  const user = req.user;
  const requestedUserId = req.params.id;

  if (!user.roles.includes(ROLE_ADMIN) && user.id !== requestedUserId) {
    return res.status(403).send("Access denied");
  }

  return next();
};

export default roleBasedAuth;
