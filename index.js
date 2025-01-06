import express from "express";
import ejs from "ejs";
import https from "https";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => { 
    const options = {
        hostname: "bored-api.appbrewery.com",
        path: "/random",
        method: "GET",
    };

    const request = https.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            try{
                const result = JSON.parse(data);
                console.log(result);
                
                res.render("index.ejs", {activity: result})
            }
            catch (error) {
                console.error("Failed to parse response:", error.message);
                res.status(500).send("Failed to fetch activity. Please try again.");
            }
        });
    });

    request.on("error", (error) => {
        console.error("Failed to make request:", error.message);
        res.status(500).send("Failed to fetch activity. Please try again.");        
    });
    
    request.end();
});

app.listen(port, () => {
    console.log(`Listening to the port ${port}.`);
});