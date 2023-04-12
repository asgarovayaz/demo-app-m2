import { TranslocoModule } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';
import { ContentPipe } from './pipes/content.pipe';
import { ParagraphPipe } from './pipes/paragraph.pipe';

@NgModule({
  declarations: [
    SafePipe,
    ContentPipe,
    ParagraphPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
  ],
  exports: [
    SafePipe,
    ContentPipe,
    ParagraphPipe,
  ],
})
export class SharedModule {}
