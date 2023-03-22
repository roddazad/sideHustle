const db = require('../config/connection');
const { User, Income } = require('../models');
const userSeeds = require('./userSeeds.json');
const IncomeSeeds = require('./incomeSeeds.json');

db.once('open', async () => {
  try {
    await Income.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < incomeSeeds.length; i++) {
      const { text, amount } = await Income.create(incomeSeeds[i]);
      const user = await User.findOneAndUpdate(
        { income: text },
        {
          $addToSet: {
            income: text,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
