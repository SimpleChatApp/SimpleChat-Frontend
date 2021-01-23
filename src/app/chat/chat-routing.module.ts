import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatMainComponent } from './components/chat-main/chat-main.component';
import { ChatRoomListComponent } from './components/chat-room-list/chat-room-list.component';

const routes: Routes = [
  { path: 'rooms', component: ChatRoomListComponent },
  { path: ':id', component: ChatMainComponent },
  { path: '', component: ChatMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
