const { token } = require('./config.json')
const { MessageEmbed, Client, Intents } = require('discord.js');
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
            this.event.emit(interaction.commandName, interaction, exampleEmbed);
        });

        this.client.login(token);
    }
};

module.exports = Discordentity;





/*client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    else if (interaction.commandName === 'status') {
        var exampleEmbed = new MessageEmbed()
            .setColor('#02ed2d')
            .setAuthor({ name: 'Monolith', iconURL: 'https://cdn.discordapp.com/avatars/870291694132793354/23dfa3e45993ba3fa04dfb0691a8beb2.webp?size=32', url: 'https://www.nasa.gov/' })
            .setTitle('Status')
            .addField('Server', "Not Implemented", true)
            .addField('Connection', ngrok.stat, true)
            .addField('Ip', "Not Implemented", true)

            console.log(ngrok.url);

        await interaction.reply({ embeds: [exampleEmbed]})
    }
    else if (interaction.user.id === '347341414918782998') {
        if (interaction.commandName === 'launch'  && !ls.active) {
            server.turnOn();
            await interaction.reply('Launched')
        }
        else if (interaction.commandName === 'close' && interaction.user.id === '347341414918782998') {
            server.turnoff();
            await interaction.reply('Closed')
    }}
});*/