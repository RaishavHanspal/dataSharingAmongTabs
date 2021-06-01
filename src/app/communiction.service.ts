import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public credentials : EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  //WINDOWPOST API
  setWindowPost(obj){
    const _window = window;
    _window.postMessage(obj, 'https://raishavhanspal.github.io/');
  }
  getWindowPost(){
    //works when tabs are open; doesn't work on new tabs.
    const _window = window;
    _window.onmessage = (ev) => {
      if(ev.data){
      this.credentials.emit(ev.data);
      }
    }
  }

  //CACHESTORAGE
  setCacheData(obj){
    caches.open('login').then((cache) => {
      cache.put(new Request('credentials'), new Response(JSON.stringify(obj),{ "status" : 200 , "headers":{ "Cache-control": "max-age=10"}}));
    });
  }
  getCacheData(){
    //Works amongst tabs;
    caches.open('login').then( cache => {
     cache.match("credentials").then(res => res.json()).then(res => {
      this.credentials.emit(res);
      }).catch(err => {});
    });
  }

  //BROADCAST API
  setBroadcast(obj){
    const broadcast = new BroadcastChannel('login-credentials');
    broadcast.postMessage(obj);
  }
  getBroadcast(){
    //works when tabs are open; doesn't work on new tabs.
    const broadcast = new BroadcastChannel('login-credentials');
    broadcast.onmessage =  (ev) => {
      this.credentials.emit(ev.data);
    }
  }

  resetAll(){
    caches.open('login').then( cache => {
      cache.delete("credentials").then(() => window.location.reload());
    });
  }
}
