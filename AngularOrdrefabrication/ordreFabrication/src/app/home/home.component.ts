import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cards = [
    {
      image: 'assets/images/employes.jpg',
      title: 'Gérer les employés',
      route: '/listEmploye'
    },
    {
      image: 'assets/images/produits.jpg',
      title: 'Gérer les produits',
      text: 'Consultez ou gérez vos produits.',
      route: '/listProduit'
    },
    {
      image: 'assets/images/machine.jpg',
      title: 'Gérer les machines',
      route: '/listMachine'
    },
    {
      image: 'assets/images/ordre2.jpg',
      title: 'Gérer les ordres de fabrication',
      route: '/listOrdre'
    }
  ];
}
