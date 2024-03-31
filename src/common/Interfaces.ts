export interface INews {
    id?: number,
    title: string,
    date: string,
    content: string,
    img: INewsImages[],
    visible: boolean,
};
export interface INewsImages {
    imgName: string,
    imgPath: string
}

export interface IPrayers {
    prayer: string;
    time: string;
}