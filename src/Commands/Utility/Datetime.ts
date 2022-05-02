import { Guild, Message, User } from "discord.js";
import { DateTime } from "luxon";
import { ICommand } from "../../Interfaces/ICommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'date',
    description: 'Calculates dates for you!',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        var dateStr = DateTime.now()
            .setZone(params[0] ?? 'UTC')
            .toFormat(params[1]  ?? 'F');

        await message.channel.send(dateStr);
    }
}