import {readFile,  writeFile, appendFile} from 'fs/promises'

export interface Property {
  name: string;
  plan: number;
  units: number;
  city: number;
  region: number;
  manager: number;
  id:  string;
}

export const getAll = async(): Promise<Property[]> => {
  const buffer = await readFile('./propertyList.json', {
    encoding: 'utf-8'
  })

  return JSON.parse(buffer)
}

export const getById  =  async(id:string):Promise<Property> =>{
  const propertyList =  await getAll();
  const property = propertyList.find(property => property.id === id);
  if(property){
    return  property
  }
}  

export const add = async (property: Property) => {
  const propertiesList =  await getAll();

  await writeFile('./propertyList.json', JSON.stringify([...propertiesList, property]))
}

export const removeById =  async (id: string) => {
  const propertiesList = await getAll();
  const properties = propertiesList.filter(property  => property.id !== id);
  await writeFile('./propertyList.json', JSON.stringify(properties))
  return properties
}

export const update = async(property: Partial<Property>) => {
  if(!property.id) {
    throw new Error('You need to pass an id!')
  }
  const propertyToUpdate = await getById(property.id);
  const updatedProperty =  {...propertyToUpdate, ...property}
  await  removeById(property.id);
  await add(updatedProperty);
}