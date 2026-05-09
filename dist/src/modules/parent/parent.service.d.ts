export declare const createParentService: (data: any) => Promise<{
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
    address: string | null;
    userId: string;
    phone: string | null;
    occupation: string | null;
    relationToStudent: string | null;
}>;
export declare const getAllParentsService: (query: any) => Promise<{
    parents: ({
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
        address: string | null;
        userId: string;
        phone: string | null;
        occupation: string | null;
        relationToStudent: string | null;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getSingleParentService: (id: string) => Promise<({
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
    address: string | null;
    userId: string;
    phone: string | null;
    occupation: string | null;
    relationToStudent: string | null;
}) | null>;
export declare const updateParentService: (id: string, data: any) => Promise<{
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
    address: string | null;
    userId: string;
    phone: string | null;
    occupation: string | null;
    relationToStudent: string | null;
}>;
export declare const deleteParentService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    address: string | null;
    userId: string;
    phone: string | null;
    occupation: string | null;
    relationToStudent: string | null;
}>;
//# sourceMappingURL=parent.service.d.ts.map