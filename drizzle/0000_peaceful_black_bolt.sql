CREATE TABLE "colonies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" char(256),
	"createdAt" timestamp NOT NULL,
	"rating" numeric DEFAULT '0',
	"planetTypeId" integer
);
--> statement-breakpoint
CREATE TABLE "colonist_action_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" integer,
	"name" char(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "colonist_actions" (
	"colonistId" uuid NOT NULL,
	"typeId" integer NOT NULL,
	"lastUsed" timestamp DEFAULT '1969-12-31 23:00:00.000'
);
--> statement-breakpoint
CREATE TABLE "colonist_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	CONSTRAINT "colonist_roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "colonist_upgrades" (
	"colonistId" uuid NOT NULL,
	"upgradeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "colonists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"colonyId" uuid NOT NULL,
	"joinedAt" timestamp NOT NULL,
	"roleId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "colony_tiles" (
	"tileId" uuid NOT NULL,
	"colonyId" uuid NOT NULL,
	"progress" numeric DEFAULT '0',
	"claimedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "colony_upgrades" (
	"colonyId" uuid NOT NULL,
	"upgradeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	"symbol" char(256) NOT NULL,
	CONSTRAINT "currencies_name_unique" UNIQUE("name"),
	CONSTRAINT "currencies_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE "effect_target_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	CONSTRAINT "effect_target_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "effects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	"periodId" integer NOT NULL,
	"sourceId" integer NOT NULL,
	"targetId" integer NOT NULL,
	"targetTypeId" integer NOT NULL,
	"startAt" timestamp,
	"endAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "event_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	CONSTRAINT "event_sources_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	"periodId" integer NOT NULL,
	"sourceId" integer NOT NULL,
	"effectId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchange_rates" (
	"baseCurrencyId" integer NOT NULL,
	"quoteCurrencyId" integer NOT NULL,
	"rate" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_items" (
	"itemId" uuid NOT NULL,
	"inventoryId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_changes" (
	"id" serial PRIMARY KEY NOT NULL,
	"typeId" integer NOT NULL,
	"count" integer NOT NULL,
	"periodId" integer NOT NULL,
	"colonyId" uuid,
	"sourceId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_type_recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"itemIds" integer[] NOT NULL,
	"result" integer[] NOT NULL,
	"authorId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	"stackLimit" integer NOT NULL,
	"price" numeric,
	"recipeId" integer,
	"tier" integer,
	"consumable" boolean NOT NULL,
	"duration" integer NOT NULL,
	"sourceId" integer,
	CONSTRAINT "item_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" char(256) NOT NULL,
	"typeId" integer
);
--> statement-breakpoint
CREATE TABLE "multiplier_effects" (
	"id" serial PRIMARY KEY NOT NULL,
	"effectId" integer NOT NULL,
	"multiplier" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "periods" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	CONSTRAINT "periods_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "planet_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	CONSTRAINT "planet_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "planets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" char(256) NOT NULL,
	"typeId" integer
);
--> statement-breakpoint
CREATE TABLE "state_effect_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	CONSTRAINT "state_effect_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "state_effects" (
	"id" serial PRIMARY KEY NOT NULL,
	"effectId" integer NOT NULL,
	"typeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "terraformings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tileId" uuid NOT NULL,
	"planetId" uuid NOT NULL,
	"water" numeric DEFAULT '0' NOT NULL,
	"heat" numeric DEFAULT '0' NOT NULL,
	"oxygen" numeric DEFAULT '0' NOT NULL,
	"colonyId" uuid,
	"colonizedAt" timestamp,
	"terraformedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "tile_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	"planetTypeIds" integer[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" integer
);
--> statement-breakpoint
CREATE TABLE "upgrades" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" char(256) NOT NULL,
	"effectId" integer NOT NULL,
	"cost" numeric DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discordId" char(256) NOT NULL,
	CONSTRAINT "users_discordId_unique" UNIQUE("discordId")
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"userId" uuid NOT NULL,
	"currencyId" integer NOT NULL,
	"count" numeric DEFAULT '0' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "colonies" ADD CONSTRAINT "colonies_planetTypeId_planet_types_id_fk" FOREIGN KEY ("planetTypeId") REFERENCES "public"."planet_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonist_action_types" ADD CONSTRAINT "colonist_action_types_role_colonist_roles_id_fk" FOREIGN KEY ("role") REFERENCES "public"."colonist_roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonist_actions" ADD CONSTRAINT "colonist_actions_colonistId_colonists_id_fk" FOREIGN KEY ("colonistId") REFERENCES "public"."colonists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonist_actions" ADD CONSTRAINT "colonist_actions_typeId_colonist_action_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."colonist_action_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonist_upgrades" ADD CONSTRAINT "colonist_upgrades_colonistId_colonists_id_fk" FOREIGN KEY ("colonistId") REFERENCES "public"."colonists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonist_upgrades" ADD CONSTRAINT "colonist_upgrades_upgradeId_upgrades_id_fk" FOREIGN KEY ("upgradeId") REFERENCES "public"."upgrades"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonists" ADD CONSTRAINT "colonists_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonists" ADD CONSTRAINT "colonists_colonyId_colonies_id_fk" FOREIGN KEY ("colonyId") REFERENCES "public"."colonies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colonists" ADD CONSTRAINT "colonists_roleId_colonist_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."colonist_roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colony_tiles" ADD CONSTRAINT "colony_tiles_tileId_tiles_id_fk" FOREIGN KEY ("tileId") REFERENCES "public"."tiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colony_tiles" ADD CONSTRAINT "colony_tiles_colonyId_colonies_id_fk" FOREIGN KEY ("colonyId") REFERENCES "public"."colonies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colony_upgrades" ADD CONSTRAINT "colony_upgrades_colonyId_colonies_id_fk" FOREIGN KEY ("colonyId") REFERENCES "public"."colonies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colony_upgrades" ADD CONSTRAINT "colony_upgrades_upgradeId_upgrades_id_fk" FOREIGN KEY ("upgradeId") REFERENCES "public"."upgrades"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "effects" ADD CONSTRAINT "effects_periodId_periods_id_fk" FOREIGN KEY ("periodId") REFERENCES "public"."periods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "effects" ADD CONSTRAINT "effects_sourceId_event_sources_id_fk" FOREIGN KEY ("sourceId") REFERENCES "public"."event_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "effects" ADD CONSTRAINT "effects_targetTypeId_effect_target_types_id_fk" FOREIGN KEY ("targetTypeId") REFERENCES "public"."effect_target_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_periodId_periods_id_fk" FOREIGN KEY ("periodId") REFERENCES "public"."periods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_sourceId_event_sources_id_fk" FOREIGN KEY ("sourceId") REFERENCES "public"."event_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_effectId_effects_id_fk" FOREIGN KEY ("effectId") REFERENCES "public"."effects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_baseCurrencyId_currencies_id_fk" FOREIGN KEY ("baseCurrencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_quoteCurrencyId_currencies_id_fk" FOREIGN KEY ("quoteCurrencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_location_inventory_locations_id_fk" FOREIGN KEY ("location") REFERENCES "public"."inventory_locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_itemId_items_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_inventoryId_inventories_id_fk" FOREIGN KEY ("inventoryId") REFERENCES "public"."inventories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_changes" ADD CONSTRAINT "item_changes_typeId_item_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."item_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_changes" ADD CONSTRAINT "item_changes_periodId_periods_id_fk" FOREIGN KEY ("periodId") REFERENCES "public"."periods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_changes" ADD CONSTRAINT "item_changes_colonyId_colonies_id_fk" FOREIGN KEY ("colonyId") REFERENCES "public"."colonies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_changes" ADD CONSTRAINT "item_changes_sourceId_event_sources_id_fk" FOREIGN KEY ("sourceId") REFERENCES "public"."event_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_type_recipes" ADD CONSTRAINT "item_type_recipes_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_types" ADD CONSTRAINT "item_types_recipeId_item_type_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."item_type_recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_types" ADD CONSTRAINT "item_types_sourceId_event_sources_id_fk" FOREIGN KEY ("sourceId") REFERENCES "public"."event_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_typeId_item_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."item_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "multiplier_effects" ADD CONSTRAINT "multiplier_effects_effectId_effects_id_fk" FOREIGN KEY ("effectId") REFERENCES "public"."effects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planets" ADD CONSTRAINT "planets_typeId_planet_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."planet_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "state_effects" ADD CONSTRAINT "state_effects_effectId_effects_id_fk" FOREIGN KEY ("effectId") REFERENCES "public"."effects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "state_effects" ADD CONSTRAINT "state_effects_typeId_state_effect_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."state_effect_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terraformings" ADD CONSTRAINT "terraformings_tileId_tiles_id_fk" FOREIGN KEY ("tileId") REFERENCES "public"."tiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terraformings" ADD CONSTRAINT "terraformings_planetId_planets_id_fk" FOREIGN KEY ("planetId") REFERENCES "public"."planets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terraformings" ADD CONSTRAINT "terraformings_colonyId_colonies_id_fk" FOREIGN KEY ("colonyId") REFERENCES "public"."colonies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_type_tile_types_id_fk" FOREIGN KEY ("type") REFERENCES "public"."tile_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "upgrades" ADD CONSTRAINT "upgrades_effectId_effects_id_fk" FOREIGN KEY ("effectId") REFERENCES "public"."effects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_currencyId_currencies_id_fk" FOREIGN KEY ("currencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;