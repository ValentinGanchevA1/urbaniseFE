import { IncomingMessage } from "http";
import { Property } from './fileOperations';

export const getDataFromRequest = (req: IncomingMessage):Promise<Property> => new Promise((resolve, reject) => {

  try {
    let body = '';

    req.on('data', (dataPart) => {
      body += dataPart.toString()
    })

    req.on('end', () => {
      console.log(body)
      resolve(JSON.parse(body) as Property)
    })


  } catch (err) {
    reject(err)
  }
})

export const getDefaultHeaders = () => (
  { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
)

export const getOptionsHeaders = () => ({
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*'
})