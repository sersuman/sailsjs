/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    fullName: {
      type: 'string',
      required: true,
      columnName: 'full_name'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed','confirmed'],
      defaultsTo: 'unconfirmed',
      columnName: 'email_status'
    },
    emailProofToken: {
      type: 'string',
      description: 'This will be used in the account verification email',
      columnName: 'email_proof_token'
    },
    emailProofTokenExpiresAt: {
      type: 'number',
      description: 'time in millisecond representing when wil emailProofToken will expire',
      columnName: 'email_prof_token_expires_at'
    },
    password: {
      type: 'string',
      required: true
    },
    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the user\'s identity when recovering a password.',
      columnName: 'password_reset_token'
    },
    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'A timestamp representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
      columnName: 'password_reset_token_expires_at'
    }


  },
  customToJSON: function () {
    return _.omit(this, ["password"]);
  },
  beforeCreate: async function (values, proceed) {
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.password
    );
    values.password = hashedPassword;
    return proceed();
  },

};

