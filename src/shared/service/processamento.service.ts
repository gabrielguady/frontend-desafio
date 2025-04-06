import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLS} from '../urls';
import {HttpOptions} from '../http/http-options';
import {Processamento} from '../models/processamento';

export class ProcessamentoService<T> {
  public fullUrl: string;

  private parameters: HttpParams = new HttpParams();

  constructor(
    public http: HttpClient,
    public path: string
  ) {
    this.fullUrl = `${URLS.BASE}${path}`;
  }

  public clearParameter(): void {
    this.parameters = new HttpParams();
  }

  public getOptions(): HttpOptions {
    const httpOptions: HttpOptions = {};
    if (this.parameters) {
      httpOptions.params = this.parameters;
    }
    return httpOptions;
  }

  public getAll(): Observable<T[]> {
    const url = this.fullUrl;
    return this.http.get<T[]>(url, this.getOptions());
  }

  public save(entity: T): Observable<T> {
    this.clearParameter();
    const url = this.fullUrl;
    return this.http.post<T>(url, entity, this.getOptions()) as Observable<T>;
  }
  getStatus(id: number | string): Observable<Processamento> {
    return this.http.get<Processamento>(`/api/processamento/${id}/status/`);
  }

}
