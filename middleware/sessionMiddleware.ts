import session from "express-session";

const sessionMiddleware = session({
	secret: "your-secret-key",
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60000, secure: false }, // 1-minute session
});
export default sessionMiddleware;
