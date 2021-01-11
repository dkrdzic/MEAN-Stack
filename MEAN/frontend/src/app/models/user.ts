

export class User{

_id: any;
name:string;
surname:string;
username:string;
password:string;
birthday:string;
city:string;
country:string;
email:string;
profileImage:string;
booksToRead:Array<number>;
booksReading:Array<number>;
booksFinished:Array<number>;

following:Array<string>;
userType:string;
notifications:Array<string>;

followHappeningRequests:Array<string>;

followEvents:Array<number>;

}

