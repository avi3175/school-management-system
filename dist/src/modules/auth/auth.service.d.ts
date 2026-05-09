export declare const registerUser: (data: any) => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    role: import("../../../generated/prisma/enums.js").Role;
    imageUrl: string | null;
    imageId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const loginUser: (data: any) => Promise<{
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
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map