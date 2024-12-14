import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  
  providedIn: 'root',
  
  
})
export class ToastService {
  constructor(private messageService: MessageService) {}
  show(type:string, message:string) {
    this.messageService.add({
      severity: type, 
      detail:message,
      life: 3000,
    });
    console.log('hellow');
    
  }
}
