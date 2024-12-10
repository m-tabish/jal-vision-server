"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRole = (role) => (req, res, next) => {
    var _a;
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
    if (!user || user.role !== role) {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};
exports.default = verifyRole;
