const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test command'),
	async execute(interaction) {
        console.log('running test...')
		await interaction.reply('Pong!');
	},
}