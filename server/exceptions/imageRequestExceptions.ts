export class ImageRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The image request body is not valid');
  }
}

export class ImageResourceNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'An associated image could not be found to upload an image to.');
  }
}
