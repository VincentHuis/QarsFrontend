import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login';
import { LoginService } from './login.service';
import { AuthService } from '../service/AuthService';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSvc: jasmine.SpyObj<LoginService>;
  let authSvc: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    loginSvc = jasmine.createSpyObj('LoginService', ['login']);
    authSvc  = jasmine.createSpyObj('AuthService',  ['saveToken']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        LoginComponent
      ],
      providers: [
        { provide: LoginService, useValue: loginSvc },
        { provide: AuthService,  useValue: authSvc  }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('moet component en formulier initialiseren', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm.valid).toBeFalse();
  });

  it('onSubmit logt in en navigeert bij succes', fakeAsync(() => {
    loginSvc.login.and.returnValue(Promise.resolve('test'));
    component.loginForm.setValue({ username: 'u', password: 'p' });

    component.onSubmit();
    tick();

    expect(loginSvc.login).toHaveBeenCalledWith('u', 'p');
    expect(authSvc.saveToken).toHaveBeenCalledWith('test');
  }));
});
