export class Pokemon {
    _id: string = '';
    hp: number = 0;
    cp: number = 0;
    name: string = '';
    picture: string = '';
    types: Array<string> = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}