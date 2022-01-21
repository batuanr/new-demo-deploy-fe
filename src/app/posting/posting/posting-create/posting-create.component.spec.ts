import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingCreateComponent } from './posting-create.component';

describe('PostingCreateComponent', () => {
  let component: PostingCreateComponent;
  let fixture: ComponentFixture<PostingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostingCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
