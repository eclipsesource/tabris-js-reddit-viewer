import {shared} from "tabris-decorators";
import {ActionDispatcher} from "./Action";
import {Init} from "../actions/Init";

@shared
export class App extends ActionDispatcher {

  constructor() {
    super();
    console.info('---------------------');
    this.dispatch(Init)
  }

}
