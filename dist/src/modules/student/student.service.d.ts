export declare const createStudentService: (data: any) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums.js").Role;
        imageUrl: string | null;
        imageId: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    class: {
        level: number;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    section: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        classId: string;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    roll: number;
    parentName: string | null;
    parentPhone: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    classId: string | null;
    sectionId: string | null;
}>;
export declare const getAllStudentsService: (query: any) => Promise<{
    students: ({
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            role: import("../../../generated/prisma/enums.js").Role;
            imageUrl: string | null;
            imageId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        class: {
            level: number;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        section: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            classId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roll: number;
        parentName: string | null;
        parentPhone: string | null;
        dateOfBirth: Date | null;
        gender: string | null;
        address: string | null;
        userId: string;
        classId: string | null;
        sectionId: string | null;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getSingleStudentService: (id: string) => Promise<({
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums.js").Role;
        imageUrl: string | null;
        imageId: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    class: {
        level: number;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    section: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        classId: string;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    roll: number;
    parentName: string | null;
    parentPhone: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    classId: string | null;
    sectionId: string | null;
}) | null>;
export declare const updateStudentService: (id: string, data: any) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums.js").Role;
        imageUrl: string | null;
        imageId: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    class: {
        level: number;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    section: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        classId: string;
    } | null;
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    roll: number;
    parentName: string | null;
    parentPhone: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    classId: string | null;
    sectionId: string | null;
}>;
export declare const deleteStudentService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    roll: number;
    parentName: string | null;
    parentPhone: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    classId: string | null;
    sectionId: string | null;
}>;
//# sourceMappingURL=student.service.d.ts.map