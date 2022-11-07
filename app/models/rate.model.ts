export class Rating
{
    dishid!:string;
    nick:string;
    text:string;
    date?:string;
    constructor(nick:string,text:string,date?:string)
    {
        this.nick = nick;
        this.text = text;
        this.date=date;
    }
}