import { Timestamp } from "@angular/fire/firestore";
import { Hold } from "./hold";

export interface Route {
    createdAt: Timestamp;
    description: string;
    grade: string;
    holds: Hold[];
    likes: number;
    title: string;
    ownerEmail: string;
}