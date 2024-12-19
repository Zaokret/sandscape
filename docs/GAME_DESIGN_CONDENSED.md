# Game Design Document (Condensed Draft)

**Concept:**  
A Discord-based, Mars-themed survival and expansion game. Players join colony threads, adopt roles (Technologist, Botanist, Diplomat), manage resources, and shape laws and economies. Achieving sustainability unlocks new planets and endless growth.

Spaceship - The Ark is carrying the last remains of humanity, in desperation they've started terraforming Mars.

**Technical Setup:**

- Node.js, Postgres, Discord API.
- Thousands of players, each colony is a Discord thread.
- Check in daily, ~10 commands/day.

**Roles & Interplay:**

- **Technologists:** Advance tech, build automated energy.
- **Botanists:** Cultivate ecosystems for food/oxygen.
- **Diplomats:** Manage population, treaties, laws.

**Economy:**

- **Attarcoins:** Initial entry currency.
- **Marscoin:** Player-driven trade currency.
- Marketplace governed by supply/demand and colony laws.

**Gameplay Loop:**

- Daily events affect all colonies.
- One major vote/decision per day.
- Players mine, craft, trade, propose laws.

**Progression:**

- Sustain a planet’s resources and environment.
- Unlock new planets after stabilizing one.
- Expand into multi-planet networks, ongoing development.

**Systems:**

- Moderate complexity in crafting/tech.
- Predefined laws with long-term effects.
- Diplomacy and treaties to manage resource disputes.

**UI & Tools:**

- Discord commands for core actions.
- Optional website for detailed stats and maps.

**Testing & Balancing:**

- Beta rewards for testers.
- Adjust resources and events based on feedback.
- Secure economy, no resource duplication.

**End State:**  
A persistent, player-driven environment where colonies evolve from fragile settlements into interplanetary networks, shaped by collective decisions.
