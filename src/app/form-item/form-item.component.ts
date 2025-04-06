import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {BaseComponent} from '../base-component';
import {Processamento} from '../../shared/models/processamento';
import {URLS} from '../../shared/urls';
import {AutofocusDirective} from '../../shared/directives/auto-focus.directive';
import {EstatisticasListComponent} from './estatisticas-list/estatisticas-list.component';
import {MatProgressBar} from '@angular/material/progress-bar';


@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    AutofocusDirective,
    EstatisticasListComponent,
    MatProgressBar,
  ],
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.css'
})
export class FormItemComponent extends BaseComponent<Processamento> implements OnInit {
  public formGroup: FormGroup;
  public object: Processamento = new Processamento();
  public content: any = null;
  public isLoading = signal(false)
  @ViewChild(EstatisticasListComponent)
  estatisticasList!: EstatisticasListComponent;


  constructor(private http: HttpClient) {
    super(http, URLS.PROCESSAMENTO)
  }


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      numero1: new FormControl('', [Validators.required]),
      numero2: new FormControl('', [Validators.required]),
      numero3: new FormControl('', [Validators.required]),
    });
  }

  public saveOrUpdate(): void {
    this.isLoading.set(true);
    if (this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(key => {
        const value = this.formGroup.getRawValue()[key];
        if (value !== null && value !== undefined) {
          this.object[key] = value;
        }
      });
      this.service.save(this.object).subscribe((response: Processamento) => {
        const id = response.id;
        this.formGroup.reset();

        const processingRow = {
          id: response.id,
          numero1: this.object.numero1,
          numero2: this.object.numero2,
          numero3: this.object.numero3,
          status: 'Processando...',
          media: null,
          mediana: null
        };
        this.estatisticasList.dataSource.push(processingRow);
        this.estatisticasList.dataSource = [...this.estatisticasList.dataSource];
        setTimeout(() => {
          this.service.getStatus(id).subscribe((statusResponse: any) => {
            const index = this.estatisticasList.dataSource.findIndex(item => item.id === id);
            if (index !== -1) {
              const old = this.estatisticasList.dataSource[index];
              this.estatisticasList.dataSource[index] = {
                ...old,
                ...statusResponse
              };

              this.estatisticasList.dataSource = [...this.estatisticasList.dataSource];
            }
            this.isLoading.set(false);
          });
        }, 2000);
      });
    }
  }
}
