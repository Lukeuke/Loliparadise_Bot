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
const token =  require('./config.json')

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity("for some tees 👀", {type: "WATCHING"})
});

var status = app.WEZ_SE_KUP_KOSZULKE();
var interval;
let isOnLoop = false;

console.log(status)

client.on('messageCreate', (message) => {
    if(message.content == `${prefix[0]} ${codes[0]}`) {
        if(status != [])
            for(var i = 0; i < status.length; i++)
                if(status.length > 1)
                    message.channel.send({content: `@everyone \nDostępna rzecz: ${status[i]}`})
                else
                    message.channel.send({content: status[i]})
        else
            message.channel.send({content: 'OwO'})
    }
    
    if(message.content == `${prefix[0]} ${codes[0]} $loop`) {
        interval = setInterval (function () {
            isOnLoop = true;
            if(status != []) {
                for(var i = 0; i < status.length; i++) {
                    if(status.length > 1)
                        message.channel.send({content: `@everyone ${status[i]}`})
                }
            }
            else {
                message.channel.send({content: 'OwO'})
            }
        }, app.minutesToMs(15))
    }
    
    if(message.content == "$stop") {
        clearInterval(interval);
        isOnLoop = false;
        message.channel.send({content: "Stopped the interval"})
    }

    if(message.content == "$status") {
        isOnLoop ? message.channel.send({content: "Bot is on Loop"}) : message.channel.send({content: "Bot is not on Loop"})
    }
})

client.on('messageCreate', (message) => {
    if(message.content.toLowerCase() == `${prefix[1]}`) {
        message.reply("Ohayo gozaimasu")
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

client.login(token.token);