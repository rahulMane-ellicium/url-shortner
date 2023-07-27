export interface IUrlDetails {
  shortUrlId: string;
  id?:number;
  longUrl: string;
  userId: number;
}

export interface IUrl {
  id?: number;
  shortUrlId: string;
  longUrl: string;
  user?: any;
  createdAt: string;
  updatedAt: string;
}


export interface IClickData {
    id: number;
    click: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    userId: number;
    urlId: number;
    url: {
      shortUrlId: string;
    };
  }
  