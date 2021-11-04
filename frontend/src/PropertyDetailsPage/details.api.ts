import { AxiosResponse } from "axios";
import Api from "../common/api"
import { Property } from "../common/types";

const getProperty = async(propertyId: string): Promise<Property> => {

  const {data} = await Api.get<Property>(`/properties/${propertyId}`)
  return data;
}

const updateProperty = async (property: Property): Promise<Property> => {
  const { data } = await Api.patch<Property, Property>(`/properties/${property.id}`, property);
  return data
}

const createProperty = async (property: Property): Promise<Property> => {
  const { data } = await Api.post<Property, Property>(`/properties/${property.id}`, property);
  return data;
}

const deleteProperty = async (propertyId: string) => {
  const {data} = await Api.delete<Property[]>(`/properties/${propertyId}`);
  return data
}

export {
  getProperty,
  updateProperty,
  createProperty,
  deleteProperty
}