import Api from "../common/api"
import { Property } from "../common/types";

const getPropertiesList = async () => {
  const response = await Api.get<Property[]>('/properties');
  return response.data;
}

export { getPropertiesList };