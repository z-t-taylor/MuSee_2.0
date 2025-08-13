# MuSee 🖼️

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

MuSee is a virtual exhibition builder that lets you explore and curate artwork from two of the world’s leading museum collections, The Metropolitan Museum of Art and Art Institute of Chicago. Discover, collect, and organise pieces into your own themed exhibitions, all from your browser.

- [You can find the original live version of MuSee here while I'm still working on the 2.0 iteration.](https://musee-gules.vercel.app/)
- Or follow the installation instructions below to see the code in action.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Artwork Discovery**
  - Browse thousands of artworks from The Met and Art Institute Chicago
  - Explore in-depth artwork profiles with artist bios, medium details, and cultural significance
- **Exhibition Curation**
  - Create and manage custom exhibitions
  - Save and organise artwork selections
  - Filter through and search for artworks or themes
- **Responsive and Accessible Design**
  - Optimised for desktop and mobile viewing
- **Museum Integration**
  - Direct access to museum collection information
  - Public API integration with:
    - [Art Institute of Chicago API](https://www.artic.edu/open-access)
    - [The Met Collection API](https://metmuseum.github.io)

## Tech Stack

**Frontend**

- ⚛️ React 18 + TypeScript
- 🌐 [NextJS](https://nextjs.org)
- 🎨 Tailwind CSS
- 🧱 Material UI

**Testing & Tooling**

- Jest
- Vitest
- ESLint
- TypeScript

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/z-t-taylor/MuSee_2.0.git
cd MuSee
npm install
npm run dev
```

### Testing

To run tests

```bash
npm run test:vitest
```

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## Acknowledgements

- [Art Institute of Chicago](https://www.artic.edu/open-access) for their open access API
- [The Metropolitan Museum of Art](https://metmuseum.github.io) for their public collection data
- React community for amazing open-source tools

Created by [Zoe Taylor](https://github.com/z-t-taylor)
