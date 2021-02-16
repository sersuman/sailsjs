module.exports = {


  friendlyName: 'Forgot password',


  description: '',


  inputs: {
    email: {
      description: "The email address of the user who wants to recover their password.",
      example: "sumanshrestha670@gmail.com",
      type: "string",
      required: true,
    },
  },


  exits: {
    success: {
      description: "Email matched a user and a recovery email is sent",
    }
  },


  fn: async function (inputs, exits) {

    try {
      var user = await User.findOne({ email: inputs.email });
      if (!user) {
        return;
      }
      const token = await sails.helpers.strings.random("url-friendly");
      
      await User.update({ id: user.id }).set({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
      })

      const recoveryLink = `${sails.config.custom.baseUrl}/user/reset-password?token=${token}`

      const email = {
        to: user.emailAddress,
        subject: "Reset Password",
        template: "forgot-password",
        context:{
          name: user.fullName, 
          recoverLink: recoveryLink
        },
      };

      try {
        await sails.helpers.sendMail(email); 
      } catch (error) {
        sails.log(error);
      }

      return exits.success({
        message: `A reset password email has been sent to ${user.email}`,
        recoverLink: recoveryLink,
        token,
      });
    } catch (error){
      sails.log(error);
    }

  }


};
