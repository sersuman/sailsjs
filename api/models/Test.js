/**
 * Test.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
      maxLength: 30,
    },
    body: {
      type: 'string',
      required: true,
      maxLength: 100,
    },
    users:{
      collection: 'user'
    }
  },

};
sails.config.models.migrate='drop';


