import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';
import { ChatRoomDetailComponent } from './components/chat-room-detail/chat-room-detail.component';
import { ChatControlsComponent } from './components/chat-controls/chat-controls.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatRoomEditComponent } from './components/chat-room-edit/chat-room-edit.component';
import { ChatMainComponent } from './components/chat-main/chat-main.component';


@NgModule({
  declarations: [ChatRoomListComponent, ChatRoomDetailComponent, ChatControlsComponent, ChatMessagesComponent, ChatRoomEditComponent, ChatMainComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
