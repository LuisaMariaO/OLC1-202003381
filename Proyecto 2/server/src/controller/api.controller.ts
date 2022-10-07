import * as health from './health/ping'
import * as parser from './parser/parser'

export default{
    ...health, //Spread operator, para importar todos los endpoints
    ... parser
}