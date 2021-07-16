import { ICommand } from "../../Interfaces/ICommand"
import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { UndefinedClient } from "../../UndefinedClient";
import { DateTime } from "luxon";
import { IUserCommand } from "../../Interfaces/IUserCommand";

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