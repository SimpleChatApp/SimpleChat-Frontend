import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  private options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    timeOut: 5000,
    tapToDismiss: true,
    maxOpened: 5,
    autoDismiss: true,
    resetTimeoutOnDuplicate: true
  }

  constructor() { }

  showSuccess(title: string, content: string) {
    // this.toastr.success(content, title, this.options);
  }

  showError(title: string, content: string) {
    // this.toastr.error(content, title, this.options);
  }

  showWarning(title: string, content: string) {
    // this.toastr.warning(content, title, this.options);
  }

  showInfo(title: string, content: string) {
    // this.toastr.info(content, title, this.options);
  }
}
