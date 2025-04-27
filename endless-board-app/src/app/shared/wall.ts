import { Hold } from "./hold";

export interface Wall {
    height: number;
    width: number;
    holds?: Hold[];
}