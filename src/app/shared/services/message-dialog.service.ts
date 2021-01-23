import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  private options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    timeOut: 5000,
    tapToDismiss: true,
    maxOpened: 5,
    autoDismiss: true,
    resetTimeoutOnDuplicate: true
  };

  // https://www.npmjs.com/package/ngx-toastr
  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, content: string): void{
    this.toastr.success(content, title, this.options);
  }

  showError(title: string, content: string): void{
    this.toastr.error(content, title, this.options);
  }

  showWarning(title: string, content: string): void{
    this.toastr.warning(content, title, this.options);
  }

  showInfo(title: string, content: string): void{
    this.toastr.info(content, title, this.options);
  }
}
