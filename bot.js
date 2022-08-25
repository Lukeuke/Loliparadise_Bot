const { Client, MessageEmbed } = require('discord.js');

const app = require('./app');

const products = require('./app');

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
});

var status = app.WEZ_SE_KUP_KOSZULKE();

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
})

client.on('messageCreate', (message) => {
    if(message.content == "test") {
        if(status != [])
        for(var i = 0; i < status.length; i++) {
            const embed = new MessageEmbed().setTitle("Kupuj teesa").setDescription(status[i]).setColor("#fadadd")

            message.channel.send({embeds: [embed]})
        }
    }
})

client.login(token.token);