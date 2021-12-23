import { HttpException, HttpStatus } from '@nestjs/common';

import { ERRORS_POST } from '../../../common/constants/errors';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: ERRORS_POST.FILE_FORMAT,
        },
        HttpStatus.FORBIDDEN,
      ),
      false,
    );
  }
  callback(null, true);
};
