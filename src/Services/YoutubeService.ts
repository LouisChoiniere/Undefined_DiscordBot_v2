import { User } from "discord.js";
import { UndefinedClient } from "../UndefinedClient";

export default class YoutubeService {

    public readonly client: UndefinedClient;

    constructor(client: UndefinedClient) {
        this.client = client;
    }


}