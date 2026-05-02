# Solar System Odyssey

An interactive 3D orrery built with React, Three.js (React Three Fiber), and Tailwind CSS. Explore our cosmic neighborhood through stunning visuals and discover bite-sized bite-size facts about the planets.

## Features

- **Interactive 3D Engine**: Navigate smoothly through a 3D simulation of our solar system.
- **Dynamic Camera**: Smooth camera transitions automatically lock onto a planet when selected.
- **Educational Quick Facts**: Discover info about mass, moons, average temperatures, and more.
- **"Did You Know?"**: Unique and interesting factoids for every massive body.
- **Earth Comparisons**: Compare other planets visually against Earth (size, gravity, day length).
- **Timeline of Exploration**: View historic NASA/ESA missions and milestones for each planet.
- **Scale Modes**: Toggle between an aesthetically pleasing *Visual Scale* and a scientifically accurate *True Scale* to comprehend the vastness of space.

## Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) and [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tooling**: [Vite](https://vitejs.dev/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Structure

- `/src/components/Scene.tsx`: Contains the Three.js canvas setup, lighting, and planetary meshes.
- `/src/components/OverlayUI.tsx`: The translucent, animated UI layer overlaying the 3D canvas.
- `/src/data/planets.ts`: The static dataset powering the orrery and fact panels.

## Customization

To use real high-resolution planetary textures instead of solid colors:
1. Obtain planet texture maps (e.g., from Solar System Scope).
2. Save them to the `public/` directory.
3. Update the `textureUrl` fields in `/src/data/planets.ts`.
4. Modify the `PlanetMesh` component in `Scene.tsx` to use `useTexture` hooks.
