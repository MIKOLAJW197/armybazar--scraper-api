const request = require("request");

const endpoint = "http://localhost:3000/";

describe("Server", () => {
    let server;
    beforeAll(() => {
        server = require("../index.js");
    });
    afterAll(() => {
        server.close();
    });
    describe("GET /", () => {
        var data = {};
        beforeAll((done) => {
            request.get(endpoint, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body content", () => {
            expect(data.body).toBe("Hello from API!");
        });
    });
    describe("GET /getShortOffers page 1", () => {
        let data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/getShortOffers/1", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body JSON length", () => {
            expect(data.body.length).toBe(20);
        });
    });

    describe("GET /getLongOffers page 1", () => {
        let data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/getLongOffers/1", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body JSON length", () => {
            expect(data.body.length).toBe(20);
        });
    });

    describe("GET /getAmmunitionOffers page 3", () => {
        let data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/getAmmunitionOffers/3", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body JSON length", () => {
            expect(data.body.length).toBe(20);
        });
    });

    describe("GET /getAccesoriesOffers page 2", () => {
        let data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/getAccesoriesOffers/2", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body JSON length", () => {
            expect(data.body.length).toBe(20);
        });
    });

});



