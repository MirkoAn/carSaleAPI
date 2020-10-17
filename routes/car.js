const mongoose = require('mongoose');
const express = require('express');
const Car = require('../models/car');
const Role = require('../helper/role');
const authorize = require('../middleware/role');
const auth = require('../middleware/auth');
const {Company} = require('../models/company');
const router = express.Router();
const { check, validationResult } = require('express-validator');


router.get('/', [auth, authorize([Role.Admin])], async (req, res) => {
    const cars = await Car
        .find()
    res.send(cars)
})

router.get('/:id', async (req, res) => {
    const car = await Car.findById(req.params.id)
    if(!car) return res.status(404).send('Id not found')
    res.send(car)
})

//POST Modelo de Datos Embebido

router.post('/', [
  check('year').isLength({min: 3}),
  check('model').isLength({min: 3})
],  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const company = await Company.findById(req.body.companyId)
    if(!company) return  res.status(400).send('No tenemos ese fabricante')

    const car = new Car({
      company: company,
      model: req.body.model,
      year: req.body.year,
      sold: req.body.sold,
      price: req.body.price,
      extras: req.body.extras
  }) 

  const result = await car.save()
  res.status(201).send(result)
})


//POST Para modelo de datos normalizado
/*
router.post('/', [
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})
],  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const car = new Car({
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price,
        extras: req.body.extras
    }) 

    const result = await car.save()
    res.status(201).send(result)
})
*/
router.put('/:id', [
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})
],  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const car = await Car.findByIdAndUpdate(req.params.id, {
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price,
        extras: req.body.extras
      }, {
          new: true
      })

      if (!car) {
        return res.status(404).send('El coche con ese ID no está.')
      }

    res.status(204).send()
})

router.delete('/:id', async (req, res) => {

    const car = await Car.findByIdAndDelete(req.params.id)

      if (!car) {
        return res.status(404).send('El coche con ese ID no está, por ende no procede la eliminación')
          
      }

      res.status(200).send('Coche eliminado')
    
})

module.exports = router