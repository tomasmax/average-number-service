import axios from 'axios'
import request from 'supertest'
import App from '@/app'
import NumbersRoute from '@/routes/numbers.route'
import NumbersService from '@/services/numbers.service'

jest.mock('axios')

let app: App
let numbersRoute: NumbersRoute
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>

beforeAll(() => {
  jest.useFakeTimers()
})

beforeEach(async () => {
  jest.useFakeTimers()
  numbersRoute = new NumbersRoute()
  app = new App([numbersRoute])
  NumbersService.getInstance()
})

afterEach(() => {
  NumbersService.clearInstance()
  jest.useRealTimers()
})

describe('Testing Numbers Controller', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      return request(app.getServer()).get(`${numbersRoute.path}/average`).expect(200)
    })

    it('should return the average of the fetched numbers after 1 number', async () => {
      mockAxiosGet.mockResolvedValue({
        data: [
          {
            status: 'success',
            min: 0,
            max: 100,
            random: 50,
          },
        ],
      })
      jest.advanceTimersByTime(1000) // Wait for at least one number to be fetched
      const response = await request(app.getServer()).get(`${numbersRoute.path}/average`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ average: 50 })
    })

    it('should return the average of the fetched numbers after 3 numbers', async () => {
      mockAxiosGet
        .mockResolvedValueOnce({
          data: [
            {
              status: 'success',
              min: 0,
              max: 100,
              random: 50,
            },
          ],
        })
        .mockResolvedValueOnce({
          data: [
            {
              status: 'success',
              min: 0,
              max: 100,
              random: 60,
            },
          ],
        })
        .mockResolvedValueOnce({
          data: [
            {
              status: 'success',
              min: 0,
              max: 100,
              random: 70,
            },
          ],
        })
      jest.advanceTimersByTime(3100) // Wait for at least 3 number to be fetched

      const response = await request(app.getServer()).get(`${numbersRoute.path}/average`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ average: 60 })
    })
  })
})
