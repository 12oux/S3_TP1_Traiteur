let Admin = require('../models/Admin.js');

module.exports = function(adminPassport, Strategy) {

    adminPassport.serializeUser(function(user, done) {
      done(null, user);
    });

    adminPassport.deserializeUser(function(user, done) {
      done(null, user);
    });

  
    adminPassport.use(new Strategy({

    },
    async function(email, password, done) {
        let user = await Admin.findOne(
            { where: {
                email: email
              }
            });
          if (user == null) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          if (!user.password == password) { // !!!!! VRAIMENT PAS SECURITAIRE!!!!!!!! IL FAUT AJOUTER DE L'ENCRYPTION !!!!!
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
    }));
}
