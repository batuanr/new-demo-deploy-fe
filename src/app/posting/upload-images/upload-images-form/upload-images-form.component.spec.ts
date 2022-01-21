import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagesFormComponent } from './upload-images-form.component';

describe('UploadImagesFormComponent', () => {
  let component: UploadImagesFormComponent;
  let fixture: ComponentFixture<UploadImagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImagesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
