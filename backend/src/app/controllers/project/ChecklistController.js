const Checklist = require('../../models/Checklist');
const ChecklistItem = require('../../models/ChecklistItem');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
require('dotenv').config();

class ChecklistController {
    showAllChecklistByTask = async (req, res) => {
        const checklist = await Checklist.find({ task: req.params.idTask }).populate('items').sort({ status: -1 });
        if (!checklist) {
            return apiResponse.ErrorResponse(res, error);
        }
        return apiResponse.successResponseWithData(res, 'show checklist success', checklist);
    };
    showChecklist = async (req, res) => {
        const checklist = Checklist.findById(req.params.id)
        if (!checklist) {
            return apiResponse.ErrorResponse(res, error);
        }
        return apiResponse.successResponseWithData(res, 'show checklist success', checklist);
    };

    createChecklistItem = async (req, res) => {
        console.log(req.params.id, req.body.name);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    'Validation Error',
                    errors.array(),
                );
            } else {
                const item = await ChecklistItem.create({ name: req.body.name, isDone: false })
                const checklist = await Checklist.findByIdAndUpdate(req.params.id, {
                    $push: { items: item }
                })
                return apiResponse.successResponseWithData(res, 'show checklist success', checklist);
            }
        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    };

    editChecklist = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    'Validation Error',
                    errors.array(),
                );
            } else {
                const taskUpdate = await Checklist.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true },
                );
                return apiResponse.successResponseWithData(
                    res,
                    'Edit task successfully',
                    taskUpdate,
                );
            }
        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    };
    addChecklistChecklist = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    'Validation Error',
                    errors.array(),
                );
            } else {
                const checklist = await Checklist.create({
                    task: req.params.id,
                    name: req.body.name,
                });

                const taskUpdate = await Checklist.findByIdAndUpdate(
                    req.params.id,
                    { $push: { checklist: checklist } },
                    { new: true },
                );
                return apiResponse.successResponseWithData(
                    res,
                    'Edit task successfully',
                    taskUpdate,
                );
            }
        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    };
    addChecklistItemChecklist = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    'Validation Error',
                    errors.array(),
                );
            } else {
                const taskUpdate = await Checklist.findByIdAndUpdate(
                    req.params.id,
                    { $push: { checklist: { name: req.body.name, items: [] } } },
                    { new: true },
                );
                return apiResponse.successResponseWithData(
                    res,
                    'Edit task successfully',
                    taskUpdate,
                );
            }
        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    };
    deleteChecklist = async (req, res) => {
        await Checklist.findByIdAndDelete(req.params.idChecklist);
        return apiResponse.successResponse(res, 'Delete checklist successfully');
    };
    deleteChecklistItem = async (req, res) => {
        await ChecklistItem.findByIdAndDelete(req.params.idChecklistItem);
        return apiResponse.successResponse(res, 'Delete checklistItem successfully');
    };
}
module.exports = new ChecklistController();
