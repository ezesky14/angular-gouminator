import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-gouminator';
  formGroup: FormGroup;
  result;
  historique = [];
  dejaCalculer = false;

  ngOnInit() {
  

  }

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      rayon: ['', [Validators.required, Validators.max(100),Validators.pattern('^[0-9_.+-]+$')]]
    })


    this.formGroup.get('rayon').valueChanges.subscribe(val => {
      this.dejaCalculer = false;
      const res = this.verifierDansHistorique(val);
      if (res.exist) {
        this.dejaCalculer = true;
        this.result = this.historique[res.position].resultat;
      }
    })


  }



  ajouterDansHistorique(rayon: number, resultat) {
    this.historique.push({ rayon: rayon, resultat: resultat });
  }

  verifierDansHistorique(rayonEntree) {
    if (this.historique.length === 0) {
      return { exist: false, position: -1 };
    } else {
      const posHistorique = this.historique.map(el => el.rayon).indexOf(rayonEntree);
      let existDansHistorique = (posHistorique !== -1);
      return { exist: existDansHistorique, position: posHistorique };
    }

  }
  submit() {
    if (!this.formGroup.invalid) {
      const r = this.formGroup.value.rayon;
      this.result = this.calculerVolumeSphere(r);
      this.ajouterDansHistorique(r, this.result);
    }

  }
  calculerVolumeSphere(rayon: number) {
    return 4 / 3 * Math.PI * Math.pow(rayon, 3);
  }


}
