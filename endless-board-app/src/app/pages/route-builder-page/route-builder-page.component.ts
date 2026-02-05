import { AfterViewInit, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
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

import { ErrorMessageComponent } from '../../shared/error-message/error-message.component';

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
  @ViewChild('dynamicErrorHost', { read: ViewContainerRef }) container!: ViewContainerRef;

  private holdStateDict: Map<string, number>;
  private holdStateMap: Map<THREE.Mesh, string> = new Map();  
    
  private selectedHold: THREE.Mesh | null = null;

  public selectedState!: string;
  public states: string[];
  private selectedStart: number;
  private selectedEnd: number;

  public holdAngleValue: number;

  public wallData: Wall = {
      width: 50,
      height: 60,
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
        this.climbingWallComponent.setHoldRotation(i, Math.floor(Math.random() * (360 - 0 + 1) + 0));
        holdIDs++;
      }
    }
  }

  private setHoldState(hold: THREE.Mesh, state: string) {  
    (hold.material as THREE.MeshBasicMaterial).color.setHex(this.holdStateDict.get(state)!);  
    this.holdStateMap.set(hold, state);  
  }  

  private getHoldState(hold: THREE.Mesh): string {  
    return this.holdStateMap.get(hold) || "default-hold";  
  }  

  onHoldClicked(hold: THREE.Mesh): void {  
    if (this.selectedState === undefined) {  
      console.warn("Nothing is selected");  
      return;  
    }  

    const currentState = this.getHoldState(hold);  

    if (this.selectedState === "start-hold" && this.selectedStart < 2 && currentState !== "start-hold") {  
      this.setHoldState(hold, "start-hold");  
      this.selectedStart++;  
    } else if (this.selectedState === "hold") {  
      this.setHoldState(hold, "hold");  
    } else if (this.selectedState === "end-hold" && this.selectedEnd < 2 && currentState !== "end-hold") {  
      this.setHoldState(hold, "end-hold");  
      this.selectedEnd++;  
    } else if (this.selectedState === "default-hold") {  
      if (currentState === "start-hold") this.selectedStart--;  
      if (currentState === "end-hold") this.selectedEnd--;  
      this.setHoldState(hold, "default-hold");  
    } else if (this.selectedState === "select-hold") {  
      // Restore previous selected hold's color from map——not temporary property.  
      if (this.selectedHold && this.selectedHold !== hold) {  
        const prevState = this.getHoldState(this.selectedHold);  
        this.setHoldState(this.selectedHold, prevState === "select-hold"   
          ? (this.selectedHold as any).__preSelectState || "default-hold"  
          : prevState  
        );  
        delete (this.selectedHold as any).__preSelectState;  
      }  
      // Save pre-select state  
      (hold as any).__preSelectState = currentState;  
      this.setHoldState(hold, "select-hold");  
      this.selectedHold = hold;  
    }  

    // Deselect if user leaves select-hold mode  
    if (  
      this.selectedState !== "select-hold" &&  
      this.selectedHold &&  
      this.getHoldState(this.selectedHold) === "select-hold"  
    ) {  
      const prevState = (this.selectedHold as any).__preSelectState || "default-hold";  
      this.setHoldState(this.selectedHold, prevState);  
      delete (this.selectedHold as any).__preSelectState;  
      this.selectedHold = null;  
    }  
  }  

  radioChangeHandler(event: any) {  
    // Deselect previous blue hold and restore *true* state from central Map  
    if (this.selectedHold && this.getHoldState(this.selectedHold) === "select-hold") {  
        const prevState = (this.selectedHold as any).__preSelectState || "default-hold";  
        this.setHoldState(this.selectedHold, prevState);  
        delete (this.selectedHold as any).__preSelectState;  
        this.selectedHold = null;  
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

      // Reset any select-hold visual state just in case  
      if (this.selectedHold && this.getHoldState(this.selectedHold) === "select-hold") {  
        const prevState = (this.selectedHold as any).__preSelectState || "default-hold";  
        this.setHoldState(this.selectedHold, prevState);  
        delete (this.selectedHold as any).__preSelectState;  
        this.selectedHold = null;  
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
        holdsArray  
      ).then(routeDocID => {
        if (routeDocID) {
          this.router.navigateByUrl("/main");
        } else {
          this.showErrorMessage("Failed to save the route. Please try again.");
        }
      });  
    } else {
      this.showErrorMessage("Please fill in all route details before saving.");
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
  
  private showErrorMessage(message: string): void {
    this.container.clear();
    const errorComponentRef = this.container.createComponent(ErrorMessageComponent);
    errorComponentRef.instance.message = message;
  }
}
