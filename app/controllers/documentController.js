const { Document } = require('../models');

module.exports = {
  async destroy(req, res, next) {
    try {
      await Document.destroy({ where: { id: req.params.documentId } });

      req.flash('success', 'Documento apagado com sucesso');
      res.redirect(`/app/projects/${req.params.projectId}`);
    } catch (err) {
      next(err);
    }
  },

  async store(req, res, next) {
    const { title, content } = req.body;
    try {
      const document = await Document.create({ title, content, ProjectId: req.params.projectId });

      req.flash('success', 'Documento criado com sucesso');
      res.redirect(`/app/projects/${req.params.projectId}?activeDoc=${document.title}`);
    } catch (err) {
      next(err);
    }
  },
};
