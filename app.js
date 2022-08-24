const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');

const URL = "https://www.loliparadise.com";

const MULTIPLIER = 60000
const INTERVAL = 0.06

const minutesToMs = (value) => {
    return value * MULTIPLIER;
}

let links = [];

function WEZ_SE_KUP_KOSZULKE() {
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
                return links;
            })
        }
        else {
            console.log('Nothing has changed')
            return { message : "Nothing has changed", date: Date.now() }
        }
    
        console.log('invoked')

    })

    return links;
}

var v = WEZ_SE_KUP_KOSZULKE;

setInterval(v, minutesToMs(INTERVAL));

console.log(`Application started with interval of ${minutesToMs(INTERVAL) / MULTIPLIER} minutes`)