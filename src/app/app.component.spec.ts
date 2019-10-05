import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  //let fixture: ComponentFixture<MypopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'angular-gouminator'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('angular-gouminator');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('angular-gouminator app is running!');
  // });


  it(`Verifie que le calcul du volume fonctionne bien`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let calculerVolumeSphere = app.calculerVolumeSphere(33);
    expect(calculerVolumeSphere).toBeTruthy();
  });



  it(`Verifie que la validation est impossible lorsque le champ rayon est vide : `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.formGroup.patchValue({rayon:undefined});
    expect(app.formGroup.invalid).toBe(true);    
  });

  it(`Verifie que la validation est impossible lorsque le rayon est superieur à 100 : `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.formGroup.patchValue({rayon:1000});
    expect(app.formGroup.invalid).toBe(true);
    
  });

  it(`Verifie que la validation est impossible lorsque le rayon entré est une chaine decaractère : `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.formGroup.patchValue({rayon:'100dd'});
    expect(app.formGroup.invalid).toBe(true);
    
  });



  it(`Verifie que le resultat est affiché lorsque la validation est bonne `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.formGroup.patchValue({rayon:54});
    app.submit();
    expect(app.result).toBeTruthy();
    
  });


  it(`Verifie que le cache ajoute les informations de calculs lorsque la validation est bonne  `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.formGroup.patchValue({rayon:10});
    app.submit();
    expect(app.historique.length).toBeGreaterThan(0);
  });



  it(`Verifie que si l'utilisateur saisit le même rayon, la réponse est renvoyée d'un cache au lieu de la calculer `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.formGroup.patchValue({rayon:10});
    app.submit();

    const resToVerify= app.result;
    app.formGroup.patchValue({rayon:15});
    app.submit();
    app.formGroup.patchValue({rayon:10});
    expect(app.result).toEqual(resToVerify);
  });
});
