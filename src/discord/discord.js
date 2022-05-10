const { token } = require('./config.json')
const { MessageEmbed, Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const EventEmitter = require('events');

class Discordentity{
    constructor(){
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        this.event = new EventEmitter();
    }

    launch(){
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
            this.event.emit('ready');
        });

        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
            var exampleEmbed = new MessageEmbed()
            var row = new MessageActionRow()
            this.event.emit(interaction.commandName, interaction, exampleEmbed, row,MessageSelectMenu);
        });

        this.client.login(token);
    }

    sendMessage(msg) {
        this.client.channels.cache.get("894478406329180183").send(msg);
    }
};

module.exports = Discordentity;