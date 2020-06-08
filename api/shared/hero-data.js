const data = {
  heroes: [
    {
      id: 10,
      name: 'Mary Poppins',
      description: 'practically perfect in every way',
      quotes: [
        {
          id: 1,
          quote: 'supercalifragilisticexpealidicious',
        },
        {
          id: 2,
          quote: 'spit spot',
        },
      ],
    },
    {
      id: 11,
      name: 'Bert',
      description: 'Chimney sweep, sidewalk chalk artist, lamp lighter, and unsung hero',
    },
    {
      id: 12,
      name: 'George W. Banks',
      description: 'Works at Dawes Tomes Mousley Grubbs Fidelity Fiduciary Bank',
    },
    {
      id: 13,
      name: 'Winnifred Banks',
      description: "Active in the Women's Votes suffragette movement",
    },
    {
      id: 14,
      name: 'Katie Nanna',
      description: 'Way underappreciated',
    },
    {
      id: 15,
      name: 'Admiral Boom',
      description: 'Fires canon. We need more of him',
    },
    {
      id: 16,
      name: 'Uncle Albert',
      description: 'He loves to laugh ...',
    },
  ],
};

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const addHero = (hero) => {
  hero.id = getRandomInt();
  data.heroes.push(hero);
  return hero;
};

const updateHero = (hero) => {
  const index = data.heroes.findIndex((v) => v.id === hero.id);
  console.log(hero);
  data.heroes.splice(index, 1, hero);
  return hero;
};

const deleteHero = (id) => {
  const value = parseInt(id, 10);
  data.heroes = data.heroes.filter((v) => v.id !== value);
  return true;
};

const getHeroes = () => {
  return data.heroes;
};

const getHeroById = (id) => {
  const index = data.heroes.findIndex((h) => id === h.id);
  return data.heroes[index];
};

module.exports = { addHero, updateHero, deleteHero, getHeroes, getHeroById };
