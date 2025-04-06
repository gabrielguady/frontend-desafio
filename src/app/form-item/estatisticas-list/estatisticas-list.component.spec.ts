import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasListComponent } from './estatisticas-list.component';

describe('EstatisticasListComponent', () => {
  let component: EstatisticasListComponent;
  let fixture: ComponentFixture<EstatisticasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatisticasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatisticasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
