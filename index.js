const express = require("express");
const cors = require("cors");
const axios = require("axios");
const https = require('https');

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
    "Content-Type": "application/json"
  },
};

//routes---------------------
//Get list files
app.get(`/files/list`, (req, res) => {
  axios.get(`${baseurl}/files`, config).then((response) => {
    console.log(response.data);
    res.send(JSON.stringify(response.data));
  });
});




const agent = new https.Agent({
  rejectUnauthorized: false,
});

const instance = axios.create({ //Le seteo un timeout para trabajar el Connection was forcibly closed by a peer ante una solicitud sin respuesta.
  timeout: 5000,
  httpsAgent: agent,
});

// //Get detail file.
app.get(`/files/data`, (req, res) => {
  const fileName = req.query.fileName;
  const fileUrl = `${baseurl}/file/test${fileName}.csv`;
  instance
    .get(fileUrl, config)
    .then((response) => {
      const dataArray = response.data.split("\n").map((line) => {
        const [file, text, number, hex, _] = line.split(",");
        return { file, text, number, hex };
      });
      res.send(JSON.stringify(dataArray));
      console.log('Param',response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('File not found');
    });
});

//server running ---------------------
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
