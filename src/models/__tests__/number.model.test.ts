import NumberModel from '@/models/number.model'

describe('NumberModel', () => {
  let numberModel: NumberModel

  beforeEach(() => {
    numberModel = new NumberModel()
  })

  afterEach(() => {
    numberModel = null
  })

  it('should add a number to the sum and increment the count', () => {
    const number = 42
    numberModel.addNumber(number)

    expect(numberModel.sum).toBe(number)
    expect(numberModel.count).toBe(1)
  })

  it('should calculate the average correctly', () => {
    numberModel.addNumber(10)
    numberModel.addNumber(20)
    numberModel.addNumber(30)

    const average = numberModel.getAverage()

    expect(average).toBe(20)
  })

  it('should return 0 as the average when no numbers have been added', () => {
    const average = numberModel.getAverage()

    expect(average).toBe(0)
  })
})
