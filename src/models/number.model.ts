import { Number } from '@/interfaces/number.interface'

class NumberModel implements Number {
  sum: number = 0
  count: number = 0

  public addNumber(number: number): void {
    this.sum += number
    this.count++
  }

  public getAverage(): number {
    return this.count ? this.sum / this.count : 0
  }
}

export default NumberModel
