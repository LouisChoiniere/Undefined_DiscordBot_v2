import { Message } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'restart',
    description: 'Restart the bot',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        if (message.member?.user.id != '247162320147578881')
            return;

        process.exit(1);
    }
}