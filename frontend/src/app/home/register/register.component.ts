import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontaPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;
  constructor(
    private _userServices: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }
  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
    } else {
      this._userServices.registerUser(this.registerData).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.token);
          this._router.navigate(['/saveTask']);
          this.message = 'Succesfull user registration';
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
    }
  }
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontaPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarSuccesfull'],
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontaPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarError'],
    });
  }

  ngOnInit(): void {}
}
