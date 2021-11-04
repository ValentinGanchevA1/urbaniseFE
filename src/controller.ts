import { IncomingMessage, ServerResponse } from 'http';
import { add, getAll, getById, removeById, update } from './fileOperations';
import { getDataFromRequest, getDefaultHeaders } from './utils';

export const getPropertyList = async (res: ServerResponse) => {
  const properties = await getAll();
  res.writeHead(200, getDefaultHeaders());
  res.end(JSON.stringify(properties));
};

export const getProperty = async (res: ServerResponse, id: string) => {
  try {
    const property = await getById(id);
    if (!property) {
      res.writeHead(404, getDefaultHeaders());
      res.end(JSON.stringify({ error: `Property with id: ${id} was not found` }));
    } else {
      res.writeHead(200, getDefaultHeaders());
      res.end(JSON.stringify(property))
    }
  } catch (e) {
    console.log("TEST")
    console.error(e)
  }
};

export const createProperty = async (req: IncomingMessage, res: ServerResponse) => {
  const newPropertyData = await getDataFromRequest(req)
  await add(newPropertyData);
  res.writeHead(201, getDefaultHeaders())
  res.end(JSON.stringify(newPropertyData))
}

export const updateProperty = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const property = await getById(id);
  if (!property) {
    res.writeHead(404, getDefaultHeaders());
    res.end(JSON.stringify({ error: `Property with id: ${id} was not found` }));
  } else {
    const {name, plan, units, city, region, manager} = await getDataFromRequest(req)
    const propertyDataToSave = {
      name: name || property.name,
      plan: plan || property.plan,
      units: units || property.units,
      city: city || property.city,
      region: region || property.region,
      manager: manager || property.manager,
      id
    }

    await update(propertyDataToSave);
    res.writeHead(200, getDefaultHeaders())
    res.end(JSON.stringify(propertyDataToSave));

  }
}

export const deleteProperty = async (res: ServerResponse, id: string) => {
  const property = await getById(id);
  if (!property) {
    res.writeHead(404, getDefaultHeaders());
    res.end(JSON.stringify({ error: `Property with id: ${id} was not found` }));
  } else {
    const propertiesAfterDelete = await removeById(id);
    res.writeHead(200, getDefaultHeaders())
    res.end(JSON.stringify(propertiesAfterDelete));
   }
}
