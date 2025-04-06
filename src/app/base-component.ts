import {ProcessamentoService} from '../shared/service/processamento.service';
import {HttpClient} from '@angular/common/http';

export class BaseComponent<T> {
  public  service: ProcessamentoService<T>;
  constructor(http: HttpClient, url: string) {
    this.service = new ProcessamentoService<T>(http, url);
  }
}
