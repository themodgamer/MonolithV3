//common.js
const common = require('./common.js');
const chalk = require('chalk');
const { NgrokDisabled, ServerDisabled } = require('./maincfg.json')

//ngrok stuff
common.fuse(function () {
    if (NgrokDisabled == "false") {
        const Ngrokentity = require('./ngrok.js');
        const ngrok = new Ngrokentity();
    
        ngrok.event.on('statuschange', (status) => {
            console.log(chalk.yellowBright('Ngrok status ' + status.toString()));
        }); 
    
        ngrok.launch();
    }
});

//server stuff
common.fuse(function () {
    if (ServerDisabled == "false") {
        const path = require('path');
        const Server = require('./server.js');
    
        let myserver = new Server(path.join(__dirname, './server/test.bat'));
    
        myserver.event.on('Exit', () => {
            console.log(chalk.red('Server terminated'));
        });
    
        myserver.event.on('Done', () => {
            
            console.log(chalk.green('Server Has Loaded'));
        });
    }
});

// Discord Stuff
common.fuse(function () {
    const discordpush = require('./discord/pushcommands.js');
    discordpush.Pushcommands();

    // discord
    const Discordentity = require('./discord/discord.js');
    const discord = new Discordentity();

    //discord commands
    discord.event.on('ping', (interaction) => {
        console.log(chalk.white('Got Ping Request Transmitting Random Message'));
        interaction.reply(common.readrandomline("ping.txt"));
    });

    discord.event.on('launch', (interaction) => {
        if (interaction.user.id === '347341414918782998') {
            myserver.launch();
            console.log(chalk.green('Launching Server'));
            interaction.reply("Launched");
        }
    });

    discord.event.on('close', (interaction) => {
        if (interaction.user.id === '347341414918782998') {
            myserver.close();
            console.log(chalk.red('Closing Server'));
            interaction.reply("Closing");
        }
    });

    discord.event.on('status', (interaction,exampleEmbed) => {
        exampleEmbed
            .setColor(myserver.running ? '#f70411' : '#02ed2d')
            .setAuthor({ name: 'Monolith', iconURL: 'https://cdn.discordapp.com/avatars/870291694132793354/23dfa3e45993ba3fa04dfb0691a8beb2.webp?size=32', url: 'https://www.nasa.gov/' })
            .setTitle('Status')
            .addField('Server', myserver.status.toString() , true)
            .addField('Connection', ngrok.status.toString(), true)
            .addField('Ip', ngrok.url.toString().replace('tcp://',''), true)
            .addField('Auto Sync', "Not Available", false)
        interaction.reply({ embeds: [exampleEmbed]})
    });

    discord.event.on('ready', (interaction) => {
        console.log(chalk.green('Discord Is Ready'));
    });

    discord.launch();
});

//input stuff
common.fuse(function () {
    const inputmodule = require('./input.js');

    inputmodule.event.on('msg', (data) => {
        discord.sendMessage(data)
    });

    inputmodule.event.on('cmd', (data) => {
        console.log(chalk.yellowBright(common.readtxtfile("cmd.txt")))
    });
    inputmodule.event.on('cmds', (data) => {
        console.log(chalk.yellowBright(common.readtxtfile("cmd.txt")))
    });
    inputmodule.event.on('help', (data) => {
        console.log(chalk.yellowBright(common.readtxtfile("cmd.txt")))
    });

    inputmodule.event.on('status', (data) => {
        console.log(chalk.green("Monolith Status"))
        if (NgrokDisabled == "false") {
            console.log(chalk.green("Ngrok: Enabled"))
        } else {
            console.log(chalk.red("Ngrok: Disabled"))
        }

        if (ServerDisabled == "false") {
            console.log(chalk.green("Server: Enabled"))
        } else {
            console.log(chalk.red("Server: Disabled"))
        }
    });

    inputmodule.event.on('cls', (data) => {
        console.clear();
    });

    inputmodule.event.on('clear', (data) => {
        console.clear();
    });

    inputmodule.event.on('createServer', (data) => {
        console.clear();
    });
});
