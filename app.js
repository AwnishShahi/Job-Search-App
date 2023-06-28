const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Define the POST route for job search
app.post("/jobsearch", async (req, res) => {
    try {
        const { jobRole, city } = req.body;
        const apiUrl1 = `http://api.adzuna.com/v1/api/jobs/in/search/1?app_id=af3564ae&app_key=4bea16463f69402dcf534558b47bce2a&results_per_page=24&what=${jobRole}&where=${city}&content-type=application/json`;
        const apiUrl2 = `http://api.adzuna.com/v1/api/jobs/in/histogram?app_id=af3564ae&app_key=4bea16463f69402dcf534558b47bce2a&location0=India&location1=${city}&what=${jobRole}&content-type=application/json`;
        const response1 = await fetch(apiUrl1);
        const data1 = await response1.json();
        const response2 = await fetch(apiUrl2);
        const data2 = await response2.json();
        // Render the job results on the "index.ejs" view
        res.render("index", { head: jobRole, jobs: data1.results , histogramData: data2.histogram});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while fetching job results.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
