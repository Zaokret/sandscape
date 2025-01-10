DROP INDEX "idx_transactions_from_wallet_id";--> statement-breakpoint
DROP INDEX "idx_transactions_to_wallet_id";


ALTER TABLE guild_group_memberships
ADD CONSTRAINT pk_guild_group_memberships PRIMARY KEY ("guildId", "groupId");