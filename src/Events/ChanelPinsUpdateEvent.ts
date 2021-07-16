import { Channel, TextChannel } from "discord.js";
import { IEvent } from "../Interfaces/IEvent";
import { UndefinedClient } from "../UndefinedClient";


export const event: IEvent = {
    name: 'channelPinsUpdate',
    run: async (client: UndefinedClient, channel: Channel, time: Date) => {

        (client.channels.cache.get(channel.id) as TextChannel).send('Pin me daddy')
    }
}