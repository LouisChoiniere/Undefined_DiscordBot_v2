import { PrismaClient } from "@prisma/client";
import consola, { Consola } from 'consola';
import { Client, Collection, Intents, TextChannel } from "discord.js";
import glob from 'glob';
import { promisify } from "util";
import { ICommand } from "./Interfaces/ICommand";
import { IEvent } from "./Interfaces/IEvent";
import DatabaseService from "./Services/DatabaseService";
import PermissionService from "./Services/PermissionService";
import VoiceChatService from "./Services/VoiceChatService";
import YoutubeService from "./Services/YoutubeService";
const globPromise = promisify(glob);
require('dotenv').config({ path: __dirname + '/../.env' });

export class UndefinedClient extends Client {

    public readonly logger: Consola = consola;
    public readonly prisma: PrismaClient = new PrismaClient();

    public readonly VoiceChatService: VoiceChatService = new VoiceChatService(this);
    public readonly DatabaseService: DatabaseService = new DatabaseService(this);
    public readonly PermissionService: PermissionService = new PermissionService(this);
    public readonly YoutubeService: YoutubeService = new YoutubeService(this);

    public readonly prefix: string = process.env.PREFIX!;
    public commands: Collection<string, ICommand> = new Collection();

    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ]
        });
    }

    public async start(): Promise<void> {
        console.log('\n\n\n')

        // Load commands
        const commandFiles = await globPromise(`${__dirname}/Commands/**/*{.js,.ts}`)
        await Promise.all(commandFiles.map(async (cmdFile: string) => {
            let cmd = (await import(cmdFile)).command as ICommand;

            if (cmd == null) return;

            this.commands.set(cmd.name, cmd);
            cmd.aliases?.forEach(alias => {
                this.commands.set(alias, cmd);
            });
        }));
        this.logger.info(`Loaded ${this.commands.size} commands and aliases from ${commandFiles.length} commands`);

        // Load events
        const eventFiles = await globPromise(`${__dirname}/Events/**/*{.js,.ts}`)
        await Promise.all(eventFiles.map(async (eventFile: string) => {
            let event = (await import(eventFile)).event as IEvent;

            if (event == null) return;

            this.on(event.name, event.run.bind(null, this))
        }));
        this.logger.info(`Loaded ${eventFiles.length} events`);

        // Login discord using token stored in env variable
        this.login(process.env.TOKEN);
    }

    public send(textChannelId: string, message: any) {
        try {
            let channel = this.channels.cache.find(channel => channel.id == textChannelId);

            if (channel?.isText()) {
                (<TextChannel>channel).send(message)
            }
        } finally { }
    }
}