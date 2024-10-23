// middleware
// Extra steps that should be run before the request is processed by the route handler
import express from "express";

const app = express();

const PORT = 3000;

// authentication middleware
app.use((req, res, next) => {
  const userAuthentication = true;
  if (!userAuthentication) {
    res.status(403).send("You are not authorized to make this request");
  }
  next();
});

// take the request middleware
app.use((req, res, next) => {
  console.log(`Order received at ${new Date().toLocaleDateString()}`);
  next();
});

// check if data required is available middleware
app.use((req, res, next) => {
  const dataIsAvailable = true;
  if (!dataIsAvailable) {
    res.status(400).send("Data required is not available");
  }
  next();
});

// send request to the route handler
app.get("/order", (req, res) => {
  res.send("Order received successfully");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Router level middleware
// middleware that is specific to a particular route

const router = express.Router();

router.use((req, res, next) => {
  console.log("Router-level middleware for /orders");
  next();
});

router.get("/orders", (req, res) => {
  res.send("Here are your orders!");
});

app.use("/api", router);

// Built-in middleware
// middleware that comes with express

// express.json(); // used to parse incoming requests with JSON payloads
// express.static(); // used to serve static files

// Error handling middleware
// middleware that is used to handle errors that occur during the execution of the request

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
