export class Book {
  id: number;
  name: string;
  author: string;
  genre: string;
  format: string;
  length: number;
  description: string;

  constructor(
    id: number = 0,
    name: string = '',
    author: string = '',
    genre: string = '',
    format: string = '',
    length: number = 0,
    description: string = ''
  ){
    this.id = id;
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.format = format;
    this.length = length;
    this.description = description;
  }
}
