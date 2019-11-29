const axios = require('axios');
const cheerio = require('cheerio');
const ProductDTO = require('../../model/dto/product.dto');

const offerListScraper = (pageUrl, pageNumber) => {
    return axios(pageUrl + pageNumber + '/')
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const offers = $('.inner.inzerat').not('.top');

            let offersList = [];

            offers.each(function () {
                const title = $(this).find('.top > h2').text();
                const img = $(this).find('.img > img')[0].attribs.src;
                const detailsLink = $(this).find('.img')[0].attribs.href;
                const shortDescription = $(this).find('p').text();
                const localization = $(this).find('.cendat > .lokalita').text();
                const date = $(this).find('.cendat > .datum').text();
                const price = $(this).find('.cendat > .cena').text();

                offersList.push(new ProductDTO(title, img, detailsLink, shortDescription, localization, date, price));
            });

            return offersList;
        })
        .catch(console.error);
};

module.exports = offerListScraper;