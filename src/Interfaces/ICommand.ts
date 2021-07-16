import { UndefinedClient } from "../UndefinedClient";
import { Guild, Message, User } from "discord.js";
import { IUserCommand } from "./IUserCommand";

export interface runFuncion {
    (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand): Promise<void>
};

export interface ICommand {
    name: string;
    description: string;
    run: runFuncion;
};