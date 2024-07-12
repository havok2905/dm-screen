'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentTime = new Date(new Date().toUTCString()).toISOString();

    await queryInterface.bulkInsert('Initiatives', [
      {
        id: '213ab6dc-aa75-486f-b991-4df439bc8d59',
        adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
        createdat: currentTime,
        updatedat: currentTime,
        initiativeOrderState: JSON.stringify({
          currentId: 'cdc7cec0-d726-47f6-b08c-2b90787a97a8',
          items: [
            {
              'entityId': 'dcc17f12-c9ce-4529-994d-dd705e5e5fab',
              'entityType': 'creature',
              'id': 'fef4d6b5-14d2-44bc-a790-2f95a21943ed',
              'imageSrc': '/token-playful-kitten.png',
              'name': 'Playful Kitten',
              'resourceA': 15,
              'resourceB': 25,
              'sortValue': 20,
              'visibilityState': 'on'
            },
            {
              'entityId': 'fb0d4fdf-be16-4866-a876-d501efbb2f57',
              'entityType': 'creature',
              'id': 'cdc7cec0-d726-47f6-b08c-2b90787a97a8',
              'imageSrc': '/token-the-embroidermancer.png',
              'name': 'The Embroidermncer',
              'resourceA': 12,
              'resourceB': 60,
              'sortValue': 19,
              'visibilityState': 'on'
            },
            {
              'entityId': 'dcc17f12-c9ce-4529-994d-dd705e5e5fab',
              'entityType': 'creature',
              'id': 'd18ca643-f744-4acd-83ec-e29f37e2addd',
              'imageSrc': '/token-playful-kitten.png',
              'name': 'Playful Kitten',
              'resourceA': 15,
              'resourceB': 25,
              'sortValue': 18,
              'visibilityState': 'on'
            },
            {
              'entityId': '1c230cd3-eab1-40ea-9ac4-32e39b108e6a',
              'entityType': 'creature',
              'id': '07240536-b0d0-4584-9cc0-8fef72547bca',
              'imageSrc': '/token-sock-puppet.png',
              'name': 'Spectral Sock Puppet',
              'resourceA': 13,
              'resourceB': 40,
              'sortValue': 8,
              'visibilityState': 'removed'
            },
            {
              'entityId': '1c230cd3-eab1-40ea-9ac4-32e39b108e6a',
              'entityType': 'creature',
              'id': 'ca04b3c2-f768-474f-aeda-7b88b1b6a491',
              'imageSrc': '/token-sock-puppet.png',
              'name': 'Spectral Sock Puppet',
              'resourceA': 13,
              'resourceB': 40,
              'sortValue': 5,
              'visibilityState': 'hidden'
            }
          ],
          round: 1
        })
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Initiative', null, {});
  }
};
