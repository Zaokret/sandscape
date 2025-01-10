import { Events } from "discord.js"
import { ClientEvent } from "../types"
import { repository } from "../database/repository"

const reactionAdded: ClientEvent<Events.MessageReactionAdd> = {
  once: false,
  name: Events.MessageReactionAdd,
  async execute(reaction) {
    if (reaction.partial) {
      try {
        reaction = await reaction.fetch()
      } catch (error) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error
        console.error("Something went wrong when fetching the message:", error)
        // Return as `reaction.message.author` may be undefined/null
        return
      }
    }

    let currency: any = null
    if (reaction.emoji.name) {
      currency = await repository.getCurrency(reaction.emoji.name)
      if (currency) {
        console.log(`${reaction.message.author?.username} gained 1 ${currency.name}.`)
      }
    }
  },
}

export default reactionAdded
