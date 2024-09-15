# tMetrik

> A library-agnostic Telegram bot analytics platform.

- [Key Features](#key-features)
- [Goals](#goals)
- [Non-Goals](#non-goals)
- [Requirements](#requirements)
- [Deployment](#deployment)
- [API Endpoint](#api-endpoint)
- [Development](#development)
- [Adapters](#adapters)
- [Community](#community)
- [License](#license)

> [!NOTE]
> While the core of the project is unlikely to change, the user interface is under active development, so it should not be relied on yet.

## Key Features

- **Easy.** Easy to adopt, and easy to deploy.
- **Live.** Dispatch and preview insights in real time.
- **Private.** Collect only specific parts of updates.
- **Library-agnostic.** Collect updates from any Telegram bot library.

## Goals

- Ability to collect Telegram updates from different libraries.
- Provide accurate insights on the collected updates.
- Stay simple, easy to plug in, and easy to deploy.

## Non-Goals

- Acting as a proxy to the Telegram API or the Bot API.
- Collecting updates from different MTProto sessions.
- Interfering with the connections of the clients with the Telegram API or the Bot API.

## Requirements

1. A Linux machine.
2. At least 16 GB of RAM.*
3. A reasonable amount of free space.
4. [Docker Engine](https://docs.docker.com/engine/).
5. A proxy server.

## Deployment

> [!NOTE]
> This guide only consists of deploying a tMetrik instance.
> You are responsible yourself to setup a proxy server, SSL, and others.

1. Clone the repository.

```shell
git clone git@github.com:tMetrik/tMetrik.git --recursive --depth 1
cd tMetrik
```

2. Build the images.

```shell
./build.sh
```

3. Start the containers.

```shell
docker compose up -d
```

3. If everything went well, the tMetrik server should be listening on TCP port 3000.

## API Endpoint

The API endpoint to dispatch updates is:

```
http(s)://<hostname>/?key=<key>
```

- `<hostname>` is where your tMetrik instance is reachable.
- `<key>` is one of the random UUIDs generated in the startup and stored in a file called `.keys`.

## Development

1. Make sure you have Docker Engine, the latest version of Node.js, and pnpm 9 installed.

2. Start the development [ClickHouse](https://clickhou.se) server.

```shell
./scripts/clickhouse.sh
```

3. Start the development Vite server.

```shell
pnpm dev
```

## Adapters

tMetrik can be plugged in to virtually any Telegram bot library.
Below is a list of official adapters.

- [grammY](https://github.com/tMetrik/grammY)
- [MTKruto](https://github.com/tMetrik/MTKruto)

## Community

Feel free to join [our chat](https://telegram.dog/tMetrik) if you had any questions.

## License

tMetrik is made open-source under [MIT](./LICENSE).

---

<sup>*[Manual configuration](https://clickhouse.com/docs/en/operations/tips#using-less-than-16gb-of-ram) is required if less RAM is to be used.</sup>
