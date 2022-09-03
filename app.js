const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');

const URL = "https://www.loliparadise.com";

let json = fs.readFileSync('config.json')
let data = JSON.parse(json)

const MULTIPLIER = data.Multiplier;
const INTERVAL = data.Interval;

const minutesToMs = (value) => {
    return value * MULTIPLIER;
}

var obj = {links: [""], type: ""};

const WEZ_SE_KUP_KOSZULKE = () => {

    console.log('function invoked')

    axios.get(URL).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        var price_text = [];
        var title_text = [];
        var img_link = [];

        $('.product__prices', html).each( function(i) { // => price and "SOLD OUT" text
            price_text[i] = $(this).text();
        })

        $('.product__title', html).each( function(i) { // => title of product
            title_text[i] = $(this).find('a').text();
        })

        $('.product__image-wrapper', html).each( function(i) { // => img of product, this does not work because fo claudflare anti-scrape i think
            img_link[i] = $(this).find('img').attr('src');
        })

        for (let i = 0; i < price_text.length; i++) {
            if (!price_text[i].includes("SOLD OUT")) {
                if(price_text[i].includes("WKRÓTCE DOSTĘPNE")) {
                    $('.product__image-wrapper', html).each( function(i) {

                        obj.links[i] = URL + $(this).attr('href');
                        obj.type = "WKRÓTCE DOSTĘPNE";

                        return obj;
                    })
                }
                else {
                    $('.product__image-wrapper', html).each( function(i) {
                        obj.links = URL + $(this).attr('href');
                        obj.type = "DOSTĘPNE DO KUPIENIA";

                        console.log(obj);
                        return obj;
                    })
                }
            }
            else {
                obj.links[0] = `The stock is sold out. Date: ${time()} UTC` 
                return obj;
            }
        }
        //console.log(obj);
    })

    return obj;
}

let drop = "";

const KIEDY_DROP = () => {

    axios.get(URL).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('.announcement-bar__message', html).each(function () {
            drop = $(this).text();
            return drop;
        })
    })

    return drop;
}

// setInterval(WEZ_SE_KUP_KOSZULKE, minutesToMs(INTERVAL));

console.log(KIEDY_DROP())

console.log(`Application started with interval of ${minutesToMs(INTERVAL) / MULTIPLIER} minutes`)

module.exports = {
    WEZ_SE_KUP_KOSZULKE,
    KIEDY_DROP
};

const time = () => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
  }
  
const checkTime = (i) => {
    if (i < 10) {i = "0" + i};
    return i;
}