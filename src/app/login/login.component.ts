import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordRepeat: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          // Connexion réussie, enregistrer le token et rediriger vers BookListComponent
          const token = response.mytoken;
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
        },
        (error) => {
          // Erreur de connexion, afficher un message d'erreur
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
        }
      );
  }
}
