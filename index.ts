import { randomize } from './match_randomizer';
import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log("Bot ready!");
    const guild = client.guilds.cache.get(process.env.GUILD_ID || '');

    let commands;
    if(guild){
        console.log('Deploying commands to guild');
        commands = guild.commands;
    } else {
        console.log('Deploying commands globally');
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'age',
        description: "Randomizar uma partida de age!",
        options: [
            {
                name: "jogadores",
                description: "Nomes dos jogadores separados por vírgula",
                type: "STRING",
            },
            {
                name: "bots",
                description: "Quantidade de bots na partida",
                type: "INTEGER"
            },
            {
                name: "sem-mapas-navais",
                description: "Opção para excluir mapas navais do sorteio",
                type: "BOOLEAN",
            },
        ]
    })
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()){
        return;
    }

    const { commandName, options } = interaction;

    if(commandName === 'age') {        
        const randomizedMatch = randomize(options.get('jogadores')?.value as String, 
                                          options.get('bots')?.value as Number, 
                                          options.get('sem-mapas-navais')?.value as Boolean)

        await interaction.reply({
            content: randomizedMatch.toString(),
        })
    }
})

client.login(process.env.TOKEN);