import { Component, OnInit } from '@angular/core';
import { Machine } from '../../Models/machine.model';
import { MachineService } from '../../services/machine.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent implements OnInit {

  machines: Machine[] = [];
errorMessage: any;

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.getMachines();
  }

  getMachines(): void {
    this.machineService.getAll().subscribe(data => {
      this.machines = data;
      console.log("machines liste :",data);
    });
  }
  supprimerMachine(id: number) {
    this.machineService.delete(id).subscribe({
      next: () => {
          this.getMachines();  // Refresh the employee list after deletion
          alert('machine  supprimée avec succès !');  // Display success message using alert
        },
       error: (error) => {
  if (error.status === 409) {
    this.errorMessage = error.error?.message || 'Conflit : suppression impossible.';
   // alert(this.errorMessage);
  } else {
    this.errorMessage = error.message;
    alert(`Erreur : ${this.errorMessage}`);
  }
}

  });
  }
  activerMachine(id: number | undefined): void {
    if (id === undefined) {
        console.error("ID de machine invalide");
        return;
    }

    this.machineService.activerMachine(id).subscribe({
        next: (machine) => {
            alert("Machine activée avec succès !\n"); // Afficher la machine activée
            this.getMachines();
        }
    });
}


}
