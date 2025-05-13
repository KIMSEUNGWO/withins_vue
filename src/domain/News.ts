import {Organization} from "@/domain/Organization";


export class News {
    public newsId: number;
    public title : string;
    public organization : Organization;
    public type : string;
    public link : string;
    public createAt : Date;

    public constructor(data : any) {
        this.newsId = data.recruitId;
        this.title = data.title;
        this.type = data.type;
        this.link = data.link;
        this.organization = new Organization(data.organization);
        this.createAt = new Date(data.createAt);
    }

    public getCreateAt() : string {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - this.createAt.getTime()) / 1000);

        // 초 단위
        if (diffInSeconds < 60) {
            return diffInSeconds <= 5 ? '방금 전 등록' : `${diffInSeconds}초 전 등록`;
        }

        // 분 단위 (1시간 미만)
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전 등록`;
        }

        // 시간 단위 (1일 미만)
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours}시간 전 등록`;
        }

        // 일 단위 (30일 미만)
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) {
            return `${diffInDays}일 전 등록`;
        }

        // 월 단위 (12개월 미만)
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths}달 전 등록`;
        }

        // 년 단위
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears}년 전 등록`;
    }
}