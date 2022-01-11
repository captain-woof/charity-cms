import { Ngo } from "./ngo";

enum Category {

}

export interface CategoryAndNgos {
    categoryName: string,
    ngos: Array<Ngo>
}