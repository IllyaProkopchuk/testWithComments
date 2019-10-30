import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemForm: any = {
    name: '',
  };

  currentArray: any;

  currentCommentsObj: any;

  commentsChecker: boolean = true;
  clicked: boolean = true;
  saveCommentIndex: number;


  
  comment: string;

  commentsArray: any;

  yPos: number;
  
  constructor() {
    this.getData();
  }


  ngOnInit() {
  }


  //-------------- geting array from obj to rander content-------------------------------
  public getArrayFromObject(obj): void {
    this.commentsArray = obj.comments;
  }

  //--------------ADD comment --------------------------------------------
  public addComment(): void {
    const arr = [];
    console.log(this.currentCommentsObj.comments);
    if (this.comment !== '' && this.comment !== ' ' && this.comment !== undefined) {
      if (this.currentCommentsObj.comments == undefined) {
        console.log(true);
      }
      else {
        this.currentCommentsObj.comments.map(a => arr.push(a));
        console.log(false);
      }
      arr.push(this.comment);
      console.log('comment', this.comment);
      this.currentCommentsObj.comments = arr;
      this.currentArray.splice(this.saveCommentIndex, 1, this.currentCommentsObj);
      console.log(this.currentArray);
      localStorage.setItem('session', JSON.stringify(this.currentArray));
      this.getData();
      this.showCurrentComments(this.saveCommentIndex);
      this.comment = '';
    }
    else {
      alert('enter something');
    }
  }

  //-------------when click on some table part---------------- 

  public showCurrentComments(index: number): void {
    this.clicked = false;
    this.saveCommentIndex = index;
    this.currentCommentsObj = this.currentArray[index];
    console.log('ss', this.currentCommentsObj);
    if (this.currentCommentsObj.comments) {
      this.commentsChecker = false;
      this.getArrayFromObject(this.currentCommentsObj);
    }
    else {
      this.commentsChecker = true;
    }
    this.addRedStick(index);
  }


  //-----------delete data from view and localstorage------------------

  public delete(index: number): void {
    this.currentArray.splice(index, 1);
    localStorage.setItem('session', JSON.stringify(this.currentArray));
    this.clicked = true;
  }

  //-------GetData from local---------------------------

  public getData(): void {
    this.currentArray = JSON.parse(localStorage.getItem('session'));
  }


  //-------- Form part--------------------------------

  public onSubmit(form: NgForm): void {
    const data = Object.assign({}, form.value);
    delete data.id;
    this.saveDataToLocalStorage(data);
    this.resetForm(form);
    this.getData();
  }

  private saveDataToLocalStorage(data): void {
    let a = [];
    let b = [];
    let с = [];
    b = JSON.parse(localStorage.getItem('session'));
    if (b != null) {
      с = a.concat(b);
    }
    с.push(data);
    localStorage.setItem('session', JSON.stringify(с));
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    }
    else {
      this.itemForm = {
        name: ''
      };
    }
  }

  //127 = to top
  // 60px distance

  public addRedStick(index) {
    // const a = index + 1;
    this.yPos = 127 + index * 62;
  }
}
