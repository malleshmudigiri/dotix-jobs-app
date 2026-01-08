const express = require("express");
const cors = require("cors");

const jobRoute= require("./routes/jobRoutes");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", jobRoute);


  

  
    app.get("/", (req, res) => {
      res.send("Server & DB are running ");
    });

    app.listen(3000, () =>
      console.log("Server running on port 3000 ")
    );

