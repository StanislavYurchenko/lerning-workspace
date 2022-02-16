import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthComponent } from './auth.component';
import { UserService, AuthService } from '../../../../core/services';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  const fakeAuthService = {
    isAuthenticated() {
      return true
    }
  }

  const fakeUserService = {
    getUserName() {
      return 'name'
    },

    getUserId() {
      return 'name'
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ AuthComponent ],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        NgbModal,
        { provide: AuthService, useValue: fakeAuthService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
