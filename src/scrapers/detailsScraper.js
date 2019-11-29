const axios = require('axios');
const cheerio = require('cheerio');
const ProductDetailsDTO = require('../../model/dto/product.details.dto');
const ContactDTO = require('../../model/dto/contact.dto');

const phoneRegex = new RegExp('(?:.\\d+\\s*)+');
const emailRegex = new RegExp('\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b');

const offerDetailsScraper = (pageUrl) => {
    return axios(pageUrl)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const oferrImgsJq = $('.fancy');
            const offerDetailsInfoJq = $('.inner > #inz_right');
            const contactJq = $(offerDetailsInfoJq).find('p').last();

            let offerImgUrls = [];
            let offerContact;

            oferrImgsJq.each(function () {
                const url = $(this)[0].attribs.href;
                offerImgUrls.push(url);
            });

            const phoneAndEmail = $(contactJq).html().split("<br>");
            const phone = phoneRegex.exec(phoneAndEmail[2]);
            // note: If no phone number in offer, email will apear as second element in array
            const email = phone ? emailRegex.exec(phoneAndEmail[3]) : emailRegex.exec(phoneAndEmail[2]);

            offerContact = new ContactDTO($(contactJq).find('a').text(), phone, email, $(contactJq).prev().contents().last().text().trim())

            return new ProductDetailsDTO($('h2.outer.small').contents().last().text().substring(2),
                $('h1').text(),
                $(offerDetailsInfoJq).find('.left').contents().last().text().trim(),
                $(offerDetailsInfoJq).find('.popis').text(),
                $(offerDetailsInfoJq).find('.cena > strong > span').text(),
                offerImgUrls,
                offerContact
            );
        })
        .catch(console.error);
};

module.exports = offerDetailsScraper;