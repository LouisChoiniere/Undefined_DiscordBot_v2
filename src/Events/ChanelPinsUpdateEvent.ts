import { Channel } from "discord.js";
import { IEvent } from "../Interfaces/IEvent";
import { UndefinedClient } from "../UndefinedClient";


export const event: IEvent = {
    name: 'channelPinsUpdate',
    run: async (client: UndefinedClient, channel: Channel, time: Date) => {

        
    }
}