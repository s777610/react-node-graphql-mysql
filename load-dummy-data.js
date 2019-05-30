const { sequelize } = require("./models/db");
const models = require("./models");

const createData = async () => {
  await models.User.create(
    {
      name: "Tamas",
      cars: [
        {
          make: "Mercedes",
          model: "A250",
          color: "black"
        }
      ]
    },
    {
      include: [models.Car]
    }
  );

  await models.User.create(
    {
      name: "Steven",
      cars: [
        {
          make: "Fiat",
          model: "500",
          color: "Yellow"
        },
        {
          make: "Ford",
          model: "Focus",
          color: "White"
        }
      ]
    },
    {
      include: [models.Car]
    }
  );
};

sequelize.sync({ force: true }).then(async () => {
  try {
    await createData();

    process.exit();
  } catch (error) {
    console.error(error);
  }
});
