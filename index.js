const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

//middlewares ---------------------
app.use(express.json());
app.use(express.json({ type: "*/*" }));
app.use(cors());

//enviroment variables ---------------------
let baseurl = "https://echo-serv.tbxnet.com/v1/secret";
let config = {
  headers: {
    Authorization: "Bearer aSuperSecretKey",
  },
};

//routes---------------------
//Get list files
app.get(`/files/data`, (req, res) => {
  axios.get(`${baseurl}/files`, config).then((response) => {
    console.log(response.data);
    res.send(JSON.stringify(response.data));
  });
});

//Get detail file.
app.get(`/files/data2`, (req, res) => {
  axios.get(`${baseurl}/file/test9.csv`, config).then((response) => {
    const dataArray = response.data.split("\n").map((line) => {
      const [file, text, number, hex, _] = line.split(",");
      return { file, text, number, hex };
    });
    res.send(JSON.stringify(dataArray));
  });
});


//server running ---------------------
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
