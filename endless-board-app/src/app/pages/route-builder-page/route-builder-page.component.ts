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
import { Router } from '@angular/router';

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
    
  private selectedHold: THREE.Mesh | null = null;

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
    private routeManagmentService: RouteManagmentService,
    private readonly router: Router
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
  /* onHoldClicked(hold: THREE.Mesh): void {
    if (this.selectedState !== undefined) {
      if (this.selectedState === "start-hold" && this.selectedStart < 2) {
        (hold.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
        this.selectedStart++;
      } else if (this.selectedState === "hold") {
        (hold.material as THREE.MeshBasicMaterial).color.setHex(0xFFFF00);
      } else if (this.selectedState === "end-hold" && this.selectedEnd < 2) {
        (hold.material as THREE.MeshBasicMaterial).color.setHex(0x00FF00);
        this.selectedEnd++;
      } else if (this.selectedState === "default-hold") {
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
  } */

  onHoldClicked(hold: THREE.Mesh): void {  
  // Helper to get color by state  
  const colorOfState = (state: string) => this.holdStateDict.get(state)!;  
  // Helper to set hold mesh color by state  
  const setHoldColor = (hold: THREE.Mesh, state: string) =>  
    ((hold.material as THREE.MeshBasicMaterial).color.setHex(colorOfState(state)));  

  // Find hold state based on current color  
  const getCurrentHoldState = (hold: THREE.Mesh) => {  
    const colorHex = (hold.material as THREE.MeshBasicMaterial).color.getHex();  
    for (const [state, hex] of this.holdStateDict) {  
      if (hex === colorHex) return state;  
    }  
    return "default-hold";  
  };  

  if (this.selectedState !== undefined) {  
    const currentState = getCurrentHoldState(hold);  

    if (this.selectedState === "start-hold" && this.selectedStart < 2) {  
      setHoldColor(hold, "start-hold");  
      this.selectedStart++;  
    } else if (this.selectedState === "hold") {  
      setHoldColor(hold, "hold");  
    } else if (this.selectedState === "end-hold" && this.selectedEnd < 2) {  
      setHoldColor(hold, "end-hold");  
      this.selectedEnd++;  
    } else if (this.selectedState === "default-hold") {  
      if (currentState === "start-hold") {  
        this.selectedStart--;  
      } else if (currentState === "end-hold") {  
        this.selectedEnd--;  
      }  
      setHoldColor(hold, "default-hold");  
    } else if (this.selectedState === "select-hold") {  
      // Restore previous hold's color state, if any  
      if (this.selectedHold && this.selectedHold !== hold) {  
        const prevState = (this.selectedHold as any).__previousState || "default-hold";  
        setHoldColor(this.selectedHold, prevState);  
        delete (this.selectedHold as any).__previousState; // Cleanup  
      }  
      // Store current state before changing color  
      (hold as any).__previousState = currentState;  
      setHoldColor(hold, "select-hold");  
      this.selectedHold = hold; // Update reference to currently selected hold  
    }  

    // Deselect if user changes state and last selected hold was a select-hold (but only do this outside select-hold state)  
    if (  
      this.selectedState !== "select-hold" &&  
      this.selectedHold &&  
      getCurrentHoldState(this.selectedHold) === "select-hold"  
    ) {  
      const prevState = (this.selectedHold as any).__previousState || "default-hold";  
      setHoldColor(this.selectedHold, prevState);  
      delete (this.selectedHold as any).__previousState;  
      this.selectedHold = null;  
    }  
  } else {  
    console.warn("Nothing is selected");  
  }  
}

  radioChangeHandler(event: any) {
    if (this.selectedHold !== null) {  
      const colorHex = (this.selectedHold.material as THREE.MeshBasicMaterial).color.getHex();  
      const selectHoldHex = this.holdStateDict.get("select-hold");  
      if (colorHex === selectHoldHex) {  
        // Restore previous state if present, otherwise fallback to default  
        const prevState = (this.selectedHold as any).__previousState || "default-hold";  
        (this.selectedHold.material as THREE.MeshBasicMaterial).color.setHex(this.holdStateDict.get(prevState)!);  
        delete (this.selectedHold as any).__previousState; // Clean up  
      }  
    } 

    this.selectedState = event.target.value;
  }

  sliderChangeHandler(event: any) {
    this.holdAngleValue = event.target.value;
    if (this.selectedState === "select-hold" && this.selectedHold !== null) {
      this.selectedHold.rotation.z = THREE.MathUtils.degToRad(this.holdAngleValue);
    }
  }

  saveBoulder(): void {
    if (this.routeCreatingForm.valid) {
      let meshHolds = this.climbingWallComponent.getAllMeshHolds();

      if (this.selectedHold !== null) {  
        const colorHex = (this.selectedHold.material as THREE.MeshBasicMaterial).color.getHex();  
        const selectHoldHex = this.holdStateDict.get("select-hold");  
        if (colorHex === selectHoldHex) {  
          // Restore previous state if present, otherwise fallback to default  
          const prevState = (this.selectedHold as any).__previousState || "default-hold";  
          (this.selectedHold.material as THREE.MeshBasicMaterial).color.setHex(this.holdStateDict.get(prevState)!);  
          delete (this.selectedHold as any).__previousState; // Clean up  
        }  
      } 

      const holdsArray = meshHolds.map(mesh => {  
        const colorHex = (mesh.material as THREE.MeshBasicMaterial).color.getHex();  
        const state = this.getHoldStateFromColor(colorHex, this.holdStateDict);  

        return {  
          posID: Number(mesh.name.slice(this.routeID.length)),  
          angle: THREE.MathUtils.radToDeg(mesh.rotation.z),  
          state: state  
        };  
      });  

      this.routeManagmentService.createRouteInDB(  
        this.routeCreatingForm.value["routeTitle"],  
        this.routeCreatingForm.value["routeDescription"],  
        this.routeCreatingForm.value["routeGrade"],  
        this.wallData.width,  
        this.wallData.height,  
        holdsArray  
      ).then(routeDocID => {
        if (routeDocID) {
          this.router.navigateByUrl("/main");
        } else {
          console.warn("Route couldt be added");
        }
      });  
    } else {
      alert("Something is wrong");
    }
  }

  getHoldStateFromColor(colorHex: number, holdStateDict: Map<string, number>): string {  
    for (const [state, hex] of holdStateDict.entries()) {  
      if (hex === colorHex) {  
        return state;  
      }  
    }  
    return "default-hold"; // fallback if no match found  
  }  
}
