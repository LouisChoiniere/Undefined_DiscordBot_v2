import { Guild, Message, MessageEmbed, User } from "discord.js";
import { evaluate } from "mathjs";
import { ICommand } from "../../Interfaces/ICommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'math',
    description: 'Calculates math equations for you!',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        const expresstion = params.join(' ')

        try {
            var answer = evaluate(expresstion);

            await message.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(':abacus: Math')
                    .addField('**Expresstion**', expresstion, false)
                    .addField('**Answer**', answer, false)]
            });
        } catch {
            await message.channel.send('Could not evaluate this equation');
        }
    }
}