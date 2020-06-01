import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-sign-in',
  template: `
    <div class="field">
      <label class="label" for="provider">
        auth provider
      </label>
      <select [(ngModel)]="selectedProvider" class="select" name="provider">
        <option *ngFor="let p of providers" [value]="p">{{ p }}</option>
      </select>
    </div>
  `,
})
export class AuthSignInComponent {
  @Input() providers: string[];
  @Input() selectedProvider: string;
  @Output() providerSelected = new EventEmitter<string>();
}
