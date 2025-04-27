import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Wall } from '../wall';

@Component({
  selector: 'app-climbing-wall',
  imports: [],
  templateUrl: './climbing-wall.component.html',
  styleUrl: './climbing-wall.component.scss'
})
export class ClimbingWallComponent implements AfterViewInit, OnDestroy {
  @Input() wall!: Wall;
  @Input() routeID!: string;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;

  private canvasHeight!: number;
  private canvasWidth!: number;

  @ViewChild('container') container!: ElementRef;
  
  constructor(
    private elRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
    window.addEventListener("resize", this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
    window.removeEventListener('resize', this.onResize);
  }

  private initThree(): void {    
    /* TODO: make the #container height and width changeable */
    this.canvasHeight = this.container.nativeElement.clientHeight;
    this.canvasWidth = this.container.nativeElement.clientWidth;
  
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    const aspect = this.canvasWidth / this.canvasHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.z = 50;


    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    // Wall background
    const wallGeometry = new THREE.PlaneGeometry(this.wall.width, this.wall.height);
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    this.scene.add(wallMesh);

    // Add holds
    /* TODO: make the hold displaying compatible with the Wall obj */
    const rows = 8;
    const cols = 6;
    let holdIDs = 0;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const posX = (this.wall.width / (cols + 1)) * (j + 1) - (this.wall.width/2);
        const posY = (this.wall.height / (rows + 1)) * (i + 1) - (this.wall.height/2);
        this.addHold(0, posX, posY, ""+this.routeID+holdIDs);
        holdIDs++;
      }
    }

    // Checking for the right amount of the holds from the db fetch
    /* if (this.wall.holds.length === rows*cols) {
      
    } else {
      
    } */
    
      
    // Lighting (optional for better look)
    const light = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(light);
  }

  private addHold(angle: number, pozX: number, pozY: number, name: string): void {
    const baseSize = Math.min(this.wall.width, this.wall.height) * 0.04; // 5% of smaller wall side
    const shape = new THREE.Shape();
    shape.moveTo(0, baseSize*0.1);
    shape.lineTo(-baseSize, -baseSize);
    shape.lineTo(baseSize, -baseSize);
    shape.lineTo(0, baseSize*0.1);
  
    const geometry = new THREE.ShapeGeometry(shape);
    geometry.center();
    const material = new THREE.MeshBasicMaterial({ color: 0x964B00 });
    const holdMesh = new THREE.Mesh(geometry, material);

    holdMesh.position.set(pozX, pozY, 0);

    holdMesh.rotation.z = THREE.MathUtils.degToRad(angle);

    holdMesh.name = name;

    this.scene.add(holdMesh);    
  }

  public holdRotation(ID: number, angle: number): void {
    let obj = this.scene.getObjectByName(""+this.routeID+ID);
    if (obj !== undefined) {
      obj.rotation.z = THREE.MathUtils.degToRad(angle);
    }
  } 

  public getHold(ID: number): any {
    return this.scene.getObjectByName(""+this.routeID+ID);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  private onResize = (): void => {
    if (this.container && this.camera && this.renderer) {
      const width = this.container.nativeElement.clientWidth;
      const height = this.container.nativeElement.clientHeight;
      
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
      console.log(this.getHold(1));
    }
  }
}
