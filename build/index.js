"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const match_randomizer_1 = require("./match_randomizer");
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.on('ready', () => {
    var _a;
    console.log("Bot ready!");
    const guild = client.guilds.cache.get(process.env.GUILD_ID || '');
    let commands;
    if (guild) {
        console.log('Deploying commands to guild');
        commands = guild.commands;
    }
    else {
        console.log('Deploying commands globally');
        commands = (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands;
    }
    commands === null || commands === void 0 ? void 0 : commands.create({
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
    });
});
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
    if (commandName === 'age') {
        const randomizedMatch = (0, match_randomizer_1.randomize)((_a = options.get('jogadores')) === null || _a === void 0 ? void 0 : _a.value, (_b = options.get('bots')) === null || _b === void 0 ? void 0 : _b.value, (_c = options.get('sem-mapas-navais')) === null || _c === void 0 ? void 0 : _c.value);
        yield interaction.reply({
            content: randomizedMatch.toString(),
        });
    }
}));
client.login(process.env.TOKEN);
