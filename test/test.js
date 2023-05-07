const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe("GET /files/list", () => {
  //Valida que la petición retorne un objeto de files con código de estado 200.
  it("should return an object of files", (done) => {
    chai
      .request(app)
      .get("/files/list")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("GET /files/data", () => {
  //Valida que la petición retorne un objeto en particular con los datos del file y  con código de estado 200.
  it("It should return the data from a file", (done) => {
    chai
      .request(app)
      .get("/files/data?fileName=1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  //Valida que retorne un 404 Not Found si no encuentra el objeto pedido.
  it("should return an error if the file does not exist", (done) => {
    chai
      .request(app)
      .get("/files/data?fileName=100")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("File not found");
        done();
      });
  });
});
