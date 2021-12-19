const puppeteer = require("puppeteer-extra");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
require("dotenv").config();

async function addOffer({
  name,
  description,
  categoryId,
  typeId,
  price,
  firstName,
  locationId,
  email,
  phone,
}) {
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: "2captcha",
        token: process.env.API_KEY,
      },
      visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  );
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("http://www.armybazar.eu/pl/dodac-ogloszenie/");

  await page.type("input[id=nazov]", name);
  await page.type("textarea[id=text]", description);

  // categoryId:
  //   <option value="9">;Broń krótka</option>
  //   <option value="10">;Broń długa</option>
  //   <option value="11">;Amunicja</option>
  //   <option value="12">;Akcesoria</option>
  await page.select("select[name=kategoria]", categoryId);

  // typeId: sell/bye:
  //   <option value="1">Sprzedaz</option>
  //   <option value="2">zakup</option>
  await page.select("select[name=typ]", typeId);

  await page.type("input[name=cena]", price);
  await page.type("input[name=meno]", firstName);

  //  locationId:
  //     <option value=""></option>
  //     <option value="1">Dolnośląskie</option>
  //     <option value="2">Kujawsko-Pomorskie</option>
  //     <option value="3">Lubelskie</option>
  //     <option value="4">Lubuskie</option>
  //     <option value="5">Łódzkie</option>
  //     <option value="6">Małopolskie</option>
  //     <option value="7">Mazowieckie</option>
  //     <option value="8">Opolskie</option>
  //     <option value="9">Podkarpackie</option>
  //     <option value="10">Podlaskie</option>
  //     <option value="11">Pomorskie</option>
  //     <option value="12">Śląskie</option>
  //     <option value="13">Świętokrzyskie</option>
  //     <option value="14">Warmińsko-Mazurskie</option>
  //     <option value="15">Wielkopolskie</option>
  //     <option value="16">Zachodniopomorskie</option>
  //   </select>;
  await page.select("select[name=kraj]", locationId);

  await page.type("input[id=email]", email);

  if (phone) {
    await page.type("input[name=tel]", phone);
  }

  await page.$eval("input[name=podmienky]", (check) => (check.checked = true));
  await page.$eval(
    "input[name=osobne_udaje]",
    (check) => (check.checked = true)
  );
  await page.$eval("input[name=vek]", (check) => (check.checked = true));

  await page.solveRecaptchas();

  await page.evaluate(() => {
    document.querySelector("input[type=submit]").click();
  });

  // Zdjecia - pass

  await page.waitFor(5000);
  await page.evaluate(() => {
    document.querySelector("input[type=submit]").click();
  });

  await page.waitFor(5000);

  return {
    offerUrl: [...document.querySelectorAll("a")]
      .find((link) => link.innerText === "tutaj")
      .getAttribute("href"),
  };
}

module.exports = addOffer;
