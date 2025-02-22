// todo: objects
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Ustawienia serwerowe.')
        .addChannelOption(option => (
            option.setName("ogłoszenia").setDescription("Kanał ogłoszeniowy")
        )).addChannelOption(option => (
            option.setName('głosowania').setDescription("Kanał głosowań")
        )).addChannelOption(option => (
            option.setName("skargi").setDescription("Kanał skarg")
        )).addChannelOption(option => (
            option.setName("obrazki").setDescription("Kanał obrazkowy")
        )).addChannelOption(option => (
            option.setName("powitania").setDescription("Kanał powitań")
        )).addChannelOption(option => (
            option.setName("pożegnania").setDescription("Kanał pożegnań")
        )).addChannelOption(option => (
            option.setName("sugestie").setDescription("Kanał sugestii")
        )).addChannelOption(option => (
            option.setName("podania").setDescription("Kanał podań")
        )).addRoleOption(option => (
            option.setName("moderatorrole").setDescription("Rola moderacji")
        )).addRoleOption(option => (
            option.setName("mutedrole").setDescription("Rola wyciszonego")
        )).addRoleOption(option => (
            option.setName("userrole").setDescription("Rola zweryfikowanego użytkownika")
        )).addRoleOption(option => (
            option.setName("adminrole").setDescription("Rola administratora serwera")
        )).addRoleOption(option => (
            option.setName("autorole").setDescription("Rola automatyczna")
        )),

    async execute(client, interaction) {
        const checkTable = await r.table("settings").get(interaction.guild.id).run(client.con);

        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});

        for (let option of interaction.options.data) {
            switch (option.name) {
                case "ogłoszenia":
                    const channel = await interaction.options.getChannel("ogłoszenia");

                    if (channel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (channel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: channel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, broadcastChannel: channel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${channel.id}> (broadcastChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "głosowania":
                    const votechannel = await interaction.options.getChannel("głosowania");

                    if (votechannel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (votechannel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, voteChannel: votechannel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, voteChannel: votechannel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${votechannel.id}> (voteChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "skargi":
                    const complaintchannel = await interaction.options.getChannel("skargi");

                    if (complaintchannel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (complaintchannel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, complaintChannel: complaintchannel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, complaintChannel: complaintchannel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${complaintchannel.id}> (complaintChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "obrazki":
                    const imagechannel = await interaction.options.getChannel("obrazki");

                    if (imagechannel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (imagechannel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, imageChannel: imagechannel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, imageChannel: imagechannel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${imagechannel.id}> (imageChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "powitania":
                    const welcomechannel = await interaction.options.getChannel("powitania");

                    if (welcomechannel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (welcomechannel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, welcomeChannel: welcomechannel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, welcomeChannel: welcomechannel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${welcomechannel.id}> (welcomeChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "pożegnania":
                    const goodbyechannel = await interaction.options.getChannel("pożegnania")

                    if (goodbyechannel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (goodbyechannel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, goodbyeChannel: goodbyechannel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ goodbyeChannel: goodbyechannel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${goodbyechannel.id}> (goodbyeChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "sugestie":
                    const suggestionchannel = await interaction.options.getChannel("sugestie");

                    if (suggestionchannel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (suggestionchannel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, suggestionChannel: suggestionchannel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, suggestionChannel: suggestionchannel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${suggestionchannel.id}> (suggestionChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "podania":
                    const applicationchannel = await interaction.options.getChannel("podania");

                    if (applicationchannel.type === "GUILD_CATEGORY") return client.builder(interaction, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")
                    if (applicationchannel.type === "GUILD_VOICE") return client.builder(interaction, "Błąd!", "Podałeś kanał głosowy! Podaj kanał tekstowy.", "", "RED")

                    await r.table("settings").insert({ id: interaction.guild.id, applicationChannel: applicationchannel.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, applicationChannel: applicationchannel.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${applicationchannel.id}> (applicationChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "moderatorrole":
                    const moderatorRole = await interaction.options.getRole("moderatorrole");

                    await r.table("settings").insert({ id: interaction.guild.id, moderatorRole: moderatorRole.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, moderatorRole: moderatorRole.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nRola: <@&${moderatorRole.id}> (moderatorRole)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "mutedrole":
                    const mutedRole = await interaction.options.getRole("mutedrole");

                    await r.table("settings").insert({ id: interaction.guild.id, mutedRole: mutedRole.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, mutedRole: mutedRole.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nRola: <@&${mutedRole.id}> (mutedRole)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "userrole":
                    const userRole = await interaction.options.getRole("userrole");

                    await r.table("settings").insert({ id: interaction.guild.id, userRole: userRole.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, userRole: userRole.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nRola: <@&${userRole.id}> (userRole)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "adminrole":
                    const adminRole = await interaction.options.getRole("adminrole");

                    await r.table("settings").insert({ id: interaction.guild.id, adminRole: adminRole.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, adminRole: adminRole.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nRola: <@&${adminRole.id}> (adminRole)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
                case "autorole":
                    const autoRole = await interaction.options.getRole("autorole");

                    await r.table("settings").insert({ id: interaction.guild.id, autoRole: autoRole.id}).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, autoRole: autoRole.id }).run(client.con);

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nRola: <@&${autoRole.id}> (autoRole)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                break;
            }
        }
    }
};