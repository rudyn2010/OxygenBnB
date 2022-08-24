'use strict';

const Spots = [
  {
    ownerId: 3,
    address: '636 6th Street',
    city: 'San Francisco',
    state: 'California',
    country: 'USA',
    lat: 42.99,
    lng: 20.31,
    name: 'Our Apartment',
    description: 'An apartment complex in SOMA',
    price: 220
  },
  {
    ownerId: 1,
    address: '12 Aaron Rodgers Way',
    city: 'Green Bay',
    state: 'Wisconsin',
    country: 'USA',
    lat: 69.99,
    lng: 52.11,
    name: 'Lambo Field',
    description: 'Grassy and open area',
    price: 345
  },
  {
    ownerId: 4,
    address: '1715 Spruce Street',
    city: 'Berkeley',
    state: 'California',
    country: 'USA',
    lat: 89.72,
    lng: 32.0,
    name: 'Trap House',
    description: 'A destination for partying and trapping',
    price: 5
  },
  {
    ownerId: 7,
    address: '1313 Disneyland Drive',
    city: 'Anaheim',
    state: 'California',
    country: 'USA',
    lat: 34.78,
    lng: 63.25,
    name: 'Disneyland Resort',
    description: 'The happiest place on Earth',
    price: 789
  },
  {
    ownerId: 5,
    address: '123 Anime Street',
    city: 'San Diego',
    state: 'California',
    country: 'USA',
    lat: 50.11,
    lng: 23.45,
    name: 'Comic Condo',
    description: 'Weebs have a safe space here',
    price: 123
  },
  {
    ownerId: 2,
    address: '321 Bean Street',
    city: 'Chicago',
    state: 'Illinois',
    country: 'USA',
    lat: 42.99,
    lng: 20.31,
    name: 'The Bean',
    description: 'A giant metal bean you can sleep under',
    price: 10
  },
  {
    ownerId: 6,
    address: '845 S Wall Maria',
    city: 'Shiganshina',
    state: 'District',
    country: 'Japan',
    lat: 42,
    lng: 20,
    name: 'The Cottage',
    description: 'A nice and cozy little cottage',
    price: 25
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', Spots)
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
    await queryInterface.bulkDelete('Spots', Spots, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
