import { User } from "./user";
import { Wall } from "./wall";

export interface Route {
    title: string;
    grade: string;
    likes: number;
    owner: User;
    wall: Wall;
}