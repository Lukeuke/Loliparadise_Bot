const { Client, MessageEmbed } = require('discord.js');

const app = require('./app');

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["USER", "REACTION", "MESSAGE", "GUILD_SCHEDULED_EVENT", "GUILD_MEMBER", "CHANNEL"]
})

let prefix = [
    "uwu",
    "ohayo"
]

let codes = [
    "senpai" // calls the "WEZ_SE_KUP_KOSZULKE" function
]
const config =  require('./config.json')
const prod = require('./prod')

var status = app.WEZ_SE_KUP_KOSZULKE();
var interval;
let isOnLoop = false;

let hasSendForBuy = false;
let hasSendForAvailability = false;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("for some tees 👀", {type: "WATCHING"})
});

client.on('messageCreate', (message) => {
    if(message.content == `${prefix[0]} ${codes[0]}`) {
        if(status.links.length > 0) {

            for (let i = 0; i < status.links.length; i++) {
                if (status.links.length > 1 && status.type.includes("DOSTĘPNE DO KUPIENIA") && !hasSendForBuy) {
                    message.channel.send({content: `@everyone ${status.type} \n ${status.links[i]}`})
                    hasSendForBuy = true;
                }
                else if (status.links.length > 1 && status.type.includes("WKRÓTCE DOSTĘPNE") && !hasSendForAvailability) {
                    message.channel.send({content: `@everyone ${status.type} \n ${status.links[i]}`})
                    hasSendForAvailability = true;
                }
            }

        }
        else
            message.channel.send({content: 'OwO'})
    }
    
    if(message.content == `$loop`) {
        isOnLoop = true;
        interval = setInterval (function () {
            isOnLoop = true;
            if(status.links.length > 0) {
                for (var i = 0; i < status.links.length; i++) {
                    if (status.links.length > 1)
                        message.channel.send({content: `@everyone ${status.type} \n ${status.links[i]}`})
                }
            }
            else {
                message.channel.send({content: 'OwO'})
            }

            status = app.WEZ_SE_KUP_KOSZULKE();

        }, config.Interval * config.Multiplier)
    }
    
    if(message.content == "$stop") {
        clearInterval(interval);
        isOnLoop = false;
        message.channel.send({content: "Stopped the loop"})
    }

    if(message.content == "$status") {
        isOnLoop ? message.channel.send({content: `Bot is on Loop with interval of ${config.Interval} minutes`}) : message.channel.send({content: "Bot is not on Loop"})
    }

    if(message.content == "$drop") {
        if(app.KIEDY_DROP() != "")
            message.channel.send({content: "```" + app.KIEDY_DROP() + "```"});
        else
            message.channel.send({content: "```Data dropu nieznana```"});    
    }
})

client.on('messageCreate', (message) => {
    if(message.content.toLowerCase() == `${prefix[1]}`) {
        message.reply("Ohayo gozaimasu")
    }
})

client.on('messageCreate', (message) => {
    if(message.content.toLowerCase() == "$help") {
        message.reply("Dostepne komendy: `$loop, $stop, $status, $drop, uwu senpai, ohayo`")
    }
})

client.on('messageCreate', (message) => {
    if(message.content.toLowerCase() == "test") {
        if(status != [])
        for(var i = 0; i < status.length; i++) {
            const embed = new MessageEmbed().setTitle("Kupuj teesa").setDescription(status[i]).setColor("#fadadd")

            message.channel.send({embeds: [embed]})
        }
    }
})

client.login(prod.token);