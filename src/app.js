import {
  inject
} from 'aurelia-framework';
import {
  HttpClient
} from 'aurelia-fetch-client';
// import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class App {
  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('http://localhost:3000/');
      //   config.withBaseUrl('http://localhost:3010/');
    });
    this.http = http;
    this.upmess = ''
  }

  submit(images) {
    let formData = new FormData();
    // let images = file
    for (let i = 0; i < images.length; i++) {
      formData.append('file', images[i]);
    }
    console.log(formData, 'formData')
    // this.http.fetch('message', {
    // this uses policy
    // upload uses just a controller  
    this.http.fetch('upload', {
        mode: 'cors',
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message)
        this.upmess = data.message
        console.log('this.upmess', this.upmess)
      })
      .catch(error => console.log(error));


  }

  // submitWithHttp(images) {
  //     let formData = new FormData();
  //
  //     for (let i = 0; i < images.length; i++) {
  //         formData.append('images', images[i]);
  //     }
  //
  //     this.http.post('attachments', formData)
  //         .then(data => console.log(data))
  //         .catch(error => console.log(error));
  // }
}
