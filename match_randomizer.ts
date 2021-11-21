import { vanillaMaps, vanillaWaterMaps } from './data/maps.json';
import { vanillaCivilizations } from './data/civilizations.json';

interface RandomizedPlayerOrBot {
    name: String,
    civilization: String,
}

interface RandomizedMatch {
    players: Array<RandomizedPlayerOrBot>,
    bots: Array<RandomizedPlayerOrBot>,
    map: String
}

function randomizedMatchAsString(match: RandomizedMatch): String{
    let response = `**Mapa:** ${match.map}`;
    const playersAndBots = match.players.concat(match.bots);

    if(Array.isArray(playersAndBots) && playersAndBots.length){
        response = response.concat('\n\n')
        playersAndBots.forEach(playerOrBot => {
            console.debug(`Generating message for: ${playerOrBot.name}`);
            response = response.concat(`${playerOrBot.name} - ${playerOrBot.civilization}\n`)
        })
    }

    return response;
}

function randomize(players: String, bots: Number, noSeaMaps: Boolean): String {
    const randomizedPlayers = players ? randomizePlayers(players) : [];
    const randomizedBots = bots ? randomizeBots(bots) : [];
    const randomizedMap = randomizeMap(noSeaMaps);

    const randomizedMatch = {
        players: randomizedPlayers,
        bots: randomizedBots,
        map: randomizedMap
    };

    return randomizedMatchAsString(randomizedMatch);
}

function randomizePlayers(players: String): RandomizedPlayerOrBot[]{
    console.debug(`Randomizing players: ${players}`)
    const splittedPlayers = players.split(",");
    const randomizedPlayers = splittedPlayers.map(player => {
        return {
            name: player,
            civilization: vanillaCivilizations[Math.floor(Math.random() * vanillaCivilizations.length)]
        }
    });

    return randomizedPlayers;
}

function randomizeBots(numberOfBots: Number): RandomizedPlayerOrBot[]{
    console.debug(`Randomizing bots: ${numberOfBots}`)
    const randomizedBots = [];
    for(let i = 0; i < numberOfBots; i++){
        randomizedBots.push({
            name: `Bot ${i+1}`,
            civilization: vanillaCivilizations[Math.floor(Math.random() * vanillaCivilizations.length)]
        })
    }
    return randomizedBots;
}

function randomizeMap(noSeaMaps: Boolean): String {
    let mapPool = vanillaMaps;
    if(!noSeaMaps){
        mapPool = mapPool.concat(vanillaWaterMaps)
    }
    console.debug(`Randomizing maps: ${mapPool}`)
    
    return mapPool[Math.floor(Math.random() * mapPool.length)];
}

export { randomize };