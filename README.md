# libraries and their uses

package manager: pnpm

libs: discord.js, nodejs
dev: typescript, tsx

logger: pino

db: postgres
orm: Sequelize

process manager: pm2

job scheduler: bree

# art direction

daily updates: https://www.reddit.com/r/midjourney/comments/1hg7sn9/snapchat_stories_from_mars/

starmap: https://observablehq.com/@d3/star-map

# discord js docs

https://discordjs.guide/#before-you-begin

# db

- [download postgres v17.2](https://www.postgresql.org/)
- create sandscape database
- put `DATABASE_URL` in `.env` for example `postgresql://postgres:postgres@localhost:5432/sandscape`
- run migrations `pnpm db:migrate`
