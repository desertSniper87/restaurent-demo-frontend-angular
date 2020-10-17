interface ConstructorParams {
  rating: any;
  comment: any;
  author: any;
  date: any;
}

export class Comment {
  rating: number;
  comment: string;
  author: string;
  date: string;

  constructor({rating, comment, author, date}: ConstructorParams) {
    this.rating = rating;
    this.comment = comment;
    this.author = author;
    this.date = date;
  }
}
