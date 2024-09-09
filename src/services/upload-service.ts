import path from 'path';
import fs from 'fs';

// const UPLOAD_DIR = path.resolve(process.env.FILE_DIR_UPLOAD ?? 'public/', 'uploads/');
const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH_UPLOAD_FILE ?? '', 'uploads/');

console.log(UPLOAD_DIR);

export const uploadFile = async (file: File): Promise<{ success: boolean; message: string }> => {
  try {
    if (!file) {
      return { success: false, message: 'No file provided.' };
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, message: 'Invalid file type.' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const filePath = path.resolve(UPLOAD_DIR, file.name);

    fs.writeFileSync(filePath, buffer);

    return { success: true, message: 'File uploaded successfully.' };
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, message: 'Error uploading file.' };
  }
};
