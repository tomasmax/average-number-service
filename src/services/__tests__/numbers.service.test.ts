import axios from 'axios'
import NumbersService, { API_URL } from '@/services/numbers.service'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('NumbersService', () => {
  let numbersService: NumbersService

  beforeEach(() => {
    jest.useFakeTimers()
    numbersService = NumbersService.getInstance()
  })

  afterEach(() => {
    NumbersService.clearInstance()
    numbersService = null
    jest.useRealTimers()
  })

  it('should call random number API after 1 second', async () => {
    const number = 50
    mockedAxios.get.mockResolvedValueOnce({ data: [{ random: number }] })

    jest.advanceTimersByTime(1000)

    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should start fetching numbers every second', () => {
    const numbers = [50, 60, 70]
    mockedAxios.get.mockResolvedValueOnce({ data: [{ random: numbers[0] }] })
    mockedAxios.get.mockResolvedValueOnce({ data: [{ random: numbers[1] }] })
    mockedAxios.get.mockResolvedValueOnce({ data: [{ random: numbers[2] }] })

    jest.advanceTimersByTime(999)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(1000)
    expect(mockedAxios.get).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(1000)
    expect(mockedAxios.get).toHaveBeenCalledTimes(3)
  })
})
