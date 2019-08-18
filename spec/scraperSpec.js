describe("Scraper", () => {
    var scraper;
    beforeAll(() => {
        scraper = require("../src/scrapers/scraper.js");
    });
    describe("Scrape for offers", () => {
        var data = [];
        beforeAll((done) => {
            // note: Other test instances in routerSpec
            scraper('http://bron-i-amunicja.armybazar.eu/pl/bron-krotka/strona/4/')
                .then(resp => {
                    data = resp;
                done();
            });
        });
        it("Any Array", () => {
            expect(data).toEqual(jasmine.any(Array));
        });

        it("Array length", () => {
            expect(data.length).toEqual(20);
        });

        it("First element not empty", () => {
            expect(data[0]).toEqual(jasmine.any(Object));
        });

        it("First element detailsLink not empty", () => {
            expect(data[0].detailsLink).toEqual(jasmine.any(String));
        });

        it("Second element detailsLink not empty", () => {
            expect(data[1].title).toEqual(jasmine.any(String));
        });
    });

});