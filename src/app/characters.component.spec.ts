import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CharactersComponent } from './characters.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

const TITLE = 'Rick and Morty Characters';

describe('CharactersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CharactersComponent,
      ],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatPaginatorModule,
        MatSnackBarModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CharactersComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Rick and Morty Characters'`, () => {
    const fixture = TestBed.createComponent(CharactersComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual(TITLE);
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CharactersComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1.title').textContent).toEqual(TITLE);
  });
});
