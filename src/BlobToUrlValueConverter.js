export class BlobToUrlValueConverter {  
  toView(blob) {
    return URL.createObjectURL(blob);
  }
}