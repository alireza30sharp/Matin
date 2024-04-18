import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { OverflowType } from '@share/types/overflow.type';
import { GeneralHeaderComponent } from 'src/app/share/components/organisms';

@Component({
  selector: 'app-general-panel',
  templateUrl: './general-panel.component.html',
  styleUrls: ['./general-panel.component.scss'],
})
export class GeneralPanelComponent extends GeneralHeaderComponent {
  @Input() height?: string;
  @Input() overflow?: OverflowType;
  @Input() contentOverflow?: OverflowType;

  @ContentChild('header', { static: false })
  header?: TemplateRef<any>;

  @ContentChild('footer', { static: false })
  footer?: TemplateRef<any>;
}
