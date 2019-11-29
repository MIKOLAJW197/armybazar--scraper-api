class ContactDTO {
    constructor(user, phone, email, localization) {
        this.user = user;
        this.phone = phone ? phone[0].trim() : null;
        this.email = email ? email[0].trim() : null;
        this.localization = localization;
    }
}

module.exports = ContactDTO;