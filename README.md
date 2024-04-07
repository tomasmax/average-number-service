# TS-Node-Express average number service

A TypeScript-based Node.js application using the Express.js framework. The application is designed to fetch random numbers from an external API and provide an endpoint to get the average of these numbers.

## Structure

The application is structured like this:

- **Controllers**: These handle incoming HTTP requests and send responses. See [`IndexController`](src/controllers/index.controller.ts) and [`NumbersController`](src/controllers/numbers.controller.ts).

- **Services**: These contain the business logic of the application. See [`NumbersService`](src/services/numbers.service.ts).

- **Routes**: These define the application's endpoints. See [`IndexRoute`](src/routes/index.route.ts) and [`NumbersRoute`](src/routes/numbers.route.ts).

- **Middlewares**: These handle error processing and other intermediate functions. See [`errorMiddleware`](src/middlewares/error.middleware.ts).

- **Models**: These define the structure of the data. See [`NumberModel`](src/models/number.model.ts).

**To run it locally:**

- Install dependencies `npm install`
- Run for dev (watches for any files changes) `npm run dev`
- Go to http://localhost:3000/ or http://localhost:3000/numbers/average
- Run build from dist `npm run start`

**To run tests**

- After dependencies are installed
- Run tests `npm run test`
- Run tests watching for changes `npm run test:watch`

## Design Decisions, Trade-offs, and Assumptions

### Design Decisions

- **Singleton Pattern**: I used the singleton pattern for `NumbersService` to ensure that only one instance of the service exists throughout the application. This helps in maintaining a single source of truth for the fetched numbers.

- **Continuous Fetching**: The service starts fetching numbers as soon as its instance is created and continues to do so every second. To handle this I used `setInterval` js native function.

### Trade-offs

- **Singleton Pattern**: While the singleton pattern ensures a single source of truth, it can make testing more difficult as state is shared across tests. I managed it cleaning the instance before and after every test.

- **Memory vs Freshness of Data**: By continuously fetching numbers, we ensure that the data is always fresh. However, this comes at the cost of increased memory usage as the list of numbers grows over time. To handle this I used:

#### Storing sum and count (Current Approach)

**Pros:**

- Memory Efficiency: This approach only stores two numbers regardless of how many numbers are added, which is very memory efficient.
- Performance: The average can be calculated in constant time (O(1)), which is very fast.

**Cons:**

- Lack of Data: This approach doesn't store the individual numbers, so you can't retrieve them later or perform other calculations (like median or mode) that require the individual numbers.

#### Storing Every Number in an Array

**Pros:**

- Data Availability: This approach stores all the numbers, so you can retrieve them later or perform other calculations that require the individual numbers.

**Cons:**

- Memory Usage: This approach can use a lot of memory if many numbers are added, as every number is stored.
- Performance: Calculating the average requires summing all the numbers and then dividing by the count, which takes linear time (O(n)), where n is the number of numbers. This is slower than the current approach, especially when there are many numbers.

In conclusion, the best approach depends on the specific requirements. For this use case as we only need to calculate the average and could be dealing with a large number of numbers, the current approach is likely the best. In case we need to perform other calculations or retrieve the individual numbers, the best would be to store all the numbers in an array.

I added the Storing Every Number in an Array approach as a comment in the number model.
