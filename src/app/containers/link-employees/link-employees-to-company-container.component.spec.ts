import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEmployeesToCompanyContainerComponent } from './link-employees-to-company-container.component';

describe('LinkEmployeesToCompanyContaimnerComponent', () => {
  let component: LinkEmployeesToCompanyContainerComponent;
  let fixture: ComponentFixture<LinkEmployeesToCompanyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkEmployeesToCompanyContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkEmployeesToCompanyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
