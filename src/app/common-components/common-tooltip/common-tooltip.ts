import { Component, input } from '@angular/core';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-common-tooltip',
  imports: [MatTooltipModule],
  templateUrl: './common-tooltip.html',
  styleUrl: './common-tooltip.scss',
})
export class CommonTooltip {
  readonly message = input<string>('');
  readonly position = input<TooltipPosition>('above');
  readonly showDelay = input<number>(500);
  readonly hideDelay = input<number>(150);
}
