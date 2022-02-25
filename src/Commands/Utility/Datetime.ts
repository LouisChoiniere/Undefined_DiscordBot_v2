import { Guild, Message, User } from "discord.js";
import { DateTime } from "luxon";
import { ICommand } from "../../Interfaces/ICommand";
import { IUserCommand } from "../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'date',
    description: 'Calculates dates for you!',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        var dateStr = DateTime.now()
            .setZone(userCommand.flags.find(x => x.flag == 'tz')?.value ?? 'UTC')
            .toFormat(userCommand.flags.find(x => x.flag == 'f')?.value  ?? 'F');

        await message.channel.send(dateStr);
    }
}