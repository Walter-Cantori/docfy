const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin.njk');
  },

  signup(req, res) {
    return res.render('auth/signup.njk');
  },

  async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.redirect('back');
      }

      const bcryptPassword = await bcrypt.hash(password, 5);
      await User.create({ name, email, password: bcryptPassword });
      req.flash('success', 'úsuario cadastrado com sucesso');
      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },

  async authenticate(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        req.flash('error', 'úsuario inexistente');
        return res.redirect('back');
      }

      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'senha incorreta');
        return res.redirect('back');
      }

      req.session.user = user;

      return req.session.save(() => {
        res.redirect('/app/dashboard');
      });
    } catch (err) {
      return next(err);
    }
  },

  signout(req, res) {
    return req.session.destroy(() => res.redirect('/'));
  },
};
