export declare const createTeacherService: (data: any) => Promise<{
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
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    designation: string | null;
    department: string | null;
    phone: string | null;
}>;
export declare const getAllTeachersService: (query: any) => Promise<{
    teachers: ({
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date | null;
        gender: string | null;
        address: string | null;
        userId: string;
        designation: string | null;
        department: string | null;
        phone: string | null;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getSingleTeacherService: (id: string) => Promise<({
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
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    designation: string | null;
    department: string | null;
    phone: string | null;
}) | null>;
export declare const updateTeacherService: (id: string, data: any) => Promise<{
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
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    designation: string | null;
    department: string | null;
    phone: string | null;
}>;
export declare const deleteTeacherService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth: Date | null;
    gender: string | null;
    address: string | null;
    userId: string;
    designation: string | null;
    department: string | null;
    phone: string | null;
}>;
//# sourceMappingURL=teacher.service.d.ts.map