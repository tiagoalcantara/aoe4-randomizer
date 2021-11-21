"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomize = void 0;
const maps_json_1 = require("./data/maps.json");
const civilizations_json_1 = require("./data/civilizations.json");
function randomizedMatchAsString(match) {
    let response = `**Mapa:** ${match.map}`;
    const playersAndBots = match.players.concat(match.bots);
    if (Array.isArray(playersAndBots) && playersAndBots.length) {
        response = response.concat('\n\n');
        playersAndBots.forEach(playerOrBot => {
            console.debug(`Generating message for: ${playerOrBot.name}`);
            response = response.concat(`${playerOrBot.name} - ${playerOrBot.civilization}\n`);
        });
    }
    return response;
}
function randomize(players, bots, noSeaMaps) {
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
exports.randomize = randomize;
function randomizePlayers(players) {
    console.debug(`Randomizing players: ${players}`);
    const splittedPlayers = players.split(",");
    const randomizedPlayers = splittedPlayers.map(player => {
        return {
            name: player,
            civilization: civilizations_json_1.vanillaCivilizations[Math.floor(Math.random() * civilizations_json_1.vanillaCivilizations.length)]
        };
    });
    return randomizedPlayers;
}
function randomizeBots(numberOfBots) {
    console.debug(`Randomizing bots: ${numberOfBots}`);
    const randomizedBots = [];
    for (let i = 0; i < numberOfBots; i++) {
        randomizedBots.push({
            name: `Bot ${i + 1}`,
            civilization: civilizations_json_1.vanillaCivilizations[Math.floor(Math.random() * civilizations_json_1.vanillaCivilizations.length)]
        });
    }
    return randomizedBots;
}
function randomizeMap(noSeaMaps) {
    let mapPool = maps_json_1.vanillaMaps;
    if (!noSeaMaps) {
        mapPool = mapPool.concat(maps_json_1.vanillaWaterMaps);
    }
    console.debug(`Randomizing maps: ${mapPool}`);
    return mapPool[Math.floor(Math.random() * mapPool.length)];
}
