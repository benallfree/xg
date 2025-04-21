# Adding Your Game to X Games

Thank you for your interest in adding your game to X Games! This guide will walk you through the process.

## Important Security & Hosting Requirements

Due to Chrome Web Store's strict security policies for extensions:

- All games must be pre-approved and whitelisted
- Games will be delisted if they:
  - Engage in spam or scam behavior
  - Stop working or load unreliably
  - Cause performance issues in the extension
  - Violate Chrome Web Store policies
- We strongly recommend hosting on Cloudflare Pages for:
  - Reliable uptime
  - Fast global performance
  - Free hosting
  - Easy deployment

Your game's reliability directly affects our Chrome Web Store status. If your game causes loading or performance issues, we'll need to delist it to maintain our extension's marketplace status.

## Step 1: Create Your X Community

1. Create a new Community on X (Twitter) for your game
2. Add this text to your community description:
   ```
   Install the Xgames Chrome Extension to play https://x-games.benallfree.com
   ```
3. Get your Community ID from the URL when viewing your community
   - Example: In `https://x.com/i/communities/1914050686272286940`, the ID is `1914050686272286940`

## Step 2: Prepare Your Game Assets

1. Create a `splash.jpg` image (recommended size: 1200x630px) to showcase your game
2. Your game should be hosted on your own domain or platform

## Step 3: Update the Whitelist

Add your game's information to `packages/site/public/whitelist.json`:

```json
{
  "games": [
    // ... existing games ...
    {
      "slug": "your-game-slug",
      "url": "https://your-game-url.com",
      "imagePath": "/games/your-game-slug/splash.jpg",
      "title": "Your Game Title",
      "description": "A brief, engaging description of your game (max 150 characters)",
      "xUsername": "your-x-handle",
      "xCommunityId": "your-x-community-id",
      "repoUrl": "https://github.com/your-username/your-game-repo",
      "githubUsername": "your-github-username"
    }
  ]
}
```

### Required Fields

- `slug`: Unique identifier for your game (lowercase, hyphens for spaces)
- `url`: The URL where your game is hosted
- `imagePath`: Path to your splash image (we'll add this for you)
- `title`: Your game's title
- `description`: Brief description of your game
- `xUsername`: Your X (Twitter) handle (without @ symbol)
- `xCommunityId`: Your X Community ID from Step 1
- `githubUsername`: Your GitHub username for issue notifications

### Optional Fields

- `repoUrl`: Link to your game's GitHub repository (if open source)

## Step 4: Submit a Pull Request

1. Fork the X Games repository
2. Create a new branch: `git checkout -b add-game/your-game-slug`
3. Add your splash.jpg image and update whitelist.json
4. Commit your changes:
   ```bash
   git add .
   git commit -m "Add [Your Game Name]"
   git push origin add-game/your-game-slug
   ```
5. Open a Pull Request on GitHub

## Review Process

- We'll review your PR:
  - Your X Community is properly set up with the required description
  - Your game is appropriate for all ages
  - The game loads and plays correctly
  - All required information is provided
  - The game performs well within the extension

## Need Help?

Join our [X Games community](https://x.com/i/communities/1914065447114396075).
