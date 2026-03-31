# mcoli-ui CLI

CLI tool for initializing and adding mcoli-ui components to your project.

## Installation

```bash
npx mcoli-ui@latest
```

## Usage

### Initialize a theme

```bash
npx mcoli-ui init
# or with a specific theme
npx mcoli-ui init primary
```

Available themes:

- `primary` - Professional and modern (Blue Primary with Purple Secondary)
- `secondary` - Creative and bold (Purple Secondary with Blue Primary)
- `game-dev` - Fun and energetic (Pink Primary with Yellow accents)
- `robotics` - Technical and precise (Blue Primary with Accent Blue)
- `it` - Clean and professional (Green Primary with Gray accents)

### Add components

```bash
npx mcoli-ui add mc-button
# or multiple components
npx mcoli-ui add mc-button mc-input
```

### List available components

```bash
npx mcoli-ui list
```

## Requirements

- [shadcn/ui](https://ui.shadcn.com) must be initialized in your project first:

```bash
npx shadcn@latest init
```

## Environment Variables

- `MCOLI_UI_REGISTRY_URL` - Custom registry URL (default: `https://mcoli-ui.microclub.info`)

## License

MIT
