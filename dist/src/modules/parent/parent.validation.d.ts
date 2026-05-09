import { z } from "zod";
export declare const createParentSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        PARENT: "PARENT";
    }>;
    occupation: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    relationToStudent: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateParentSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    occupation: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    relationToStudent: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=parent.validation.d.ts.map