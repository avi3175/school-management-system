import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createTeacherSchema } from "./teacher.validation.js";
import { createTeacherService, getAllTeachersService, getSingleTeacherService, updateTeacherService, deleteTeacherService, } from "./teacher.service.js";
// ➕ Create Teacher
export const createTeacher = async (req, res) => {
    try {
        const validated = createTeacherSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(validated.password, 10);
        const teacher = await createTeacherService({
            ...validated,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            data: teacher,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
// 📥 Get All Teachers
export const getAllTeachers = asyncHandler(async (req, res) => {
    const result = await getAllTeachersService(req.query);
    res.json({
        success: true,
        data: result.teachers,
        meta: result.meta,
    });
});
// 📄 Get Single Teacher
export const getSingleTeacher = asyncHandler(async (req, res) => {
    const id = typeof req.params.id === "string" ? req.params.id : null;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid teacher id",
        });
    }
    const teacher = await getSingleTeacherService(id);
    if (!teacher) {
        return res.status(404).json({
            success: false,
            message: "Teacher not found",
        });
    }
    res.json({
        success: true,
        data: teacher,
    });
});
// ✏️ Update Teacher
export const updateTeacher = asyncHandler(async (req, res) => {
    const id = typeof req.params.id === "string" ? req.params.id : null;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid teacher id",
        });
    }
    const teacher = await updateTeacherService(id, req.body);
    res.json({
        success: true,
        data: teacher,
    });
});
// ❌ Delete Teacher
export const deleteTeacher = asyncHandler(async (req, res) => {
    const id = typeof req.params.id === "string" ? req.params.id : null;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid teacher id",
        });
    }
    const teacher = await deleteTeacherService(id);
    res.json({
        success: true,
        message: "Teacher deleted successfully",
        data: teacher,
    });
});
//# sourceMappingURL=teacher.controller.js.map