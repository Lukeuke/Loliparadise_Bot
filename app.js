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

let links = [];

const WEZ_SE_KUP_KOSZULKE = () => {
    axios.get(URL).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        var text;

        $('.product__prices', html).each( function() {
            text = $(this).text();
        })

        if (!text.includes("SOLD OUT")) {
            $('.product__image-wrapper', html).each( function(i) {
                links[i] = URL + $(this).attr('href');
                console.log(links[i]);
                return links;
            })
        }
        else {
            console.log('Nothing has changed')
            links[0] = `The stock is sold out. Date: ${time()}` 
            return links;
        }
    
        console.log('invoked')

    })

    return links;
}

setInterval(WEZ_SE_KUP_KOSZULKE, minutesToMs(INTERVAL));

console.log(`Application started with interval of ${minutesToMs(INTERVAL) / MULTIPLIER} minutes`)

module.exports = {
    WEZ_SE_KUP_KOSZULKE: WEZ_SE_KUP_KOSZULKE
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