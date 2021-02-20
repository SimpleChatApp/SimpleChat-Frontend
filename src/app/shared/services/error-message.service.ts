import { Injectable } from '@angular/core';
import * as data from 'src/assets/resources/en.json';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() {
  }
  //map et
  //sigeloton yap
  //filter ile cek

  public getByName(name: string): string{
    if (name) {
      // const values = JsonObject(data);

      // if (data.hasOwnProperty(name)) {
      //   return '';//data[name] as string;
      // } else {
      //   return '';
      // }
      return '';
    } else {
      return '';
      // log an error to the senty
    }
  }
}
