const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "guildMemberRemove",
    once: false,

    async execute(client, member) {
        const table = await r.table("settings").get(member.guild.id).run(client.con)
        if (!table?.goodbyeChannel) return;

        const embed = new MessageEmbed()
            .setDescription(`**Właśnie ktoś wyszedł!**\n\nWitamy użytkownika ${member.user}(${member.user.tag})! Mamy nadzieję że się będziesz dobrze u nas bawił.\nAktualna ilość osób na serwerze: ${member.guild.memberCount}`)
            .setColor("RED")
        member.guild.channels.cache.get(table.goodbyeChannel).send({
            embeds: [embed]
        })
    }
}