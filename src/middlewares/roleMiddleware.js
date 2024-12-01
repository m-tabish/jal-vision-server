const verifyRole = (role) => (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};

module.exports = verifyRole;
