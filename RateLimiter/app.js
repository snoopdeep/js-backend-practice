const express = require("express");
const app = express();
const { rateLimit } = require("express-rate-limit");

// 1: using npm package -> express-rate-limit

// const limiter=rateLimit({
//     windowMs:1*60*1000,
//     limit:5,
//     standardHeaders:'draft-7',
//     legacyHeaders:false,
//     message:"too many request, try after some time"
// })

// 2: Sliding window counter

// a: define the number of requests and the time interval
// b: define a hash map data structure which store the counter and the time of requests of each user based on the user ip
// c: when user first hit the server initilize the map with count=1 and time=current time and return
// d: if not the first time then check if request is made under time interval if yes then check if limit is not exceed if yes -> update the counter by 1
// e: else reset the map data structure for that user
console.log(Date.now());
const RATE_LIMIT = 5;
const WINDOW_SIZE_IN_SEC = 60;
const requestCount = {};
const limiter = (req, res, next) => {
  const currentTime = Math.floor(Date.now() / 1000); // in (timestamp) second
  const userIP = req.ip;

  if (!requestCount[userIP]) {
    requestCount[userIP] = { count: 1, windowStart: currentTime };
    next();
    return;
  }

  const timeElapsed = currentTime - requestCount[userIP].windowStart;
  if (timeElapsed < WINDOW_SIZE_IN_SEC) {
    if (requestCount[userIP].count < RATE_LIMIT) {
      requestCount[userIP].count += 1;
      next();
      return;
    } else {
      res.status(429).json({
        message: "Rate limit Exceed. Please try again later.",
      });
    }
  } else {
    requestCount[userIP].count = 1;
    requestCount[userIP].windowStart = currentTime;
    next();
  }
};

//3: Token bucket
    // const totalTime=60*1000;
    // // const reqLimit=5;
    // const requestCount={};
    // const limiter=(req,res,next)=>{
    //     const currentTime=Date.now()/1000;
    //     const currentUserIP=req.ip;

    //     if(!requestCount[currentUserIP]){
    //         requestCount[currentUserIP]={count:5,startTime:currentTime};
    //         next();return;
    //     }
        
    //     const timeE=currentTime-requestCount[currentUserIP].startTime;
    //     if(timeE<totalTime){
    //         if(requestCount[currentUserIP].count>0){
    //             requestCount[currentUserIP].count-=1;
    //             next();
    //             next;
    //         }
    //         else{
    //             res.status(429).json({message:"samdi samdi lakka lakka"});
    //         }
    //     }
    //     else {
    //         requestCount[currentUserIP]={count:5,startTime:currentTime};
    //         next();return;
            
    //     }
    // }

app.use(limiter);

app.use("/", (req, res) => {
  console.log(req.ip);
  res.send("hello from the server!!");
});

app.listen(3000, () => {
  console.log("Server is listing at post 3000");
});
