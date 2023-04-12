import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { LoaderService } from '@demo-admin/shared/services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [animate('1s linear', style({ opacity: 1 }))]),
      transition(':leave', [animate('1s linear', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {}
  // isLoading: Subject<boolean> = this.loaderService.isLoading;
  isLoading!: Subject<boolean>;
}
