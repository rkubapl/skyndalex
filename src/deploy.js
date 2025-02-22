const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

    const clientId = '829812129074774086';
    const guildId = '804477558061137972'; // id serwera

    const commands = [];
    const rest = new REST({version: '9'}).setToken(token);

    (async () => {
        try {
            const commandFolders = fs.readdirSync('./commands');

            for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = require(`./commands/${folder}/${file}`);
                    commands.push(command.data.toJSON());
                }
            }
            (async () => {
                try {
                    console.log('Loading (/) commands.');

                    await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId),
                        { body: commands },
                    );
                    await rest.put(
                        Routes.applicationCommands(clientId),
                        { body: commands },
                    );
                    console.log('Loaded (/) commands.');
                } catch (error) {
                    console.error(error);
                }
            })();
        } catch (error) {
            console.error(error);
        }
    })();