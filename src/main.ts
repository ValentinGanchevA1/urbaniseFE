import { createServer, request, RequestListener } from 'http';
import { getProperty, getPropertyList, createProperty, updateProperty, deleteProperty } from './controller';
import { getDefaultHeaders, getOptionsHeaders } from './utils';

process.on('beforeExit', () => {
  console.log('We are about to exit the program')
})

process.on('exit', () => {
  console.log('We will exit the program now!')
})

process.on('uncaughtException', (e) => {
  console.error('This should have been handled somewhere');
  console.error(e)
  process.exit(-1);
})

const requestListener: RequestListener  = async(req, res) => {
  if(req.url === '/properties' && req.method === 'GET') {
    return await getPropertyList(res);
  } else if (req.url.match(/\properties\/\w+/)  && req.method === 'GET') {
    const id = req.url.split('/')[2]
    return await getProperty(res, id)
  } else if(req.url.match('/properties') && req.method === 'POST') {
    return await createProperty(req, res)
  } else if (req.url.match(/\properties\/\w+/)  && req.method === 'PATCH') {
    const id = req.url.split('/')[2]
    return await updateProperty(req, res, id);

  } if (req.url.match(/\properties\/\w+/)  && req.method === 'DELETE') {
    const id = req.url.split('/')[2]
    return await deleteProperty(res, id)

  
  } if(req.method === 'OPTIONS') {
    res.writeHead(200, {...getDefaultHeaders(), ...getOptionsHeaders()});
    res.end()

  } else {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({error: 'page not found'}))
  }

}

                                    //port 
createServer(requestListener).listen(8080);




