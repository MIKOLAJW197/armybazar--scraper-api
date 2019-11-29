class ProductDTO{
    constructor(title, img, detailsLink, shortDescription, localization, date, price) {
        this.title = title;
        this.img = img;
        this.detailsLink = detailsLink;
        this.shortDescription = shortDescription;
        this.localization = localization;
        this.date = date;
        this.price = price;
    }
}

module.exports = ProductDTO;