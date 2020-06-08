const data = require('../shared/hero-data');

module.exports = async function (context, req) {
  const id = parseInt(req.params.id, 10);

  try {
    const hero = data.getHeroById(id);
    context.res.status(200).json(hero);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
