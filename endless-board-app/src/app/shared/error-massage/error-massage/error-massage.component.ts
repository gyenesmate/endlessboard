import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-massage',
  imports: [],
  templateUrl: './error-massage.component.html',
  styleUrl: './error-massage.component.scss'
})
export class ErrorMassageComponent {
  public errorMessage: string = '';

  @Input() set message(value: string) {
    this.errorMessage = value;
  }

  
}
