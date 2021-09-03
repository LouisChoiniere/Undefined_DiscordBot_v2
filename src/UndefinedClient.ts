import { Client, Collection } from "discord.js";
import { IEvent } from "./Interfaces/IEvent";
import glob from 'glob';
import { promisify } from "util";
import consola, { Consola } from 'consola';
import { PrismaClient } from "@prisma/client";
import { VoiceObject } from "./Interfaces/VoiceObjects";
import { ICommand } from "./Interfaces/ICommand";
import DatabaseService from "./Services/DatabaseService";
import VoiceChatService from "./Services/VoiceChatService";
import PermissionService from "./Services/PermissionService";
import YoutubeService from "./Services/YoutubeService";
import { IQueueElement } from "./Interfaces/IQueueElement";
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

    public voiceObjects: Collection<string, VoiceObject> = new Collection();
    public queue: Collection<string, Array<IQueueElement> | undefined> = new Collection();

    constructor() {
        super();
    }

    public async start(): Promise<void> {
        console.log('\n\n\n')

        // Load commands
        const commandFiles = await globPromise(`${__dirname}/Commands/**/*{.js,.ts}`)
        await Promise.all(commandFiles.map(async (cmdFile: string) => {
            let cmd = (await import(cmdFile)).command as ICommand;
            
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
            this.on(event.name, event.run.bind(null, this))
        }));
        this.logger.info(`Loaded ${eventFiles.length} events`);

        this.login(process.env.TOKEN);
    }
}