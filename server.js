const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const port = process.env.PORT || 8888;

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

const rules = auth.rewriter({
  users: 640,
  events: 664,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "user-type,content-type");
  next();
});

app.post("/events", (req, res, next) => {
  const userType = req.headers["user-type"];

  if (userType === "ong") {
    router.render = (req, res) => {
      res.status(201).jsonp(res.locals.data);
    };
  } else if (userType === "voluntary") {
    router.render = (req, res) => {
      res.status(401).jsonp("Unauthorized");
    };
  } else {
    router.render = (req, res) => {
      res.status(401).jsonp("Missing user-type header");
    };
  }
  next();
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
