import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEmployeesToCompanyComponent } from './link-employees-to-company.component';

describe('LinkEmployeesToCompanyComponent', () => {
  let component: LinkEmployeesToCompanyComponent;
  let fixture: ComponentFixture<LinkEmployeesToCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkEmployeesToCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkEmployeesToCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
