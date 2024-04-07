import axios from 'axios'
import NumberModel from '@/models/number.model'

export const API_URL = 'https://csrng.net/csrng/csrng.php?min=0&max=100'

class NumbersService {
  private static instance: NumbersService
  private numberModel = new NumberModel()
  private intervalId: NodeJS.Timeout | null = null

  constructor() {
    this.startFetchingNumbers()
  }

  public static getInstance(): NumbersService {
    if (!NumbersService.instance) {
      NumbersService.instance = new NumbersService()
    }
    return NumbersService.instance
  }

  public static clearInstance() {
    if (NumbersService.instance) {
      NumbersService.instance.stopFetchingNumbers()
      NumbersService.instance = null
    }
  }

  private async fetchNumber(): Promise<number> {
    const response = await axios.get(API_URL)
    if (!response) {
      throw new Error('Failed to fetch number: response is undefined')
    }
    const number = response.data?.[0]?.random
    console.log('[NumbersService] Fetched random number:', number)
    return number
  }

  private startFetchingNumbers() {
    if (this.intervalId) {
      return
    }
    this.intervalId = setInterval(async () => {
      try {
        const number = await this.fetchNumber()
        typeof number === 'number' && this.numberModel.addNumber(number)
      } catch (error) {
        console.error('[NumbersService] Error fetching random number:', error)
      }
    }, 1000)
  }

  public getNumbersAverage() {
    return this.numberModel.getAverage()
  }

  public stopFetchingNumbers() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}

export default NumbersService
