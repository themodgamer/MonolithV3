//server stuff
const path = require('path')
const Server = require('./server.js');

let myserver = new Server(path.join(__dirname, './server/test.bat'));

myserver.event.on('Exit', () => {
    console.log('IT HAS Exit');
});

myserver.event.on('Done', () => {
    console.log('IT HAS Loaded');
    
});

//ngrok stuff
const Ngrokentity = require('./ngrok.js');
const ngrok = new Ngrokentity();

ngrok.event.on('statuschange', (status) => {
    console.log('Ngrok status changed ' + status);
}); 

ngrok.launch();

// Push Commands
const discordpush = require('./discord/pushcommands.js');
discordpush.Pushcommands();

// discord
const Discordentity = require('./discord/discord.js');
const discord = new Discordentity();

//discord commands
discord.event.on('ping', (interaction) => {
    interaction.reply("Pong!");
});

discord.event.on('launch', (interaction) => {
    if (interaction.user.id === '347341414918782998') {
        myserver.launch();
        interaction.reply("Launched");
    }
});

discord.event.on('close', (interaction) => {
    if (interaction.user.id === '347341414918782998') {
        myserver.close();
        interaction.reply("Closing");
    }
});

discord.event.on('status', (interaction,exampleEmbed) => {
    exampleEmbed
        .setColor('#02ed2d')
        .setAuthor({ name: 'Monolith', iconURL: 'https://cdn.discordapp.com/avatars/870291694132793354/23dfa3e45993ba3fa04dfb0691a8beb2.webp?size=32', url: 'https://www.nasa.gov/' })
        .setTitle('Status')
        .addField('Server', myserver.status.toString() , true)
        .addField('Connection', ngrok.status.toString(), true)
        .addField('Ip', ngrok.url.toString(), true)
    interaction.reply({ embeds: [exampleEmbed]})
});

discord.event.on('ready', (interaction) => {
    //yeyeyeyeyyeye
});

discord.launch();
