export type PlanetData = {
  id: string;
  name: string;
  color: string;
  textureUrl?: string; // Placeholder for actual textures
  visualRadius: number; // Exaggerated for visibility
  visualDistance: number; // Exaggerated distance from sun
  trueRadius: number; // Relative radius (Earth = 1)
  trueDistance: number; // Approx distance in AU
  orbitalPeriod: number; // Earth years
  rotationPeriod: number; // Earth days
  type: string;
  description: string;
  didYouKnow: string;
  facts: {
    mass: string;
    moons: number;
    avgTemp: string;
  };
  compareEarth: {
    sizeRatio: number; // Planet radius / Earth radius
    gravityRatio: number; // Planet gravity / Earth gravity
    dayLengthRatio: number; // Planet day / Earth day
  };
  timeline: { year: string; event: string }[];
};

export const RINGS_DATA = {
  saturn: { innerRadius: 2.5, outerRadius: 4.5, color: '#e6e0d3' },
  uranus: { innerRadius: 1.5, outerRadius: 2.2, color: '#c4e0e5' }
};

export const PLANETS: PlanetData[] = [
  {
    id: 'sun',
    name: 'Sun',
    color: '#ffcc00',
    visualRadius: 10,
    visualDistance: 0,
    trueRadius: 109,
    trueDistance: 0,
    orbitalPeriod: 0,
    rotationPeriod: 27,
    type: 'Yellow Dwarf Star',
    description: 'The heart of our solar system, an incredibly hot ball of glowing gases. Its gravity holds the solar system together.',
    didYouKnow: 'The Sun accounts for 99.86% of the mass in the entire solar system.',
    facts: { mass: '1.989 × 10^30 kg', moons: 0, avgTemp: '5,500 °C' },
    compareEarth: { sizeRatio: 109, gravityRatio: 28, dayLengthRatio: 27 },
    timeline: [
      { year: '1995', event: 'SOHO mission launched to study the Sun.' },
      { year: '2018', event: 'Parker Solar Probe launched to "touch" the Sun.' }
    ]
  },
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#8c8c8c',
    visualRadius: 1.2,
    visualDistance: 16,
    trueRadius: 0.38,
    trueDistance: 0.39,
    orbitalPeriod: 0.24,
    rotationPeriod: 58.6,
    type: 'Terrestrial Planet',
    description: 'The smallest planet in our solar system and closest to the Sun, Mercury is only slightly larger than Earth\'s Moon.',
    didYouKnow: 'Mercury is physically shrinking! Its iron core is cooling, causing the planet to slowly contract over billions of years.',
    facts: { mass: '3.30 × 10^23 kg', moons: 0, avgTemp: '167 °C' },
    compareEarth: { sizeRatio: 0.38, gravityRatio: 0.38, dayLengthRatio: 58.6 },
    timeline: [
      { year: '1974', event: 'Mariner 10 makes its first flyby.' },
      { year: '2004', event: 'MESSENGER spacecraft launched.' }
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#e3bb76',
    visualRadius: 2.5,
    visualDistance: 24,
    trueRadius: 0.95,
    trueDistance: 0.72,
    orbitalPeriod: 0.62,
    rotationPeriod: -243, // Retrograde
    type: 'Terrestrial Planet',
    description: 'Venus is the second planet from the Sun and our closest planetary neighbor. Its thick atmosphere traps heat in a runaway greenhouse effect.',
    didYouKnow: 'Venus spins in the opposite direction of most planets, so the Sun rises in the west and sets in the east.',
    facts: { mass: '4.87 × 10^24 kg', moons: 0, avgTemp: '464 °C' },
    compareEarth: { sizeRatio: 0.95, gravityRatio: 0.9, dayLengthRatio: 243 },
    timeline: [
      { year: '1962', event: 'Mariner 2 becomes the first successful planetary mission.' },
      { year: '1970', event: 'Venera 7 lands on Venus (first landing on another planet).' }
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#2b82c9',
    visualRadius: 2.6,
    visualDistance: 32,
    trueRadius: 1,
    trueDistance: 1,
    orbitalPeriod: 1,
    rotationPeriod: 1,
    type: 'Terrestrial Planet',
    description: 'Our home planet is the third planet from the Sun, and the only place we know of so far that\'s inhabited by living things.',
    didYouKnow: 'Earth is the only known planet to have active plate tectonics, which help regulate our climate and carbon cycle over millions of years.',
    facts: { mass: '5.97 × 10^24 kg', moons: 1, avgTemp: '15 °C' },
    compareEarth: { sizeRatio: 1, gravityRatio: 1, dayLengthRatio: 1 },
    timeline: [
      { year: '4.5B BC', event: 'Earth forms from the solar nebula.' },
      { year: '1957', event: 'Sputnik 1, the first artificial satellite, is launched.' }
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#c1440e',
    visualRadius: 1.8,
    visualDistance: 40,
    trueRadius: 0.53,
    trueDistance: 1.52,
    orbitalPeriod: 1.88,
    rotationPeriod: 1.03,
    type: 'Terrestrial Planet',
    description: 'A dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer.',
    didYouKnow: 'Mars is home to Olympus Mons, the largest volcano in the solar system, which is about three times taller than Mount Everest.',
    facts: { mass: '6.42 × 10^23 kg', moons: 2, avgTemp: '-65 °C' },
    compareEarth: { sizeRatio: 0.53, gravityRatio: 0.38, dayLengthRatio: 1.03 },
    timeline: [
      { year: '1976', event: 'Viking 1 & 2 land on the surface.' },
      { year: '2012', event: 'Curiosity rover touches down inside Gale Crater.' }
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#d39c7e',
    visualRadius: 6,
    visualDistance: 60,
    trueRadius: 11.2,
    trueDistance: 5.2,
    orbitalPeriod: 11.86,
    rotationPeriod: 0.41,
    type: 'Gas Giant',
    description: 'Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet\'s Great Red Spot is a centuries-old storm.',
    didYouKnow: 'Jupiter has a massive ocean of liquid metallic hydrogen beneath its atmosphere, giving it a magnetic field 14 times stronger than Earth\'s.',
    facts: { mass: '1.90 × 10^27 kg', moons: 95, avgTemp: '-110 °C' },
    compareEarth: { sizeRatio: 11.2, gravityRatio: 2.53, dayLengthRatio: 0.41 },
    timeline: [
      { year: '1973', event: 'Pioneer 10 flies by Jupiter.' },
      { year: '2016', event: 'Juno spacecraft arrives and begins orbiting.' }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#ead6b8',
    visualRadius: 5.2,
    visualDistance: 80,
    trueRadius: 9.45,
    trueDistance: 9.5,
    orbitalPeriod: 29.45,
    rotationPeriod: 0.44,
    type: 'Gas Giant',
    description: 'Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system.',
    didYouKnow: 'Saturn is the only planet in our solar system whose average density is less than water. If there were a bathtub big enough, Saturn would float.',
    facts: { mass: '5.68 × 10^26 kg', moons: 146, avgTemp: '-140 °C' },
    compareEarth: { sizeRatio: 9.45, gravityRatio: 1.07, dayLengthRatio: 0.44 },
    timeline: [
      { year: '1979', event: 'Pioneer 11 flies through Saturn\'s rings.' },
      { year: '2004', event: 'Cassini-Huygens becomes first to orbit Saturn.' }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#d1e7e7',
    visualRadius: 3.5,
    visualDistance: 100,
    trueRadius: 4.0,
    trueDistance: 19.2,
    orbitalPeriod: 84,
    rotationPeriod: -0.72,
    type: 'Ice Giant',
    description: 'Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes it appear to spin on its side.',
    didYouKnow: 'Uranus was the first planet discovered with the aid of a telescope, found by William Herschel in 1781.',
    facts: { mass: '8.68 × 10^25 kg', moons: 28, avgTemp: '-195 °C' },
    compareEarth: { sizeRatio: 4.0, gravityRatio: 0.89, dayLengthRatio: 0.72 },
    timeline: [
      { year: '1986', event: 'Voyager 2 conducts the only close encounter with Uranus.' },
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#3b5d9c',
    visualRadius: 3.4,
    visualDistance: 120,
    trueRadius: 3.88,
    trueDistance: 30.1,
    orbitalPeriod: 164.8,
    rotationPeriod: 0.67,
    type: 'Ice Giant',
    description: 'Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant major planet orbiting our Sun.',
    didYouKnow: 'It literally rains solid diamonds on Neptune, as intense pressure and extreme temperatures condense methane gas deep within the planet.',
    facts: { mass: '1.02 × 10^26 kg', moons: 16, avgTemp: '-200 °C' },
    compareEarth: { sizeRatio: 3.88, gravityRatio: 1.14, dayLengthRatio: 0.67 },
    timeline: [
      { year: '1846', event: 'Neptune discovered via mathematical calculations.' },
      { year: '1989', event: 'Voyager 2 becomes first and only spacecraft to visit.' }
    ]
  }
];
