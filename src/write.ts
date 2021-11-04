import { writeFile } from 'fs/promises';

export const write = async (propertyTitle: string) => {
  await writeFile('./list.txt', propertyTitle)
}