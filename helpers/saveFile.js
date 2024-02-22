import fs from 'fs'

const filePath = './db/data.json';

export const saveDB = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

/**
 * 
 * @returns {Array<Object<string, any>>}
 */
export const readDB = () => {
  if (!fs.existsSync(filePath)) {
    return null
  }

  const rawData = fs.readFileSync(filePath, { encoding: 'utf-8' });

  return JSON.parse(rawData);

}