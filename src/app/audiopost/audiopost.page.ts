import { Component, OnInit } from '@angular/core';
import { runInThisContext } from 'vm';
@Component({
  selector: 'app-audiopost',
  templateUrl: './audiopost.page.html',
  styleUrls: ['./audiopost.page.scss'],
})
export class AudiopostPage implements OnInit {
  mode:boolean = false;
  audio:any;
  check_btn:any = null;
  audio_data=[{
    title:"Fist music",
    src:"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
  },
  {
    title:"Fist music",
    src:"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
  },
  {
    title:"Fist music",
    src:"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
  },
  {
    title:"Fist music",
    src:"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
  }
]
  // private streamingMedia: StreamingMedia
  constructor() { }

  ngOnInit() {
    this.audio = new Audio();
  }
  playAudioStop(mode,audio_item,indexOfelement){
  this.check_btn = indexOfelement;
    this.mode = mode;
this.audio.src = audio_item.src;
    if(mode){
      this.audio.play(); 
} else{
  this.audio.pause();
}
 
  }

}
