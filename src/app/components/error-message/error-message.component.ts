import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: string | null = null;
  displayError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.errorMessage) {
      this.displayError = true;
      setTimeout(() => {
        this.displayError = false;
      }, 3000);
    }
  }
}
