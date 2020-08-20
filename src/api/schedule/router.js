import express from 'express';
import Controller from './controller';
import model from './model';
import hgBrasil from './tool/hgBrazilWeather'
const PATH = '/schedule';

const router = express.Router();

const controller = Controller.getController(model, hgBrasil);
router.get('/', controller.scheduleAll);
router.post('/', controller.saveSchedule);
router.post('/search', controller.searchSchedule);
router.get('/:id', controller.getSchedule);
router.put('/:id', controller.updateSchedule);
router.delete('/:id', controller.deleteSchedule);

module.exports = { path: PATH, router };
