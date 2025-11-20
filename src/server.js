import express from "express";
import { ENV } from "./config/env.js";
import { rateLimiterMiddleware } from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js"
import { initDB } from "./config/db.js";
import job from "./config/cron.js";
import dotenv from "dotenv"
dotenv.config()

const app = express();
if(process.env.NODE_ENV === "production") job.start()

const PORT = ENV.PORT;

//middleware
app.use(express.json());
app.use(rateLimiterMiddleware)

app.get("/api/help",(req,res)=>{
  res.status(200).json({status:"ok"})
})


//routes
app.use("/api/transactions",transactionRoute)

//server starting
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Ap is running on port", PORT);
  });
});
