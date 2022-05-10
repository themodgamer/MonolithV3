const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { commands } = require('./commands.json')
const { token, clientId, guildId } = require('./config.json')
const rest = new REST({ version: '9' }).setToken(token);

function Pushcommands() {
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
        
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
        
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

module.exports = { Pushcommands }