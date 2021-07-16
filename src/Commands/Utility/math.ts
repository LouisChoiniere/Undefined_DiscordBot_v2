import { ICommand } from "../../Interfaces/ICommand"
import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { evaluate } from "mathjs";
import { UndefinedClient } from "../../UndefinedClient";
import { IUserCommand } from "../../Interfaces/IUserCommand";

export const command: ICommand = {
    name: 'math',
    description: 'Calculates math equations for you!',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        const expresstion = userCommand.args.join(' ')

        try {
            var answer = evaluate(expresstion);

            await message.channel.send(new MessageEmbed()
                .setTitle(':abacus: Math')
                .addField('**Expresstion**', expresstion, false)
                .addField('**Answer**', answer, false));
        } catch {
            await message.channel.send('Could not evaluate this equation');
        }
    }
}