'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    //change name column to allowNUll: false in user table
    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    })
    //change password minimum length to 8
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password must be at least 8 characters"
        }
      }
    })
    // //add description column to item table
    // await queryInterface.addColumn('Items', 'description', {
    //   type: Sequelize.STRING,
    //   allowNull: true
    // })
    // //add category column to item table
    // await queryInterface.addColumn('Items', 'category', {
    //   type: Sequelize.STRING,
    //   allowNull: false
    // })

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.changeColumn('Users', 'name', {})

    //down change column
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
