export interface INews {
    id: string,
    title: string,
    date: string,
    content: string,
    img: string[],
    visible: boolean,
    createdAt: string
};

export interface IPrayers {
    id?: number,
    prayer: string;
    time: string;
}