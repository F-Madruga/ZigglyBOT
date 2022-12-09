# ZigglyBOT

## Requirements

- [docker](https://www.docker.com/)
- docker-compose (usually installed with docker)

## Set enviromment variables (required)

Create a `.env` file with the following format:

```
NODE_ENV=
LOGGER_LEVEL=
DISCORD_TOKEN=
CLIENT_ID=
GUILD_ID=
```

`NODE_ENV` can be one of the following:

- `prod` (recommended to run the bot)
- `dev`
- `test`

`LOGGER_LEVEL` can be one of the following:

- `info` (recommended to run the bot)
- `debug`
- `trace`
- `fatal`
- `error`
- `warn`

How to get `DISCORD_TOKEN`, `CLIENT_ID` and `GUILD_ID`?

- https://youtu.be/4IxLBKPVyXE?t=695

## Useful links

Add bot to server (replace `CLIENT_ID` and `GUILD_ID`):
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot&guild_id=GUILD_ID$permissions=8

Applications settings: https://discord.com/developers/applications

## Permissions

8

## Start ZigglyBOT

```shell
npm run docker:compose:up
```

## Stop ZigglyBOT

```shell
npm run docker:compose:down
```
