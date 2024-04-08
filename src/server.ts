import App from '@/app'
import IndexRoute from '@routes/index.route'
import NumbersRoute from './routes/numbers.route'

const app = new App([new IndexRoute(), new NumbersRoute()])

const server = app.listen()
app.onExit(server)
