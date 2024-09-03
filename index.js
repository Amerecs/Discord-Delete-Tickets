const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const client = new Client({ intents: 3276799 });

const { token } = require("./config.js");

client.once("ready", () => {
console.log("ready")
});

client.on("messageCreate", async message => {
if(message.content === "delete-tickets"){
    if(!message.member.permissions.has("ADMINSTRATOR")) return;
const row = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setCustomId("1")
    .setLabel("ticket")
    .setStyle("SUCCESS"),
    new MessageButton()
    .setCustomId("2")
    .setLabel("closed")
    .setStyle("DANGER")
);
    message.reply({ content: "اذا تريد اغلاق التكتات المفتوحه اضغط على زر ticket\nاذا تريد اغلاق التكتات المغلقه اضغط على زر closed", components: [row] });
}
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "1") {
        let ticketChannels = interaction.guild.channels.cache.filter((channel) => channel.name.includes("ticket"));

        if (ticketChannels.size === 0) {
            await interaction.update({ content: "لا يوجد أي تكت مفتوحة", components: [] });
            return;
        }

        ticketChannels.forEach(async (channel) => {
            await channel.delete();
        });

        await interaction.update({ content: "تم حذف جميع التكتات المفتوحة", components: [] });
    } else if(interaction.customId == "2"){
    let ticketChannels = interaction.guild.channels.cache.filter((channel) => channel.name.includes("closed"));

       if (ticketChannels.size === 0) {
            await interaction.update({ content: "لا يوجد أي تكت مغلقه", components: [] });
            return;
        }

    
ticketChannels.forEach((channel) => {
            channel.delete();
        });
await interaction.update({ content: "تم حذف جميع التكتات المغلقه", components: [] });
}
});



client.login(token);
