# X Games 🎮

A Chrome extension that enables X (Twitter) communities to embed and manage interactive games directly in their feeds.

## How It Works

1. **Create a Community**

   - Create a new community on X
   - Add `(X game)` to your community title so Xgames can identify your community as compatible.
   - Add your game URL to your community description

2. **Installation Instructions**
   Add these instructions to your community description:
   ```
   🎮 To participate in this game:
   1. Install X Games extension: [Chrome Web Store Link]
   2. Refresh this community page
   3. The game will appear in the community feed
   ```

## Features

- Automatic detection of X game-enabled communities
- Seamless iframe embedding of external games
- Game management through extension popup
- Persistent storage of game configurations
- Community-specific game associations

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Build the extension:
   ```bash
   bun run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory

## Development

This project uses:

- TypeScript
- Parcel
- VanJS
- Vanilla Extract

## How It Works (Technical)

The extension:

1. Scans community titles for the `(X game)` marker
2. Extracts game URLs from community descriptions
3. Associates game URLs with community IDs in extension storage
4. Provides a configuration interface through the extension popup
5. Manages game embedding and storage through the extension

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
