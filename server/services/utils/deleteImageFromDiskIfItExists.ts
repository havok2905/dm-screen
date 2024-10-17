import fs from 'fs';
import path from 'path';

export const deleteImageFromDiskIfItExists = (imagePath: string) => {
  if (imagePath) {
    const fullImagePath = path.join(path.resolve(__dirname), '..', '..', '..', imagePath);

    if (fs.existsSync(fullImagePath)) {
      fs.unlinkSync(fullImagePath);
    }
  }
};
