import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SwUpdate } from '@angular/service-worker';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private swUpdate = inject(SwUpdate);

  /* Egy feliratkozó object, mely a felíratkozásért felelős */
  private subscription: Subscription | undefined;
  /* Callback-ek, melyeket a listener meghív, ha az adott esemény bekövekezik */
  private offlineCallback!: ()=>void;
  private onlineCallback!: ()=>void;

  public ngOnInit(): void {
    /*
     * 3000 ms-enként megnézzzük, hogy van-e új verzió a service workerből
     * ha van, akkor jelezzük a felhasználónak, majd újra töltjük az oldalt
     */
    this.subscription = interval(3000).subscribe(()=> {
      this.swUpdate.checkForUpdate().then(update => {
        if(update){
          alert("New version is available!");
          window.location.reload();
        }
      })
    })

    /* Létrehozunk listenerek, melyek detektálják az online/offline állapotot */
    this.offlineCallback = ()=> console.log('offline');
    window.addEventListener('offline', this.offlineCallback );
    this.onlineCallback = ()=> console.log('online');
    window.addEventListener('online', this.onlineCallback );
  }

  public ngOnDestroy(): void {
    /* Megszüntetjük a felíratkozásunkat, ezzel a kibocsájtó (interval) leáll */
    this.subscription?.unsubscribe();
    /*
     * Töröljük a listenereket, hogy a callback ne hívódjon meg ha újabb esemény érkezne.
     * Mivel egy adott eseményre több callbacket is rendelhetünk, ezért azokat is meg kell adni.
     */
    window.removeEventListener('offline', this.offlineCallback);
    window.removeEventListener('online', this.onlineCallback);
  }
}
