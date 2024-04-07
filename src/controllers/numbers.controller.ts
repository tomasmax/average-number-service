import NumbersService from '@/services/numbers.service'
import { NextFunction, Request, Response } from 'express'

class NumbersController {
  private numbersService = NumbersService.getInstance()

  public getNumbersAverage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const average: number = await this.numbersService.getNumbersAverage()

      res.status(200).json({ average })
    } catch (error) {
      next(error)
    }
  }
}

export default NumbersController
