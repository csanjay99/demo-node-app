import express from "express"; //only this works with "type": "module", added in package.lock
/*const {express} = require('express');  //This common JS syntax doesn't work for some reason */
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
console.log("file name is : ", __filename);
const __dirname = dirname(__filename);
console.log("dir name is : ", __dirname);

const filePath = resolve(__dirname, "./static");

console.log(typeof filePath);
console.log(`path = ${filePath}`);


app.use("/static", express.static(filePath));

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <body>
        <h1> Welcome </h1>
    </body>
    </html>`);
});

app.get("/about", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <body>
        <h1> About Us </h1>
    </body>
    </html>`);
});

/* 
We use this way to sendfile in common JS but this doesn't work with ES6 modules : 
                const path = require('path');
                const filePath = path.resolve(__dirname, '../part1/sample.html');

                app.get('/login', (req, res) => {
                    res.sendFile(filePath);
                });

In ES6 modules, we try to get the same functionality using the following code: 
                import { fileURLToPath } from 'url';
                import { dirname, resolve } from 'path';
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = dirname(__filename);
                const filePath = resolve(__dirname, '../part1/sample.html');

*/


app.get("/login/", async (req, res) => {
    res.sendFile(filePath + "/login.html");
    try {
        req = await JSON.parse(req.body);
        console.log(req);
        const { username, password } = req;
        if (username === "sanjay@c.com" && password === "Abc@12345") {
            res.send("Login Successful");
            res.send("Welcome Sanjay");
        }

    } catch (err) {
        console.log("error occurred : ", err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
