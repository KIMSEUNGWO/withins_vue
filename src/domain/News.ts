import {Organization} from "@/domain/Organization";


export class News {
    public newsId: number;
    public title : string;
    public organization : Organization;
    public type : string;
    public link : string;
    public createdAt : Date;

    public constructor(data : any) {
        this.newsId = data.id;
        this.title = data.title;
        this.type = data.type;
        this.link = data.link;
        this.organization = new Organization(data.organization);
        this.createdAt = new Date(data.createdAt);
    }

    public getCreateAt() : string {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - this.createdAt.getTime()) / 1000);

        // 초 단위
        if (diffInSeconds < 60) {
            return diffInSeconds <= 5 ? '방금 전' : `${diffInSeconds}초 전`;
        }

        // 분 단위 (1시간 미만)
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        }

        // 시간 단위 (1일 미만)
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        }

        // 일 단위 (8일 미만)
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 8) {
            return `${diffInDays}일 전`;
        }

        const month = (this.createdAt.getMonth() - 1).toString().padStart(2, '0');
        const day = (this.createdAt.getDate() - 1).toString().padStart(2, '0');
        // 년 단위
        return `${this.createdAt.getFullYear()}.${month}.${day}`;
    }
}