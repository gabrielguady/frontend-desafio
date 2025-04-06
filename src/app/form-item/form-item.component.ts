import {Component, OnInit} from '@angular/core';
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
  ],
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.css'
})
export class FormItemComponent extends BaseComponent<Processamento> implements OnInit {
  public formGroup: FormGroup;
  public object: Processamento = new Processamento();


  constructor(private http: HttpClient) {
    super(http,URLS.PROCESSAMENTO)
  }


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      numero1: new FormControl('', [Validators.required]),
      numero2: new FormControl('', [Validators.required]),
      numero3: new FormControl('', [Validators.required]),
    });
  }

  public saveOrUpdate(): void {
    if (this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(key => {
        const value = this.formGroup.getRawValue()[key];
        if (value !== null && value !== undefined) {
          this.object[key] = value;
        }
      });
      this.service.save(this.object).subscribe((response: Processamento ) => {
        console.log(response);
        this.formGroup.reset();

      })
    }
  }
}
