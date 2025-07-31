import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common'; // alleen nodig als je *ngIf/NgFor gebruikt in deze template

import { KlantDto } from '../dto/KlantDto';
import { RegisterDto } from '../dto/RegisterDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      klant: this.fb.group({
        voornaam:       ['', Validators.required],
        achternaam:     ['', Validators.required],
        telefoonnummer: ['', Validators.required],
        email:          ['', [Validators.required, Validators.email]],
        geboortedatum:  ['', Validators.required],
        password:       ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword:['', Validators.required],
      }, { validators: this.passwordMatchValidator })
    });
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const g = group as FormGroup;
    const pw  = g.get('password')?.value ?? '';
    const cpw = g.get('confirmPassword')?.value ?? '';

    // Optioneel: zet error op het veld zelf voor makkelijke template-validatie
    if (pw && cpw && pw !== cpw) {
      g.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      // alleen local mismatch wissen, behoud andere errors
      const ctrl = g.get('confirmPassword');
      if (ctrl?.hasError('mismatch')) {
        const { mismatch, ...rest } = ctrl.errors || {};
        ctrl.setErrors(Object.keys(rest).length ? rest : null);
      }
      return null;
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const klantGroup = this.registerForm.get('klant') as FormGroup;
    const klant: KlantDto = {
      // vul alleen wat je in je formulier hebt; adres/rijbewijs kun je later toevoegen
      voornaam:       klantGroup.get('voornaam')!.value,
      achternaam:     klantGroup.get('achternaam')!.value,
      telefoonnummer: klantGroup.get('telefoonnummer')!.value,
      email:          klantGroup.get('email')!.value,
      geboortedatum:  klantGroup.get('geboortedatum')!.value,
    } as any;

    const payload: RegisterDto = {
      loginNaam: klant.email,                           // of een eigen loginNaam-veld
      password:  klantGroup.get('password')!.value,     // nu binnen 'klant'
      klant
    };

    this.http.post('http://localhost:8080/auth/register', payload, { withCredentials: true })
      .subscribe({
        next: () => { /* success handling */ },
        error: err => console.error('Fout bij registratie:', err)
      });
  }
}
