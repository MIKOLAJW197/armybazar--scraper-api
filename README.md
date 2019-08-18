# armybazar--scraper-api

Simple node.js app based on Express and Cheerio, created to scrape for some data on [ArmyBazar.eu](http://armybazar.eu/)

I want to use this app as a backend in the future. I am planning to make new site or mobile app.

## Getting Started

To start app:

```
git clone https://github.com/MIKOLAJW197/armybazar--scraper-api.git
npm install
npm start
```

App will work on port 3000

### How it work

For now there are 4 defined endpoints


```
/getShortOffers/:pageNumber --> Return array of 20 pistols offers
/getLongOffers/:pageNumber --> Return array of 20 long rifles offers
/getAmmunitionOffers/:pageNumber --> Return array of 20 ammunition offers
/getAccesoriesOffers/:pageNumber --> Return array of 20 accessories offers
/getOfferDetails --> Method: POST. Return offer details. (Url to offer passed as JSON in 'offerUrl' field )
```

### Examples
##### GET reguest for offers list:
```
/getShortOffers/1
```
Will return:
```json
[
  {
    "title": "Lorem ipsum dolor sit amet. ",
    "shortDescription": "Nam vitae lobortis elit. Sed id suscipit risus. Maecenas auctor urna leo. ",
    "img": "IMG_URL",
    "detailsLink": "URL_FOR_DETAILS",
    "localization": "Lorem",
    "date": "18.08.201920:08",
    "price": "1234 zł"
  },
  {
    // second offer etc.
  }
]
```
#####POST reguest for offer details:
```
/getOfferDetails
```
Will return:
```json
{
    "id": "234567",
    "title": "Lorem ipsum dolor sit amet. ",
    "date": "19.03.2019, 20:08",
    "description": "Opis: Nam vitae lobortis elit. Sed id suscipit risus. Maecenas auctor urna leo. ",
    "price": "1234 zł",
    "offerImgUrls": [
        "IMG_URL"
    ],
    "contact": {
        "user": "ipsum",
        "phone": "+48 999123999",
        "email": "ipsum@ipsum.com",
        "localization": "Lorem"
    }
}
```
## Running the tests

Run Jasmine tests by:

```
npm test
```


## Built With

* [Express](https://expressjs.com/) - The framework used
* [Cheerio](https://cheerio.js.org/) - Scraper
* [Jasmine](https://jasmine.github.io/) - Used to test
* [Axios](https://github.com/axios/axios) - Used to make requests
* [Morgan](https://github.com/expressjs/morgan) - Used to simple LOG


## Authors

* **Mikolaj Wolicki** - *Initial work* - [MIKOLAJW197](https://github.com/MIKOLAJW197)



## TODO

* Add endpoint with filtering offers by location
* Add endpoint with filtering offers by key word
