const { Project, Document } = require('../models');

module.exports = {
  async new(req, res, next) {
    try {
      const { title } = req.body;
      const project = await Project.create({
        UserId: req.session.user.id,
        title,
      });

      req.flash('success', 'Projeto criado com sucesso!');
      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    let document = null;

    try {
      const [project, documents] = await Promise.all([
        Project.findById(req.params.id),
        Document.findAll({ where: { ProjectId: req.params.id } }),
      ]);

      const activeDoc = req.query.activeDoc || (documents[0] && documents[0].title) || null;

      if (activeDoc) {
        document = await Document.findOne({ where: { title: activeDoc } });
      }

      return res.render('project/show', {
        user: req.session.user,
        project,
        documents,
        activeDoc,
        document,
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Projeto deletado com sucesso');

      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
