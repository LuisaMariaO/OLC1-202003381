import controller from '../controller/api.controller'
import express from 'express'

const router = express.Router();

router.get("/ping", controller.ping) //Todo está dentro de controller
router.post("/parse", controller.parse)

export default router;