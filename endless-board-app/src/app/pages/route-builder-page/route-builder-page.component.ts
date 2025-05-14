import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ClimbingWallComponent } from '../../shared/climbing-wall/climbing-wall.component';
import { Wall } from '../../shared/wall';
import * as THREE from 'three';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouteManagmentService } from '../../services/route-managment.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-route-builder-page',
  imports: [
    CommonModule,
    ClimbingWallComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './route-builder-page.component.html',
  styleUrl: './route-builder-page.component.scss'
})
export class RouteBuilderPageComponent {

  public readonly routeCreatingForm: FormGroup;

  private holdStateDict: Map<string, number>;
    
  private selectedHold!: THREE.Mesh;
  private previouslySelectedHold!: THREE.Mesh;

  public selectedState!: string;
  public states: string[];
  private selectedStart: number;
  private selectedEnd: number;

  public holdAngleValue: number;

  public wallData: Wall = {
      width: 40,
      height: 50,
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private routeManagmentService: RouteManagmentService
  ) {
    this.holdStateDict = new Map ([
      ["start-hold", 0xff0000],
      ["hold", 0xFFFF00],
      ["end-hold", 0x00FF00],
      ["default-hold", 0x964B00],
      ["select-hold", 0x0000FF]
    ]);
    this.states = Array.from(this.holdStateDict.keys());
    this.selectedStart = 0;
    this.selectedEnd = 0;
    this.holdAngleValue = 0;

    this.routeCreatingForm = this.formBuilder.group({
      routeTitle: ["", Validators.required],
      routeDescription: ["", Validators.required],
      routeGrade: ["", Validators.required]
    })
  }

  public routeID: string = "routeHold";

  @ViewChild(ClimbingWallComponent)
  climbingWallComponent!: ClimbingWallComponent; 

  public randomRouteBuilder(): void {
    let holdIDs = 0;
    if (this.climbingWallComponent) {
      for (let i = 0; i <= 48; i++) {
        this.climbingWallComponent.holdRotation(i, Math.floor(Math.random() * (360 - 0 + 1) + 0));
        holdIDs++;
      }
    }
  }

  // TODO: Adjust the holdStateDict map for storing the hold
  onHoldClicked(hold: THREE.Mesh): void {
    if (this.selectedState !== undefined) {
      if (this.selectedState === "start-hold" && this.selectedStart < 2) {
        (hold.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
        this.selectedStart++;
      } else if (this.selectedState === "hold") {
        (hold.material as THREE.MeshBasicMaterial).color.setHex(0xFFFF00);
      } else if (this.selectedState === "end-hold" && this.selectedEnd < 2) {
        (hold.material as THREE.MeshBasicMaterial).color.setHex(0x00FF00);
        this.selectedEnd++;
      } else if (this.selectedState === "delete-hold") {
        if ((hold.material as THREE.MeshBasicMaterial).color.getHex() === this.holdStateDict.get("start-hold")) {
          this.selectedStart--;
        } else if ((hold.material as THREE.MeshBasicMaterial).color.getHex() === this.holdStateDict.get("end-hold")) {
          this.selectedEnd--;
        }        
        (hold.material as THREE.MeshBasicMaterial).color.setHex(0x964B00);
      } else if (this.selectedState === "select-hold") {
        this.previouslySelectedHold = this.selectedHold;
        this.selectedHold = hold;
        
        if (this.previouslySelectedHold) {
          (this.previouslySelectedHold.material as THREE.MeshBasicMaterial).color.setHex(0x964B00);
        }
        if (this.selectedHold) {
          (this.selectedHold.material as THREE.MeshBasicMaterial).color.setHex(0x0000FF);
        }
      }
      if (this.selectedState !== "select-hold" && (this.selectedHold.material as THREE.MeshBasicMaterial).color.getHex() === this.holdStateDict.get("select-hold")) {
        this.previouslySelectedHold = this.selectedHold;
        (this.previouslySelectedHold.material as THREE.MeshBasicMaterial).color.setHex(0x964B00);
      }
    } else {
      // TODO: alert nothing is selected
      console.warn("Nothing is selected");
    }
  }

  radioChangeHandler(event: any) {
    this.selectedState = event.target.value;
  }

  sliderChangeHandler(event: any) {
    this.holdAngleValue = event.target.value;
    if (this.selectedState === "select-hold") {
      this.selectedHold.rotation.z = THREE.MathUtils.degToRad(this.holdAngleValue);
    }
  }

  saveBoulder(): void {
    /* if (this.routeCreatingForm.valid) {
      let meshHolds = this.climbingWallComponent.getAllMeshHolds();

      if ((this.selectedHold.material as THREE.MeshBasicMaterial).color.getHex() === this.holdStateDict.get("select-hold")) {
        (this.selectedHold.material as THREE.MeshBasicMaterial).color.setHex(0x964B00);
      }

      this.routeManagmentService.createRouteInDB(
        this.routeCreatingForm.value["routeTitle"],
        this.routeCreatingForm.value["routeDescription"],
        this.routeCreatingForm.value["routeGrade"],
        this.wallData.width,
        this.wallData.height
      ).then(routeID => {
        if (routeID) {
          for (let i = 0; i < meshHolds.length; i++) {
            let holdState = "default-hold";
            for (let state in this.holdStateDict.keys()) {
              if (this.holdStateDict.get(state) === (meshHolds[i].material  as THREE.MeshBasicMaterial).color.getHex()) {
                holdState = state;
              }
            }
            console.info("Mesh of hold: " + meshHolds[i]);
            console.info("Hold state: " + holdState);
            
            this.routeManagmentService.createHoldInDB(
              routeID,
              Number(meshHolds[i].name.charAt(meshHolds[i].name.length - 1)),
              THREE.MathUtils.radToDeg(meshHolds[i].rotation.z),
              holdState
            )
          }
        }
      })
    } else {
      alert("Something is wrong");
    } */
  }
}
