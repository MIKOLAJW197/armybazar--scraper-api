describe("Details scraper", () => {
    var scraper;
    beforeAll(() => {
        scraper = require("../src/scrapers/detailsScraper.js");
    });
    describe("Scrape for offer details", () => {
        var data = {};
        beforeAll((done) => {
            scraper('http://bron-i-amunicja.armybazar.eu/pl/bron-dluga/ar-15-223-rem-id120292/')
                .then(resp => {
                    data = resp;
                done();
            });
        });
        it("Any object", () => {
            expect(data).toEqual(jasmine.any(Object));
        });

        it("Title not empty", () => {
            expect(data.title).toEqual(jasmine.any(String));
        });

        it("User not empty", () => {
            expect(data.contact.user).toEqual(jasmine.any(String));
        });

        it("Localization not empty", () => {
            expect(data.contact.localization).toEqual(jasmine.any(String));
        });
    });

});