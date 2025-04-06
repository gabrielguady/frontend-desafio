import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {Processamento} from '../../../shared/models/processamento';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {ProcessamentoService} from '../../../shared/service/processamento.service';

@Component({
  selector: 'app-estatisticas-list',
  imports: [
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
  ],
  templateUrl: './estatisticas-list.component.html',
  standalone: true,
  styleUrl: './estatisticas-list.component.css'
})
export class EstatisticasListComponent implements OnInit {
  public dataSource: Processamento[] = [];
  public displayedColumns = ['id', 'numeros', 'status', 'media', 'mediana'];
  private service: ProcessamentoService<Processamento>

  constructor(private http: HttpClient) {
    this.service = new ProcessamentoService<Processamento>(http, URLS.DATA_SOURCE)
  }

  ngOnInit(): void {
    this.search()
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.getAll().subscribe({
      next: (data: Processamento[]) => {
        this.dataSource = data;
        console.log('Processamento loaded: ', data);
      },
      error: (error) => {
        console.error('error loading Processamento: ', error);
      }
    });
  }

}
