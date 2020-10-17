import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from "@angular/common";
import { Dish } from "../../shared/dish";
import { Comment } from "../../shared/comment";
import { DishService } from "../services/dish.service";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MenuComponent } from "../menu/menu.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  providers: [DatePipe]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  formErrors = {
    'author': 'author_error',
    'comment': 'comment_error'
  }

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    },
    'author': {
      'required':      'Author is required.',
      'minlength':      'Author name should be greater than 3 characters.',
    }

  }

  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('cform') commentFormDirective;

  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              private datePipe: DatePipe) {
    this.createForm()
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dishService.getDishIds().subscribe(dishIds => {
      this.dishIds = dishIds;
    })
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            debugger;
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  createForm() {
    this.commentForm = this.fb.group({
      rating: [5, Validators.required ],
      comment: ['', Validators.required ],
      author: ['', [Validators.required, Validators.minLength(4)] ],
      date: [this.datePipe.transform(new Date()), Validators.required ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset({
      rating: 0,
      comment: '',
      author: '',
      date: new Date()
    });
    this.commentFormDirective.reset();
  }

  goBackToMenu(): void {
    this.location.go('menu');
  }

}
