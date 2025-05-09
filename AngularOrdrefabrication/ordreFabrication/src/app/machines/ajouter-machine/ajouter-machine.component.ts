import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-machine',
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-machine.component.html',
  styleUrl: './ajouter-machine.component.css'
})
export class AjouterMachineComponent implements OnInit {
  nouvelleMachine= {
    codeMachine: '',
  designation: '',
  typeMachine: '',
  etat: '',
  dateDebutMaintenance: '',
  dateFinMaintenance: '',
  etatMaintenance:''
  };

  errorMessage = '';


  constructor(private machineService: MachineService, private router: Router) {}

  ngOnInit(): void {}

  ajouterMachine() {
     // Vérification que tous les champs sont remplis
     if (!this.nouvelleMachine.codeMachine || !this.nouvelleMachine.designation || !this.nouvelleMachine.typeMachine ) {
    this.errorMessage = "Tous les champs doivent être remplis.";
    return; // Empêche l'envoi du formulaire
  }
    console.log("machine: ",this.nouvelleMachine);
    this.machineService.create(this.nouvelleMachine).subscribe({
      next: () => {
        alert('Machine ajoutée avec succès');
       // this.nouvelMachine = { nom: '', prenom: '', email: '', poste: '' }; // réinitialise le formulaire
        this.router.navigate(['/listMachine']);
      },
      error: (err) => {
       alert("Erreur lors de l'ajout de la machine :  codeMachine existe déjà" );
      }
    });
  }
}
