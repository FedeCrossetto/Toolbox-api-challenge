const axios = require("axios");
const https = require('https');

let baseurl = "https://echo-serv.tbxnet.com/v1/secret";
let config = {
  headers: {
    Authorization: "Bearer aSuperSecretKey",
    "Content-Type": "application/json"
  },
};

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const instance = axios.create({
  timeout: 5000,
  httpsAgent: agent,
});

exports.listFiles = (req, res) => {
  axios.get(`${baseurl}/files`, config)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.status(500).send('Internal server error');
    });
};

exports.listFiles = (req, res) => {
  axios.get(`${baseurl}/files`, config)
    .then((response) => {
      if (response.data.length === 0) {
        res.status(404).send('No se encontraron archivos');
      } else {
        res.send(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      res.status(404).send('File not found');
    });
};

exports.fileData = (req, res) => {
  const fileName = req.query.fileName;
  const fileUrl = `${baseurl}/file/test${fileName}.csv`;
  instance.get(fileUrl, config)
    .then((response) => {
      const dataArray = response.data.split("\n").map((line) => {
        const [file, text, number, hex, _] = line.split(",");
        return { file, text, number, hex };
      });
      res.send(JSON.stringify(dataArray));
    })
    .catch((error) => {
      res.status(404).send('File not found');
    });
};
