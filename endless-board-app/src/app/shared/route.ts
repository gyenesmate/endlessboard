import { Timestamp } from "@angular/fire/firestore";
import { Hold } from "./hold";

export interface Route {
    id: string;
    createdAt: Timestamp;
    description: string;
    grade: string;
    holds: Hold[];
    likes: number;
    title: string;
    userEmail: string;
    likedBy: string[]
}