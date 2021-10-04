const HotSauce = require('../models/HotSauce');
const fs = require('fs');

exports.createHotSauce = (req, res, next) => {
    const hotSauceObject = JSON.parse(req.body.hotSauce);
    delete req.body._id;
    const hotSauce = new HotSauce({
        ...hotSauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    hotSauce.save()
        .then(() => res.status(201).json({
            message: 'Sauce enregistré !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.modifyHotSauce = (req, res, next) => {
        const hotSauceObject = req.file ?
    {
      ...JSON.parse(req.body.hotSauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  HotSauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteHotSauce = (req, res, next) => {
    HotSauce.findOne({ _id: req.params.id })
    .then(hotSauce => {
      const filename = hotSauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        HotSauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneHotSauce = (req, res, next) => {
    HotSauce.findOne({
            _id: req.params.id
        })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({
            error
        }));
};

exports.getAllHotSauces = (req, res, next) => {
    HotSauce.find()
        .then(hotSauces => res.status(200).json(hotSauces))
        .catch(error => res.status(400).json({
            error
        }));
};