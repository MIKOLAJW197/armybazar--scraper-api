const axios = require('axios');
const cheerio = require('cheerio');

const offerListScraper = function (pageUrl, pageNumber) {
    return axios(pageUrl + pageNumber + '/')
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const offers = $('.inner.inzerat').not('.top');

            var offersList = [];

            offers.each(function () {
                const title = $(this).find('.top > h2').text();
                const img = $(this).find('.img > img')[0].attribs.src;
                const detailsLink = $(this).find('.img')[0].attribs.href;
                const shortDescription = $(this).find('p').text();
                const localization = $(this).find('.cendat > .lokalita').text();
                const date = $(this).find('.cendat > .datum').text();
                const price = $(this).find('.cendat > .cena').text();

                offersList.push({
                    title: title,
                    shortDescription: shortDescription,
                    img: img,
                    detailsLink: detailsLink,
                    localization: localization,
                    date: date,
                    price: price,
                });
            });

            return offersList;
        })
        .catch(console.error);
};

module.exports = offerListScraper;