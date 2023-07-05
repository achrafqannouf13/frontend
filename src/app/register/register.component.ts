import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordRepeat: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    if (this.password !== this.passwordRepeat) {
      this.errorMessage = 'Le mot de passe et la confirmation du mot de passe ne correspondent pas.';
      return;
    }

    this.authService.register(this.username, this.email, this.password)
      .subscribe(
        (response) => {
          // Inscription réussie, rediriger vers la page de connexion
          console.log('Inscription réussie:', response);
          // Rediriger vers la page de connexion
          this.router.navigate(['/login']);
        },
        (error) => {
          // Erreur d'inscription, afficher un message d'erreur
          console.error('Erreur d\'inscription:', error);
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
        }
      );
  }
}
