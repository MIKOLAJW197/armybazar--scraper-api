const axios = require('axios');
const cheerio = require('cheerio');

const phoneRegex = new RegExp('(?:.\\d+\\s*)+');
const emailRegex = new RegExp('\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b');

const offerDetailsScraper = function (pageUrl) {
    return axios(pageUrl)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const oferrImgsJq = $('.fancy');
            const offerDetailsInfoJq = $('.inner > #inz_right');
            const contactJq = $(offerDetailsInfoJq).find('p').last();

            var offerDetailsResult;
            var offerImgUrls = [];
            var offerContact;

            oferrImgsJq.each(function () {
                const url = $(this)[0].attribs.href;
                offerImgUrls.push(url);
            });

            const phoneAndEmail = $(contactJq).html().split("<br>");
            const phone = phoneRegex.exec(phoneAndEmail[2]);
            // note: If no phone number in offer, email will apear as second element in array
            const email = phone ? emailRegex.exec(phoneAndEmail[3]) : emailRegex.exec(phoneAndEmail[2]);

            offerContact = {
                user: $(contactJq).find('a').text(),
                phone: phone ? phone[0].trim() : null,
                email: email ? email[0].trim() : null,
                localization: $(contactJq).prev().contents().last().text().trim()
            };

            offerDetailsResult = {
                id: $('h2.outer.small').contents().last().text().substring(2),
                title: $('h1').text(),
                date: $(offerDetailsInfoJq).find('.left').contents().last().text().trim(),
                description: $(offerDetailsInfoJq).find('.popis').text(),
                price: $(offerDetailsInfoJq).find('.cena > strong > span').text(),
                offerImgUrls: offerImgUrls,
                contact: offerContact
            };

            return offerDetailsResult;
        })
        .catch(console.error);
};

module.exports = offerDetailsScraper;