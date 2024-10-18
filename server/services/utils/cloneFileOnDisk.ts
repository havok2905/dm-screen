import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface CloneFileResponse {
  newImagePath: string;
  newFullImagePath: string;
}

export const cloneFileOnDisk = (
  imagePath: string,
  fullImagePath: string
): CloneFileResponse => {
  if (fs.existsSync(fullImagePath)) {
    const originalFile = fs.readFileSync(fullImagePath);
    const fileName = path.basename(imagePath);
    const fileNameParts = imagePath.split('.');

    fileNameParts.shift();
    
    const fileNameStripped = fileNameParts.join('.');
    const newFileName = `image-${uuidv4()}.${fileNameStripped}`;
    const newImagePath = imagePath.replace(fileName, newFileName);
    const newFullImagePath = path.join(path.resolve(__dirname), '..', '..', '..', newImagePath);

    fs.writeFileSync(newFullImagePath, originalFile);

    return {
      newImagePath,
      newFullImagePath
    };
  }

  return {
    newImagePath: '',
    newFullImagePath: ''
  };
};