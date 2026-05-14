const express = require('express');
const router = express.Router();
const Medico = require('../modelos/Medico');

// GET, POST, PUT, DELETE (puedes copiar la lógica que ya hiciste para pacientes)
router.get('/', async (req, res) => {
    const medicos = await Medico.findAll();
    res.json(medicos);
});

router.post('/', async (req, res) => {
    const nuevo = await Medico.create(req.body);
    res.json(nuevo);
});

router.put('/:id', async (req, res) => {
    await Medico.update(req.body, { where: { id_medico: req.params.id } });
    res.json({ message: 'Médico actualizado' });
});

router.delete('/:id', async (req, res) => {
    await Medico.destroy({ where: { id_medico: req.params.id } });
    res.json({ message: 'Médico eliminado' });
});

module.exports = router;