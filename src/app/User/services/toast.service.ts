import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  
  providedIn: 'root',
  
  
})
export class ToastService {
  constructor(private messageService: MessageService) {}
  showToast(type:string, message:string) {
    this.messageService.add({
      severity: type, 
      detail:message,
      life: 3000,
    }); 
  }
}
