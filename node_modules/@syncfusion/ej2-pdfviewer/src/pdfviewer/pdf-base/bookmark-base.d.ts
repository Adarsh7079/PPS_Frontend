/**
 * @hidden
 */
export declare class BookmarkBase {
    Title: string;
    Id: number;
    HasChild: boolean;
    Child: BookmarkBase[];
    FileName: string;
    constructor();
}
/**
 * @hidden
 */
export declare class BookmarkDestination {
    X: number;
    Y: number;
    Zoom: number;
    PageIndex: number;
    constructor();
}
/**
 * @hidden
 */
export declare class BookmarkStyles {
    Color: string;
    FontStyle: string;
    Text: string;
    IsChild: boolean;
    constructor();
}
