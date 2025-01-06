# Random Activity using NodeJS
A server-to-server API call using **NodeJS**.

### Request
A `https` request is made using a constant which contains the `hostname`, `path`, and the `method` of request.
```javascript
const options = {
    hostname: "bored-api.appbrewery.com",
    path: "/random",
    method: "GET",
};
```

The response is captured using callback function. The chunk of JSON (a string of data) is added in a `data`. 
```javascript
let data = "";
response.on("data", (chunk) => {
    data += chunk;
});
```

Then the JSON data is parsed and sent to the EJS file `index.ejs`
```javascript
const result = JSON.parse(data);
res.render("index.ejs", {activity: result});
``` 

We render the data as the dynamic content in the ejs file.

### Example
![image](https://github.com/user-attachments/assets/9df83a9f-0b34-4852-bae8-689fbe181d08)
