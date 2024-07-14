
export interface WorkingGroup {
    id: number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    name: string;
    description: string;
    shortDescription: string;
    weeklyMeetingLink?: string;
    weeklyMeetingTime?: string;
    weeklyUpdateLink?: string;
    bountyTaskLink?: string;
    roadmapLink?: string;
    bannerURI: string;
    BadgeName?: string;
    show: boolean;
}

export enum WorkingGroupMemberType {
    STABLE="STABLE",
    UNSTABLE="UNSTABLE"
}

export interface MemberInWorkingGroup {
    id:number;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    memberId:number;
    role:string[]
}