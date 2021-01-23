import { AfterContentInit, Component } from '@angular/core';
import { MessageDialogService } from './shared/services/message-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {

  constructor(private msg: MessageDialogService) {
  }

  ngAfterContentInit(): void{
  }
}
