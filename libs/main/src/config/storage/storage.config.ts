import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const pdfFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(
      new BadRequestException('Only PDF files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const generateFileName = (req, file, callback) => {
  const name = req.user ? req.user.id : file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Date.now();
  callback(null, `${name}@${randomName}${fileExtName}`);
};

export const storage = (path) =>
  diskStorage({
    destination: `${process.env.UPLOAD_LOCATION}${path}`,
    filename: generateFileName,
  });

export const multerOptions = (path, type = 'image') => {
  let fileFilter = imageFileFilter;
  let fileSize = +process.env.MAX_FILE_SIZE;

  if (type === 'pdf') {
    fileFilter = pdfFileFilter;
    fileSize = Infinity;
  }

  return {
    limits: {
      fileSize: fileSize,
    },

    fileFilter: fileFilter,

    storage: storage(path),
  };
};
