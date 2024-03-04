export interface deleteAssignmentsFiles {
    id: string;
    assignmentId: string;
    name: string;
    bucket: string;
    createAt: Date;
}

export interface deleteAnnouncementsFiles {
    id: string;
    announcementId: string;
    name: string;
    bucket: string;
    createAt: Date;
}

export interface deleteAssignmentsSubmitFiles {
    id: string
    assignmentSubmitId: string;
    name: string;
    bucket: string;
    createAt: Date;
}