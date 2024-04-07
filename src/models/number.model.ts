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
  // Storing Every Number in an Array 
  //    numbers: number[] = []

  //    public addNumber(number: number): void {
  //      this.numbers.push(number)
  //    }

  //    public getAverage(): number {
  //      if (this.numbers.length === 0) {
  //        return 0
  //      }

  //      const sum = this.numbers.reduce((a, b) => a + b, 0)
  //      return sum / this.numbers.length
  //    }
  //  }
}

export default NumberModel
