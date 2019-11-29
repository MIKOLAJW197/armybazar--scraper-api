class ProductDetailsDTO {
    constructor(id, title, date, description, price, offerImgUrls, contact) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.price = price;
        this.offerImgUrls = offerImgUrls;
        this.contact = contact;
    }
}

module.exports = ProductDetailsDTO;