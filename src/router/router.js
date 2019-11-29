const express = require('express');
const offerListScraper = require('../scrapers/scraper');
const offerDetailsScraper = require('../scrapers/detailsScraper');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello from API!'));

// define shortGuns offer endPoint
router.get('/getShortOffers/:pageNumber', (req, res) =>
    offerListScraper('http://bron-i-amunicja.armybazar.eu/pl/bron-krotka/strona/', req.params.pageNumber)
        .then(resp => res.send(resp)));

// define longGuns offer endPoint
router.get('/getLongOffers/:pageNumber', (req, res) =>
    offerListScraper('http://bron-i-amunicja.armybazar.eu/pl/bron-dluga/strona/', req.params.pageNumber)
        .then(resp => res.send(resp)));

// define ammo offer endPoint
router.get('/getAmmunitionOffers/:pageNumber', (req, res) =>
    offerListScraper('http://bron-i-amunicja.armybazar.eu/pl/amunicja/strona/', req.params.pageNumber)
        .then(resp => res.send(resp)));

// define accesories offer endPoint
router.get('/getAccesoriesOffers/:pageNumber', (req, res) =>
    offerListScraper('http://bron-i-amunicja.armybazar.eu/pl/akcesoria/strona/', req.params.pageNumber)
        .then(resp => res.send(resp)));

// define offer details endPoint
// URL of offer to scrape, is passed in JSON
router.post('/getOfferDetails', (req, res) =>
    offerDetailsScraper(req.body.offerUrl)
        .then(resp => res.send(resp)));

module.exports = router;