import { Message } from "discord.js";
import { UndefinedClient } from "../UndefinedClient";

export interface runFuncion {
    (client: UndefinedClient, message: Message, params: string[]): Promise<void>
};

export interface ICommand {
    name: string;
    aliases?: Array<string>;
    description: string;
    run: runFuncion;
};