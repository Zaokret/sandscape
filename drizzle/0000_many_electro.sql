CREATE TABLE "currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"groupId" uuid,
	"name" varchar NOT NULL,
	"symbol" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "currencies_name_unique" UNIQUE("name"),
	CONSTRAINT "currencies_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE "exchange_rates" (
	"baseCurrencyId" integer NOT NULL,
	"quoteCurrencyId" integer NOT NULL,
	"rate" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "guild_group_memberships" (
	"groupId" uuid NOT NULL,
	"guildId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "guild_group_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "guild_group_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"typeId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "groups_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "guilds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discordGuildId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "guilds_discordGuildId_unique" UNIQUE("discordGuildId")
);
--> statement-breakpoint
CREATE TABLE "transaction_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "transaction_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"fromWalletId" uuid,
	"toWalletId" uuid,
	"baseCurrencyId" integer NOT NULL,
	"quoteCurrencyId" integer,
	"baseAmount" numeric NOT NULL,
	"quoteAmount" numeric,
	"rate" numeric,
	"typeId" integer NOT NULL,
	"guildGroupTypeId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discordId" varchar NOT NULL,
	"guildId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"currencyId" integer NOT NULL,
	"count" numeric DEFAULT '0' NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_baseCurrencyId_currencies_id_fk" FOREIGN KEY ("baseCurrencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_quoteCurrencyId_currencies_id_fk" FOREIGN KEY ("quoteCurrencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_group_memberships" ADD CONSTRAINT "guild_group_memberships_groupId_groups_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guild_group_memberships" ADD CONSTRAINT "guild_group_memberships_guildId_guilds_id_fk" FOREIGN KEY ("guildId") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_typeId_guild_group_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."guild_group_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fromWalletId_wallets_id_fk" FOREIGN KEY ("fromWalletId") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_toWalletId_wallets_id_fk" FOREIGN KEY ("toWalletId") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_baseCurrencyId_currencies_id_fk" FOREIGN KEY ("baseCurrencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_quoteCurrencyId_currencies_id_fk" FOREIGN KEY ("quoteCurrencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_typeId_transaction_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."transaction_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_guildGroupTypeId_guild_group_types_id_fk" FOREIGN KEY ("guildGroupTypeId") REFERENCES "public"."guild_group_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_guildId_guilds_id_fk" FOREIGN KEY ("guildId") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_currencyId_currencies_id_fk" FOREIGN KEY ("currencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_group_id" ON "guild_group_memberships" USING btree ("groupId");--> statement-breakpoint
CREATE INDEX "idx_guild_id" ON "guild_group_memberships" USING btree ("guildId");--> statement-breakpoint
CREATE INDEX "idx_users_guild_id" ON "users" USING btree ("guildId");--> statement-breakpoint
CREATE INDEX "idx_users_discord_id" ON "users" USING btree ("discordId");--> statement-breakpoint
CREATE INDEX "idx_wallets_currency_id" ON "wallets" USING btree ("currencyId");--> statement-breakpoint
CREATE INDEX "idx_wallets_user_id" ON "wallets" USING btree ("userId");