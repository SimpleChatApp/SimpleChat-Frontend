import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';
import { ChatRoomDetailComponent } from './components/chat-room-detail/chat-room-detail.component';
import { ChatControlsComponent } from './components/chat-controls/chat-controls.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatRoomEditComponent } from './components/chat-room-edit/chat-room-edit.component';


@NgModule({
  declarations: [ChatRoomListComponent, ChatRoomDetailComponent, ChatControlsComponent, ChatMessagesComponent, ChatRoomEditComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
