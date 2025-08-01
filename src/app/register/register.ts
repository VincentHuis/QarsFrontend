import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
// import { CommonModule } from '@angular/common'; // alleen nodig als je *ngIf/NgFor gebruikt in deze template

import { KlantDto } from '../dto/KlantDto';
import { RegisterDto } from '../dto/RegisterDto';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      klant: this.fb.group({
        voornaam:       ['', Validators.required],
        achternaam:     ['', Validators.required],
        telefoonnummer: ['', [
          Validators.required,
          Validators.pattern(/^06[0-9]{8}$/)
        ]],
        email:          ['', [
          Validators.required,
          Validators.email
        ]],
        geboortedatum:  ['', Validators.required],
        password:       ['', [
          Validators.required,
          Validators.minLength(7)
        ]],
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

  hasError(controlName: string): boolean {
    const ctrl = (this.registerForm.get('klant') as FormGroup).get(controlName);
    return !!(ctrl && ctrl.touched && ctrl.invalid);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const klantGroup = this.registerForm.get('klant') as FormGroup;
    const klant: KlantDto = {
      voornaam:       klantGroup.get('voornaam')!.value,
      achternaam:     klantGroup.get('achternaam')!.value,
      telefoonnummer: klantGroup.get('telefoonnummer')!.value,
      email:          klantGroup.get('email')!.value,
      geboortedatum:  klantGroup.get('geboortedatum')!.value,
    } as any;

    const payload: RegisterDto = {
      loginNaam: klant.email,
      password:  klantGroup.get('password')!.value,
      klant
    };
    this.http.post('http://localhost:8080/auth/register', payload, { withCredentials: true })
      .subscribe({
        next: () => this.router.navigate(['/vestigingen']),
        error: err => this.serverError = err.error.error,
      });
  }//this.serverError = err.error.error
}
