import { Router } from 'express'
import NumbersController from '@controllers/numbers.controller'
import { Routes } from '@interfaces/routes.interface'

class NumbersRoute implements Routes {
  public path = '/numbers'
  public router = Router()
  public numbersController = new NumbersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/average`, this.numbersController.getNumbersAverage)
  }
}

export default NumbersRoute
