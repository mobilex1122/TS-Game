# TS-Game

**Notice:** Game is now in new repository [`mobilex1122/TS-Game-Vite`](https://github.com/mobilex1122/TS-Game-Vite) running on different framework (vite).

Game made in TS with custom made game engine that's being developed at the same as the game and will be relased as separate game engine in future.

## Relased Versions

### Option 1: Online version (Easy)

- Go to [releases](https://github.com/mobilex1122/TS-Game/releases) and find online version link
- Alternatively go to `https://mobilex1122.eu/games/ts-game/<relase tag>/`
  
  Example for tag b2: `https://mobilex1122.eu/games/ts-game/b2/`

### Option 2: Local play (Advanced)

1. Go to [releases](https://github.com/mobilex1122/TS-Game/releases) and download `Game.zip`
2. Extract `Game.zip` in new folder
3. Run any html server inside that folder. Recomended (and easy) html servers:
   - VS Code Live server:
      1. Open extracted folder in VS Code
      2. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
      3. Run Live Server (Go Love button in bottom right panel)
   - Python http server
      1. Install [python](https://www.python.org/downloads/)
      2. Open extracted folder in terminal (Or navigate to it)
      3. Run `python -m http.server`
4. Open server adress in web browser (`http://localhost:<port>`)

## Manual Build or Setup for development

1. Install typescript compiler (`tsc`) and run it inside project folder (`/.../TS-Game/`)
2. Run live server (or any other http-server, refer to Relased versions option 2) inside `./public` directory

## TODO

- [x] Collisions
- [x] Object Management
- [ ] Render Distance (Don't render things that are not on screen)
- [ ] Sound
- [ ] Textures
